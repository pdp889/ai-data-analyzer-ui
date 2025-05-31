import { motion } from 'framer-motion';
import { FileIcon } from '../../features/file-upload/components/FileIcon';
import { HeaderStatus } from '../types/header.types';
import { HEADER_SUBTITLES, HEADER_TITLE } from '../constants/header.constants';

interface HeaderProps {
  status: HeaderStatus;
  title?: string;
  icon?: React.ReactNode;
}

export const Header = ({
  status,
  title = HEADER_TITLE,
  icon = <FileIcon />,
}: HeaderProps): JSX.Element => {
  const subtitle = HEADER_SUBTITLES[status];

  return (
    <motion.div
      layout
      className={`mb-8 ${status === HeaderStatus.ANALYSIS ? 'max-w-[1600px] mx-auto' : ''}`}
    >
      <motion.div layout className="flex items-center space-x-4 mb-4">
        <motion.div layout>{icon}</motion.div>
        <motion.div layout>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          {subtitle && (
            <motion.p
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-600"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
