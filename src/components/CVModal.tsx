import { usePortfolioData } from "../queries/usePortfolioData";
import { motion } from "framer-motion";

interface CVModalProps {
  onClose: () => void;
}

function CVModal({ onClose }: CVModalProps) {
  const { data, isLoading } = usePortfolioData();

  if (isLoading || !data) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto"
      >
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold mb-4"
        >
          {data.about.name}
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-lg mb-2"
        >
          {data.about.title}
        </motion.p>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-2"
        >
          <strong>Address:</strong> {data.about.address}
        </motion.p>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-2"
        >
          <strong>Contact:</strong> {data.about.contact}
        </motion.p>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-2"
        >
          <strong>Email:</strong> {data.about.email}
        </motion.p>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mb-2"
        >
          <strong>GitHub:</strong>{" "}
          <a href={data.about.github} target="_blank" className="text-blue-600">
            {data.about.github}
          </a>
        </motion.p>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-4"
        >
          <strong>LinkedIn:</strong>{" "}
          <a
            href={data.about.linkedin}
            target="_blank"
            className="text-blue-600"
          >
            {data.about.linkedin}
          </a>
        </motion.p>
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-xl font-semibold mb-2"
        >
          Summary
        </motion.h3>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-4"
        >
          {data.about.summary}
        </motion.p>

        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-xl font-semibold mb-2"
        >
          Experience
        </motion.h3>
        {data.experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="mb-4"
          >
            <h4 className="text-lg font-medium">
              {exp.role} at {exp.company}
            </h4>
            <p className="text-sm text-gray-600">
              {exp.location} | {exp.duration}
            </p>
            <ul className="list-disc pl-5">
              {exp.responsibilities.map((resp, idx) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
          </motion.div>
        ))}

        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl font-semibold mb-2"
        >
          Education
        </motion.h3>
        {data.education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.75 + index * 0.1 }}
            className="mb-4"
          >
            <h4 className="text-lg font-medium">{edu.degree}</h4>
            <p className="text-sm text-gray-600">
              {edu.institution}, {edu.location} | {edu.duration}
            </p>
          </motion.div>
        ))}

        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="text-xl font-semibold mb-2"
        >
          Projects
        </motion.h3>
        {data.projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="mb-4"
          >
            <h4 className="text-lg font-medium">
              {project.url ? (
                <a href={project.url} target="_blank" className="text-blue-600">
                  {project.name}
                </a>
              ) : (
                project.name
              )}
            </h4>
            <ul className="list-disc pl-5">
              {project.description.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          </motion.div>
        ))}

        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-xl font-semibold mb-2"
        >
          Skills
        </motion.h3>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.05 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {data.skills.map((skill, index) => (
            <motion.span
              key={index}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              whileHover={{ scale: 1.1 }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-xl font-semibold mb-2"
        >
          Languages
        </motion.h3>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.15 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {data.languages.map((lang, index) => (
            <motion.span
              key={index}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              whileHover={{ scale: 1.1 }}
            >
              {lang}
            </motion.span>
          ))}
        </motion.div>

        <motion.button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default CVModal;
