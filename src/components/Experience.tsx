import { usePortfolioData } from '../queries/usePortfolioData';
import { motion } from 'framer-motion';

function Experience() {
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
        Experience
      </motion.h2>
      {data.experience.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="mb-6"
        >
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="text-lg">{exp.company}, {exp.location}</p>
          <p className="text-gray-600">{exp.duration}</p>
          <ul className="list-disc pl-5 mt-2">
            {exp.responsibilities.map((resp, idx) => (
              <li key={idx}>{resp}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.section>
  );
}

export default Experience;