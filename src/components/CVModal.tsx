import { AnimatePresence, motion } from "framer-motion";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CVModal({ isOpen, onClose }: CVModalProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-slate-900 shadow-[0_30px_120px_rgba(15,23,42,0.65)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Curriculum Vitae</p>
                <h2 className="text-lg font-semibold text-white">Ranish-Shrestha-cv.pdf</h2>
              </div>
              <div className="flex items-center gap-3">
                <motion.a
                  href="/Ranish-Shrestha-cv.pdf"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/8"
                >
                  Open PDF
                </motion.a>
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950"
                >
                  Close
                </motion.button>
              </div>
            </div>
            <iframe
              title="Ranish CV"
              src="/Ranish-Shrestha-cv.pdf"
              className="min-h-0 flex-1 bg-white"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default CVModal;
