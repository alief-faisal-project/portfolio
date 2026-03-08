import { useRef, useState, useEffect } from "react";
import fastcare from "@/assets/fastcare.png";
import urbnx from "@/assets/urbnx.png";
import busalime from "@/assets/busalime.png";
import petani from "@/assets/petani.png";

const projects = [
  {
    title: "URBNX",
    desc: "Website katalog fashion modern",
    image: urbnx,
    link: "https://urbnx.vercel.app/",
  },
  {
    title: "FASTCARE",
    desc: "Website pencarian rumah sakit terdekat menggunakan GPS, lengkap dengan informasi fasilitas, layanan, dan detail rumah sakit",
    image: fastcare,
    link: "https://fastcare-bntn.vercel.app/",
  },
  {
    title: "Busalime",
    desc: "Profil perusahaan cairan pencuci piring lengkap dengan showcase produk.",
    image: busalime,
    link: "https://busalime.vercel.app/",
  },
  {
    title: "Simulasi Pemetaan Kelompok Tani Padi",
    desc: "Website simluasi dengan dummy data untuk pemetaan dan pemberdayaan petani padi diseluruh Kabupaten Pandeglang.",
    image: petani,
    link: "https://pemetaanpoktan-pandeglang.vercel.app/",
  },
];

const Projects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (dir: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.children[0]?.clientWidth ?? 300;
    scrollRef.current.scrollBy({
      left: dir * (cardWidth + 24),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => {
      const cardWidth = (el.children[0]?.clientWidth ?? 300) + 24;
      setActiveIndex(Math.round(el.scrollLeft / cardWidth));
    };
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);

  return (
    <section
      id="projects"
      className="section-stack flex items-center justify-center min-h-screen bg-background"
    >
      <div className="max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground">
             <span className="text-primary">Projek</span>
          </h2>
        </div>

        {/* Desktop arrows */}
        <div className="hidden md:flex justify-end gap-2 mb-4">
          <button
            onClick={() => scroll(-1)}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        >
          {projects.map((p, i) => {
            const isActive = i === activeIndex;
            return (
              <a
                key={i}
                href={p.link}
                className="group flex-shrink-0 w-[85vw] md:w-[calc(50%-12px)] overflow-hidden bg-card snap-start"
              >
                <div className="relative overflow-hidden aspect-[3/2]">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{
                      transform:
                        isActive && window.innerWidth < 768
                          ? "scale(1.1)"
                          : undefined,
                    }}
                    loading="lazy"
                  />
                  {/* Overlay - diagonal before hover, full solid on hover/active */}
                  <div
                    className="absolute inset-0 bg-card/70 transition-all duration-500 ease-out"
                    style={{
                      clipPath:
                        isActive && window.innerWidth < 768
                          ? "polygon(-5% 0%, 115% 0%, 115% 110%, -5% 110%)"
                          : "polygon(-5% 65%, 115% 80%, 115% 110%, -10% 110%)",
                    }}
                    ref={(el) => {
                      if (!el) return;
                      const parent = el.closest(".group");
                      if (!parent) return;

                      parent.addEventListener("mouseenter", () => {
                        el.style.clipPath =
                          "polygon(-5% 0%, 115% 0%, 115% 110%, -5% 110%)";
                      });

                      parent.addEventListener("mouseleave", () => {
                        el.style.clipPath =
                          "polygon(-5% 65%, 115% 80%, 115% 110%, -10% 110%)";
                      });
                    }}
                  />
                  {/* Text */}
                  <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                    <h3 className="text-base font-bold text-foreground mb-1">
                      {p.title}
                    </h3>
                    <p
                      className={`text-sm text-muted-foreground leading-relaxed overflow-hidden transition-all duration-500 delay-100 ${
                        isActive && window.innerWidth < 768
                          ? "max-h-32 opacity-100"
                          : "max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100"
                      }`}
                    >
                      {p.desc}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Mobile indicators */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {projects.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === activeIndex ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;