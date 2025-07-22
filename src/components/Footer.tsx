import { motion } from 'framer-motion';

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 text-white py-4"
    >
      <div className="container mx-auto px-4 text-center">
        <p>© 2025 Ranish Shrestha. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}

export default Footer;