import { useState, useEffect } from "react";

const navItems = [
  { label: "Beranda", id: "hero" },
  { label: "Tentang Saya", id: "about" },
  { label: "Projek Saya", id: "projects" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));

      const scrollY = window.scrollY + 80;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);

    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }

    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop navbar */}
      <nav className="hidden md:block fixed right-[3%] -translate-x-1/2 top-9 z-50">
        <div className=" px-8 py-3 ">
          <div className="flex gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm font-bold transition-colors ${
                  activeSection === item.id ? "text-white" : "text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="px-6 py-4 flex justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xl text-foreground"
          >
            <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`} />
          </button>
        </div>

        {isOpen && (
          <div className="px-6 pb-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left font-bold ${
                  activeSection === item.id
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
