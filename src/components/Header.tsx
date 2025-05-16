import { motion } from 'framer-motion';
import { FileIcon } from './FileIcon';
import { HeaderStatus } from '../types/header';

interface HeaderProps {
  status: HeaderStatus;
}

export const Header = ({ status }: HeaderProps) => {
  const getSubtitle = () => {
    switch (status) {
      case HeaderStatus.UPLOAD:
        return 'Upload your data file to get started';
      case HeaderStatus.LOADING:
        return 'Your data is being analyzed in real-time';
      case HeaderStatus.ANALYSIS:
        return '';
      case HeaderStatus.FETCHING_ANALYSIS:
        return '';
      default:
        return '';
    }
  };

  return (
    <motion.div
      layout
      className={`mb-8 ${status === HeaderStatus.ANALYSIS ? 'max-w-[1600px] mx-auto' : ''}`}
    >
      <motion.div layout className="flex items-center space-x-4 mb-4">
        <motion.div layout>
          <FileIcon />
        </motion.div>
        <motion.div layout>
          <h1 className="text-2xl font-bold text-gray-800">AI Data Analysis</h1>
          {getSubtitle() && (
            <motion.p
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-600"
            >
              {getSubtitle()}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
