import { useState, useEffect } from "react";
import myPhoto from "@/assets/myphoto.png";
import ShinyText from "@/components/ShinyText";

const RESUME_URL =
  "https://drive.google.com/uc?export=download&id=18bytxeOtIvMx04LPyY_n3DLhBdYgfq37";

const socials = [
  {
    icon: "fa-brands fa-linkedin-in",
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  { icon: "fa-brands fa-github", href: "https://github.com", label: "Github" },
  {
    icon: "fa-brands fa-instagram",
    href: "https://instagram.com/faisaladrsyah",
    label: "Instagram",
  },
  {
    icon: "fa-brands fa-whatsapp",
    href: "https://wa.me/6281234567890",
    label: "WhatsApp",
  },
];

const roles = ["Fullstack", "Frontend", "Backend"];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  const [time, setTime] = useState("");
  const [city, setCity] = useState("Meminta lokasi...");

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);

      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setAnimate(true);
      }, 200);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  /* realtime clock */
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      const s = now.getSeconds().toString().padStart(2, "0");

      setTime(`${h}:${m}:${s}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  /* lokasi */
  useEffect(() => {
    if (!navigator.geolocation) {
      setCity("Lokasi tidak tersedia");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        );

        const data = await res.json();

        const cityName =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.state ||
          "Unknown";

        setCity(cityName);
      } catch {
        setCity("Lokasi ditemukan");
      }
    });
  }, []);

  return (
    <section
      id="hero"
      className="section-stack flex items-center justify-center min-h-screen bg-background overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-3 items-center gap-12 pt-10 md:pt-8">
        {/* Left */}
        <div className="text-center md:text-left order-2 md:order-1 flex flex-col items-center md:items-start">
          <p className="text-primary text-lg font-medium mb-3">Hallo, Saya</p>

          {/* Nama diubah menjadi warna Biru */}
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="text-yellow-600">Alief Faisal</span>
            <br />
            <span className="text-foreground">
              {" "}
              {/* Gunakan text-white jika ingin putih pekat */}
              Adriansyah
            </span>
          </h1>

          {/* Social icons dengan efek Expand */}
          <div className="flex gap-4 mt-6 justify-center md:justify-start">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center h-11 px-3 rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-yellow-600 hover:text-yellow-600 overflow-hidden"
              >
                <div className="flex items-center justify-center min-w-[20px]">
                  <i className={`${s.icon} text-base`} />
                </div>
                <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[150px] group-hover:ml-2 text-sm font-medium">
                  {s.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Center photo */}
        <div className="flex justify-center order-1 md:order-2 relative -mt-16 md:mt-0">
          <div className="absolute top-1/2 left-1/2 w-[220px] md:w-[320px] h-[220px] md:h-[320px] -translate-x-1/2 -translate-y-1/2 bg-primary/30 blur-[80px] rounded-full" />

          <img
            src={myPhoto}
            alt="Alief Faisal Adriansyah"
            className="relative w-[420px] md:w-[650px] max-w-none object-cover object-top scale-110"
          />
        </div>

        {/* Right */}
        <div className="text-center md:text-right order-3 hidden md:block">
          {/* lokasi + jam */}
          <div className="mb-10 -mt-6 font-bold text-lg text-foreground leading-tight">
            <div>{city}</div>
            <div className="text-base text-muted-foreground">{time}</div>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight overflow-hidden">
            {/* Role diubah menjadi warna Biru */}
            <span
              className={`text-yellow-600 inline-block transition-all duration-500 ${
                animate
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              {roles[roleIndex]}
            </span>
            <br />
            <span className="text-foreground">Developer</span>
          </h2>

          <a
            href={RESUME_URL}
            download
            className="inline-flex items-center gap-2 mt-10 text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
          >
            RESUME <i className="fa-solid fa-download" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
