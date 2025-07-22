import { usePortfolioData } from "../queries/usePortfolioData";
import { motion } from "framer-motion";

function Projects() {
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
        Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="border p-4 rounded-lg shadow"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold">
              {project.url ? (
                <motion.a
                  href={project.url}
                  target="_blank"
                  className="text-blue-600"
                  whileHover={{ scale: 1.1 }}
                >
                  {project.name}
                </motion.a>
              ) : (
                project.name
              )}
            </h3>
            <ul className="list-disc pl-5 mt-2">
              {project.description.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Projects;
