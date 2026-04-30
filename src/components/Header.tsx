import { motion } from "framer-motion";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

interface HeaderProps {
  onOpenCv: () => void;
}

function Header({ onOpenCv }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-30"
    >
      <div className="mx-auto mt-4 flex w-[min(1180px,calc(100%-1.5rem))] items-center justify-between rounded-full border border-white/12 bg-slate-950/65 px-4 py-3 shadow-[0_10px_60px_rgba(15,23,42,0.45)] backdrop-blur-xl">
        <a href="#top" className="text-sm font-semibold uppercase tracking-[0.35em] text-white">
          Ranish
        </a>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full px-4 py-2 text-sm text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
        <motion.button
          type="button"
          onClick={onOpenCv}
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_rgba(14,165,233,0.35)]"
        >
          View CV
        </motion.button>
      </div>
    </motion.header>
  );
}

export default Header;
