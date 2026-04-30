function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto flex w-[min(1180px,calc(100%-1.5rem))] flex-col gap-3 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>Built for the web, designed to feel alive.</p>
        <p>© {currentYear} Ranish Raj Shrestha</p>
      </div>
    </footer>
  );
}

export default Footer;
