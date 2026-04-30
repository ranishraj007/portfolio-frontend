import { useState, type PointerEvent } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CVModal from "../components/CVModal";
import Skills from "../components/Skills";
import SiteAtmosphere from "../components/SiteAtmosphere";
import { usePortfolioData } from "../queries/usePortfolioData";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7 },
};

const primaryButton =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-shadow";

const handleSectionPointerMove = (event: PointerEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--section-pointer-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--section-pointer-y", `${event.clientY - rect.top}px`);
};

function Home() {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const { data, isLoading } = usePortfolioData();

  if (isLoading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <motion.div
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="rounded-full border border-cyan-400/30 px-6 py-3 text-sm uppercase tracking-[0.35em]"
        >
          Loading portfolio
        </motion.div>
      </div>
    );
  }

  // console.log("data", data.about.linkedin);

  return (
    <div id="top" className="bg-slate-950 text-slate-50">
      <Header onOpenCv={() => setIsCvOpen(true)} />
      <CVModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />

      <main className="relative overflow-hidden">
        <SiteAtmosphere />
        <section className="section-glow relative min-h-screen" onPointerMove={handleSectionPointerMove}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.25),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(249,115,22,0.22),_transparent_24%),linear-gradient(180deg,_rgba(2,6,23,0.5),_rgba(2,6,23,0.98))]" />
          <div className="relative mx-auto flex min-h-screen w-[min(1180px,calc(100%-1.5rem))] flex-col justify-center py-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <p className="mb-5 text-xs uppercase tracking-[0.45em] text-cyan-300">
                Frontend Engineer • React Developer • Computer Engineer
              </p>
              <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-white md:text-7xl">
                {data.about.name}
                <span className="mt-3 block bg-gradient-to-r from-cyan-300 via-sky-400 to-orange-300 bg-clip-text text-transparent">
                  Designing interfaces that feel sharp, modern, and alive.
                </span>
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                {data.about.summary}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <motion.a
                  href="#projects"
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                    boxShadow: "0 18px 50px rgba(14,165,233,0.35)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`${primaryButton} bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 text-slate-950`}
                >
                  Explore Projects
                </motion.a>
                <motion.button
                  type="button"
                  onClick={() => setIsCvOpen(true)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${primaryButton} border border-white/15 bg-white/8 text-white backdrop-blur-md`}
                >
                  Preview Updated CV
                </motion.button>
                <motion.a
                  href="/Ranish-Shrestha-cv.pdf"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${primaryButton} border border-orange-400/30 bg-orange-400/10 text-orange-100`}
                >
                  Open Resume
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-16 grid gap-4 md:grid-cols-4"
            >
              {[
                {
                  label: "Current Role",
                  value: data.experience[0]?.role ?? data.about.title,
                },
                {
                  label: "Experience",
                  value: `${data.experience.length}+ roles`,
                },
                { label: "Projects", value: `${data.projects.length} shipped` },
                { label: "Core Stack", value: "React • Tailwind • APIs" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5 backdrop-blur-xl"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="about" className="section-glow relative py-24" onPointerMove={handleSectionPointerMove}>
          <div className="mx-auto grid w-[min(1180px,calc(100%-1.5rem))] gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              {...fadeUp}
              className="rounded-[2rem] border border-white/10 bg-white/6 p-8 backdrop-blur-xl"
            >
              <p className="section-kicker">About</p>
              <h2 className="section-title">
                A builder who cares about clarity, speed, and polished
                interactions.
              </h2>
              <p className="mt-6 text-base leading-8 text-slate-300">
                I work across product UI, component architecture, API
                integrations, and responsive frontend systems. My background in
                computer engineering helps me stay technical, while my product
                mindset keeps the interface intuitive and human.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="info-card">
                  <p className="info-label">Location</p>
                  <p className="info-value">{data.about.address}</p>
                </div>
                <div className="info-card">
                  <p className="info-label">Email</p>
                  <a
                    href={`mailto:${data.about.email}`}
                    className="info-value hover:text-cyan-300"
                  >
                    {data.about.email}
                  </a>
                </div>
                <div className="info-card">
                  <p className="info-label">Phone</p>
                  <a
                    href={`tel:${data.about.contact}`}
                    className="info-value hover:text-cyan-300"
                  >
                    {data.about.contact}
                  </a>
                </div>
                <div className="info-card">
                  <p className="info-label">Focus</p>
                  <p className="info-value">{data.about.title}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="rounded-[2rem] border border-cyan-400/18 bg-gradient-to-b from-cyan-400/10 to-white/5 p-8"
            >
              <p className="section-kicker">Links</p>
              <h3 className="text-2xl font-semibold text-white">
                Find me where the work happens.
              </h3>
              <div className="mt-8 flex flex-col gap-4">
                {[
                  {
                    href: data.about.github,
                    label: "GitHub",
                    value: "Code, repos, side projects",
                  },
                  {
                    href: data.about.linkedin,
                    label: "LinkedIn",
                    value: "Professional profile and network",
                  },
                ].map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 6, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm text-cyan-300">{item.href}</p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="experience" className="section-glow relative py-24" onPointerMove={handleSectionPointerMove}>
          <div className="mx-auto w-[min(1180px,calc(100%-1.5rem))]">
            <motion.div {...fadeUp} className="mb-10">
              <p className="section-kicker">Experience</p>
              <h2 className="section-title">
                A timeline shaped by product work, shipped interfaces, and
                constant learning.
              </h2>
            </motion.div>
            <div className="space-y-6">
              {data.experience.map((item, index) => (
                <motion.article
                  key={`${item.company}-${item.role}`}
                  {...fadeUp}
                  transition={{ duration: 0.7, delay: index * 0.06 }}
                  className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl lg:grid-cols-[240px_1fr]"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                      {item.duration}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">
                      {item.role}
                    </h3>
                    <p className="mt-2 text-slate-400">{item.company}</p>
                    <p className="text-sm text-slate-500">{item.location}</p>
                  </div>
                  <div className="grid gap-3">
                    {item.responsibilities.map((responsibility) => (
                      <motion.div
                        key={responsibility}
                        whileHover={{ x: 6 }}
                        className="rounded-[1.25rem] border border-white/8 bg-slate-950/40 px-4 py-4 text-sm leading-7 text-slate-300"
                      >
                        {responsibility}
                      </motion.div>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section-glow relative py-24" onPointerMove={handleSectionPointerMove}>
          <div className="mx-auto w-[min(1180px,calc(100%-1.5rem))]">
            <motion.div {...fadeUp} className="mb-10">
              <p className="section-kicker">Projects</p>
              <h2 className="section-title">
                Selected work across public platforms, civic products, and
                fast-moving frontend builds.
              </h2>
            </motion.div>
            <div className="grid gap-6 lg:grid-cols-2">
              {data.projects.map((project, index) => (
                <motion.article
                  key={project.name}
                  {...fadeUp}
                  transition={{ duration: 0.7, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-7 backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
                        Project {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">
                        {project.name}
                      </h3>
                    </div>
                    {project.url ? (
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.06, rotate: 3 }}
                        whileTap={{ scale: 0.96 }}
                        className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200"
                      >
                        Visit
                      </motion.a>
                    ) : null}
                  </div>
                  <div className="mt-6 grid gap-3">
                    {project.description.map((point) => (
                      <div
                        key={point}
                        className="rounded-[1.2rem] border border-white/8 bg-slate-950/38 px-4 py-4 text-sm leading-7 text-slate-300"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section-glow relative py-24" onPointerMove={handleSectionPointerMove}>
          <div className="mx-auto w-[min(1180px,calc(100%-1.5rem))]">
            <Skills />

            <motion.div {...fadeUp} className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-orange-400/12 to-white/6 p-8">
                <p className="section-kicker">Education</p>
                <div className="mt-6 space-y-4">
                  {data.education.map((item) => (
                    <div
                      key={`${item.institution}-${item.degree}`}
                      className="rounded-[1.25rem] border border-white/10 bg-slate-950/35 p-4"
                    >
                      <h3 className="text-lg font-semibold text-white">
                        {item.degree}
                      </h3>
                      <p className="mt-1 text-slate-300">{item.institution}</p>
                      <p className="text-sm text-slate-500">
                        {item.location} • {item.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/12 to-white/6 p-8">
                <p className="section-kicker">Languages</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {data.languages.map((language) => (
                    <motion.div
                      key={language}
                      whileHover={{ y: -4, scale: 1.04 }}
                      className="rounded-full border border-white/10 bg-slate-950/45 px-5 py-3 text-sm font-medium text-white"
                    >
                      {language}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="section-glow relative pb-24 pt-10" onPointerMove={handleSectionPointerMove}>
          <div className="mx-auto w-[min(1180px,calc(100%-1.5rem))]">
            <motion.div
              {...fadeUp}
              className="rounded-[2.25rem] border border-cyan-400/20 bg-[linear-gradient(135deg,rgba(8,47,73,0.85),rgba(15,23,42,0.92),rgba(124,45,18,0.82))] p-8 md:p-12"
            >
              <p className="section-kicker text-cyan-200">Let&apos;s Build</p>
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl">
                If you need a frontend developer who cares about feel as much as
                function, let&apos;s talk.
              </h2>
              <div className="mt-8 flex flex-wrap gap-4">
                <motion.a
                  href={`mailto:${data.about.email}`}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${primaryButton} border border-white/15 bg-white/8 text-white`}
                >
                  Email Me
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/ranish-raj-shrestha-89aa32207/"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${primaryButton} border border-white/15 bg-white/8 text-white`}
                >
                  Connect on LinkedIn
                </motion.a>
                <motion.button
                  type="button"
                  onClick={() => setIsCvOpen(true)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${primaryButton} border border-orange-300/25 bg-orange-300/10 text-orange-100`}
                >
                  Review CV
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
