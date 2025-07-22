import { usePortfolioData } from '../queries/usePortfolioData';
import { motion } from 'framer-motion';

function About() {
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
        About Me
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg mb-4"
      >
        {data.about.summary}
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p><strong>Name:</strong> {data.about.name}</p>
          <p><strong>Title:</strong> {data.about.title}</p>
          <p><strong>Address:</strong> {data.about.address}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p><strong>Contact:</strong> {data.about.contact}</p>
          <p><strong>Email:</strong> {data.about.email}</p>
          <p>
            <strong>GitHub:</strong>{' '}
            <motion.a
              href={data.about.github}
              target="_blank"
              className="text-teal-600 hover:text-teal-500"
              whileHover={{ scale: 1.1 }}
            >
              {data.about.github}
            </motion.a>
          </p>
          <p>
            <strong>LinkedIn:</strong>{' '}
            <motion.a
              href={data.about.linkedin}
              target="_blank"
              className="text-teal-600 hover:text-teal-500"
              whileHover={{ scale: 1.1 }}
            >
              {data.about.linkedin}
            </motion.a>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default About;