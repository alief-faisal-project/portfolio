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
      <nav className="hidden md:block fixed left-1/2 -translate-x-1/2 top-3 z-50">
        <div className="px-8 py-3">
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
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50">
        {/* Tombol hamburger / X */}
        <div className="px-6 py-4 flex justify-end relative z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-8 h-8 flex flex-col justify-center items-center"
          >
            {/* Hamburger bars */}
            <span
              className={`block w-8 h-0.5 bg-white transition-transform duration-[700ms] ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-8 h-0.5 bg-white mt-2 transition-transform duration-[500ms] ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Menu muncul mentok ke atas dengan animasi slide-down */}
        <div
          className={`absolute top-0 left-0 right-0 overflow-hidden transition-all duration-[700ms] ease-in-out ${
            isOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="px-6 pt-16 pb-6 flex flex-col gap-4 bg-background/90 backdrop-blur-md">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left font-bold text-lg ${
                  activeSection === item.id
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
