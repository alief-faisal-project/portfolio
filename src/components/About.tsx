const About = () => {
  return (
    <section
      id="about"
      className="section-stack flex items-center justify-center min-h-screen bg-black/90"
    >
      <div className="max-w-4xl mx-auto px-6 py-20 w-full text-center">
        <h2 className="text-5xl font-bold text-white mb-20">Tentang Saya</h2>

        <p className="text-gray-300 leading-relaxed mb-6 text-justify">
          Saya adalah Fullstack Developer dengan pengalaman lebih dari 3 tahun
          dalam membangun aplikasi web modern yang skalabel dan efisien. Saya
          memiliki keahlian mendalam dalam ekosistem Next.js, React, dan
          TypeScript untuk sisi frontend, serta Node.js dan PostgreSQL
          untuk pengembangan sisi backend.
        </p>

        <p className="text-gray-300 leading-relaxed text-justify">
          Saya berdedikasi untuk mengembangkan teknologi yang mampu menyelesaikan
          masalah nyata. Dengan pendekatan problem-solving yang terstruktur dan
          kemampuan beradaptasi yang cepat, saya siap memberikan dampak positif
          dan menghadapi tantangan teknis bersama.
        </p>
      </div>
    </section>
  );
};

export default About;
