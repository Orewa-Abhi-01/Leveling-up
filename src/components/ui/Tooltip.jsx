import { motion } from "framer-motion";

const Tooltip = ({ text }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="absolute left-6 top-0 z-50 w-48 p-2 text-sm bg-black/90 text-cyan-100 rounded-lg shadow-lg border border-cyan-500/30"
  >
    {text}
  </motion.div>
);

export default Tooltip;