import { usePortfolioData } from '../queries/usePortfolioData';
import { motion } from 'framer-motion';

function Languages() {
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
        Languages
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-3"
      >
        {data.languages.map((lang, index) => (
          <motion.span
            key={index}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
            whileHover={{ scale: 1.1 }}
          >
            {lang}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default Languages;