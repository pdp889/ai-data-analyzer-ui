import { Header } from './Header';
import { Spinner } from './Spinner';
import { HeaderStatus } from '../types/header.types';

interface LoadingSpinnerProps {
  status?: HeaderStatus;
  spinnerSize?: 'sm' | 'md' | 'lg';
  fileName: string;
}

export const LoadingSpinner = ({
  status = HeaderStatus.LOADING,
  spinnerSize = 'md',
  fileName = ''
}: LoadingSpinnerProps): JSX.Element => {
  const message = status === HeaderStatus.LOADING ? `Analyzing your data: ${fileName}` : 'Checking for existing analysis...';

  return (
  <div className="max-w-2xl mx-auto p-8">
    <Header status={status} />
    <div className="flex flex-col items-center justify-center space-y-4">
      <Spinner size={spinnerSize} />
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  </div>
)};
