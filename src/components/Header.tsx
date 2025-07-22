import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import CVModal from "./CVModal";

function Header() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/experience", label: "Experience" },
    { to: "/education", label: "Education" },
    { to: "/projects", label: "Projects" },
    { to: "/skills", label: "Skills" },
    { to: "/languages", label: "Languages" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-600 text-white py-4 sticky top-0 z-10"
    >
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Ranish Raj Shrestha</h1>
        <nav className="flex flex-wrap gap-4 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-1 rounded ${
                  isActive ? "bg-blue-800" : "hover:bg-blue-500"
                }`
              }
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.div>
            </NavLink>
          ))}
          <motion.a
            href="/assets/ranish-shrestha-cv.pdf"
            download
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.a>
          <motion.button
            onClick={() => setIsCVModalOpen(true)}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View CV
          </motion.button>
        </nav>
      </div>
      {isCVModalOpen && <CVModal onClose={() => setIsCVModalOpen(false)} />}
    </motion.header>
  );
}

export default Header;
