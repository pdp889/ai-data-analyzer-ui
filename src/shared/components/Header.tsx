import { motion } from 'framer-motion';
import { HeaderStatus } from '../types/header.types';
import { HEADER_SUBTITLES, HEADER_TITLE } from '../constants/header.constants';

interface HeaderProps {
  status: HeaderStatus;
  title?: string;
}

export const Header = ({ status, title = HEADER_TITLE }: HeaderProps): JSX.Element => {
  const subtitle = HEADER_SUBTITLES[status];

  return (
    <div
      className={`mb-4 sm:mb-8 ${status === HeaderStatus.ANALYSIS ? 'max-w-[1600px] mx-5' : ''}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍔</span>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h1>
          </div>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm sm:text-base text-gray-600 max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};
