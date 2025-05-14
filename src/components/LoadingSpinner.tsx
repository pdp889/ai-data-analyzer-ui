import { motion } from 'framer-motion';
import { Header, HeaderStatus } from './Header';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({ message = "Analyzing your data..." }: LoadingSpinnerProps) => {
  return (
    <div className="max-w-2xl mx-auto p-8">
        <Header status={HeaderStatus.LOADING} />
        <div className="flex flex-col items-center justify-center space-y-4">
            <motion.div
            animate={{ rotate: 360 }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
            }}
            className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
            />
            <p className="text-sm text-gray-600">{message}</p>
        </div>
    </div>
  );
}; 