import { motion } from 'framer-motion';

export const LoadingDots = (): JSX.Element => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-start"
  >
    <div className="bg-gray-100 text-gray-800 rounded-2xl p-3 rounded-bl-none">
      <div className="flex space-x-2">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="w-2 h-2 bg-gray-400 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
          className="w-2 h-2 bg-gray-400 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
          className="w-2 h-2 bg-gray-400 rounded-full"
        />
      </div>
    </div>
  </motion.div>
);
