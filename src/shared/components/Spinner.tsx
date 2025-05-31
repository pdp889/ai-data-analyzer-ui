import { motion } from 'framer-motion';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  borderColor?: string;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
} as const;

export const Spinner = ({
  size = 'md',
  color = 'border-blue-500',
  borderColor = 'border-t-transparent',
}: SpinnerProps): JSX.Element => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    }}
    className={`${sizeMap[size]} border-4 ${color} ${borderColor} rounded-full`}
  />
);
