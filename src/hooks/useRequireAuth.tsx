import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { LogIn } from 'lucide-react';

export function useRequireAuth() {
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const requireAuth = useCallback((action: () => void) => {
    if (isAuthenticated) {
      action();
    } else {
      setPendingAction(() => action);
      setShowAuthModal(true);
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setShowAuthModal(false);
    addToast('success', 'Please log in first to continue');
  };

  const handleContinue = () => {
    setShowAuthModal(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const AuthModal = (
    <Modal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} size="sm">
      <div className="text-center py-2">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-7 h-7 text-cyan-400" />
        </div>
        <h3 className="text-lg font-heading font-bold text-white mb-2">Login Required</h3>
        <p className="text-sm text-gray-400 mb-6">
          You need to be logged in to make purchases. Don't have an account? It's free!
        </p>
        <div className="flex flex-col gap-3">
          <Link
            to="/login"
            onClick={handleLogin}
            className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg text-sm transition-colors text-center"
          >
            Log In
          </Link>
          <Link
            to="/register"
            onClick={() => setShowAuthModal(false)}
            className="w-full py-2.5 bg-card hover:bg-card-hover text-gray-300 font-medium rounded-lg text-sm border border-border transition-colors text-center"
          >
            Create Account
          </Link>
        </div>
        <button
          onClick={() => setShowAuthModal(false)}
          className="mt-4 text-xs text-gray-500 hover:text-gray-400 transition-colors"
        >
          Continue browsing
        </button>
      </div>
    </Modal>
  );

  return { requireAuth, AuthModal };
}
