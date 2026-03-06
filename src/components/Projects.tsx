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
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-foreground">Projek Saya</h2>
        </div>

        {/* NAV BUTTON */}
        <div className="hidden md:flex justify-end gap-2 mb-6">
          <button
            onClick={() => scroll(-1)}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary transition"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>

          <button
            onClick={() => scroll(1)}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary transition"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>

        {/* PROJECT LIST */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {projects.map((p, i) => (
            <a
              key={i}
              href={p.link}
              className="group flex-shrink-0 w-[90%] md:w-[48%] snap-start overflow-hidden relative rounded-3xl"
            >
              {/* IMAGE */}
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-[360px] object-cover"
              />

              {/* DIAGONAL OVERLAY */}
              <div
                className="
                absolute inset-0
                bg-black/60
                flex flex-col justify-end
                p-6
                text-white
                transform translate-y-[65%]
                group-hover:translate-y-0
                transition duration-700
                "
                style={{
                  clipPath: "polygon(0 35%, 100% 0%, 100% 100%, 0% 100%)",
                }}
              >
                <div className="transition-all duration-500">
                  {/* TITLE */}
                  <h3 className="text-lg group-hover:text-2xl font-bold transition-all duration-500">
                    {p.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p
                    className="
                    mt-3 text-sm max-w-md
                    opacity-0 translate-y-4
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    transition duration-500
                    "
                  >
                    {p.desc}
                  </p>

                </div>
              </div>
            </a>
          ))}
        </div>

        {/* MOBILE DOT */}
        <div className="flex md:hidden justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <span
              key={i}
              className={`w-4 h-2 rounded-full ${
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
