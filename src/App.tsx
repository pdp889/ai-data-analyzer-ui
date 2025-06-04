import { Toast } from './shared/components/Toast';
import { AppContent } from './shared/components/AppContent';

export const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Toast />
      <AppContent />
    </div>
  );
};
