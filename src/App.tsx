import { Toast } from './components/Toast';
import { MainContent } from './components/MainContent';

export const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Toast />
      <MainContent />
    </div>
  );
};
