import { Header } from './Header';
import { Spinner } from './Spinner';
import { HeaderStatus } from '../types/header.types';
import { LOADING_MESSAGES } from '../constants/loading.constants';

interface LoadingSpinnerProps {
  status?: HeaderStatus;
  spinnerSize?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner = ({
  status = HeaderStatus.LOADING,
  spinnerSize = 'md',
}: LoadingSpinnerProps): JSX.Element => (
  <div className="max-w-2xl mx-auto p-8">
    <Header status={status} />
    <div className="flex flex-col items-center justify-center space-y-4">
      <Spinner size={spinnerSize} />
      <p className="text-sm text-gray-600">{LOADING_MESSAGES[status]}</p>
    </div>
  </div>
);
