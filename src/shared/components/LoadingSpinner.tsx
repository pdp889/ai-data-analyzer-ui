import { Header } from './Header';
import { Spinner } from './Spinner';
import { HeaderStatus } from '../types/header.types';
import { useAgentStatus } from '../hooks/use-agent-status.hook';

interface LoadingSpinnerProps {
  status?: HeaderStatus;
  spinnerSize?: 'sm' | 'md' | 'lg';
  fileName: string;
}

const getAgentIcon = (agent: string) => {
  switch (agent) {
    case 'Profiler Agent':
      return '🔍';
    case 'Detective Agent':
      return '🕵️';
    case 'Storyteller Agent':
      return '📖';
    case 'Additional Context Agent':
      return '🌐';
    case 'Analysis Pipeline':
      return '🚀';
    default:
      return '🤖';
  }
};

export const LoadingSpinner = ({
  status = HeaderStatus.LOADING,
  spinnerSize = 'md',
  fileName = '',
}: LoadingSpinnerProps): JSX.Element => {
  const { agentStatus } = useAgentStatus();

  const getAgentMessage = () => {
    if (!agentStatus) {
      return `Analyzing your data: ${fileName}`;
    }

    const agentIcon = getAgentIcon(agentStatus.agent);
    return `${agentIcon} ${agentStatus.agent}: ${agentStatus.message}`;
  };

  const message =
    status === HeaderStatus.LOADING ? getAgentMessage() : 'Checking for existing analysis...';

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Header status={status} />
      <div className="flex flex-col items-center justify-center space-y-4">
        <Spinner size={spinnerSize} />
        <p className="text-sm text-gray-600">{message}</p>
        {status === HeaderStatus.LOADING && fileName && (
          <p className="text-xs text-gray-500">File: {fileName}</p>
        )}
      </div>
    </div>
  );
};
