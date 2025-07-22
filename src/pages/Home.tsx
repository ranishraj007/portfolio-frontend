import { usePortfolioData } from "../queries/usePortfolioData";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const { data, isLoading } = usePortfolioData();

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-4"
      >
        Welcome to My Portfolio
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, Absolute: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg mb-4"
      >
        Hi, I'm {data.about.name}, a {data.about.title}. Explore my work and
        background through the sections below.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { to: "/about", label: "About Me" },
          { to: "/experience", label: "Experience" },
          { to: "/education", label: "Education" },
          { to: "/projects", label: "Projects" },
          { to: "/skills", label: "Skills" },
          { to: "/languages", label: "Languages" },
        ].map((link, index) => (
          <motion.div
            key={link.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Link
              to={link.to}
              className="block bg-blue-100 text-blue-800 p-4 rounded-lg text-center hover:bg-blue-200"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Home;
