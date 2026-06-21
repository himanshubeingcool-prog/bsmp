import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { AlertCircle, Check, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,16}$/;

export function UsernameSetupModal() {
  const { needsUsername, isAuthenticated, isLoading, setMinecraftUsername, refreshProfile } = useAuth();
  const { pathname } = useLocation();
  const isOnSetupPage = pathname === '/setup-username';
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const validate = (value: string): string | null => {
    if (!value.trim()) return 'Minecraft username is required';
    if (value.length < 3) return 'Username must be at least 3 characters';
    if (value.length > 16) return 'Username must be 16 characters or less';
    if (!USERNAME_REGEX.test(value)) return 'Only letters, numbers, and underscores allowed';
    return null;
  };

  useEffect(() => {
    const value = username.trim();
    const validationError = validate(value);
    if (validationError || value.length < 3) {
      setError(validationError);
      setIsAvailable(null);
      return;
    }
    setError(null);
    const timer = setTimeout(async () => {
      setChecking(true);
      const { data, error: fnError } = await supabase.rpc('is_minecraft_username_taken', { p_username: value } as any);
      if (!fnError) {
        setIsAvailable(!data);
        if (data) setError('This Minecraft username is already taken');
        else setError(null);
      }
      setChecking(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate(username.trim());
    if (validationError) { setError(validationError); return; }
    if (isAvailable === false) { setError('This Minecraft username is already taken'); return; }

    setIsSubmitting(true);
    const { error: submitError } = await setMinecraftUsername(username.trim());
    setIsSubmitting(false);

    if (submitError) {
      if (submitError.includes('duplicate') || submitError.includes('unique')) {
        setError('This Minecraft username is already taken');
      } else {
        setError(submitError);
      }
      return;
    }

    await refreshProfile();
  };

  if (isLoading || !isAuthenticated || isOnSetupPage) return null;

  return (
    <Modal isOpen={!!needsUsername} onClose={() => {}} size="md">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-gold-500 flex items-center justify-center">
          <User className="w-8 h-8 text-stone-950" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-white mb-2">Welcome!</h2>
        <p className="text-sm text-gray-400">
          Set your Minecraft username to continue. This will be your display name across the website.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Minecraft Username
          </label>
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your Minecraft username"
              maxLength={16}
              autoFocus
              className={`
                w-full bg-surface border rounded-lg px-4 py-3 text-sm text-white
                placeholder-gray-500 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                ${error ? 'border-red-500 focus:ring-red-500/50' : isAvailable ? 'border-cyan-500' : 'border-border'}
              `}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {checking ? (
                <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              ) : isAvailable ? (
                <Check className="w-4 h-4 text-cyan-400" />
              ) : null}
            </div>
          </div>
          {error && (
            <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
              <AlertCircle className="w-3 h-3" />
              {error}
            </p>
          )}
          {isAvailable && !error && (
            <p className="flex items-center gap-1.5 mt-1.5 text-xs text-cyan-400">
              <Check className="w-3 h-3" />
              Username available
            </p>
          )}
        </div>

        <div className="bg-surface rounded-lg p-3 border border-border">
          <p className="text-xs text-muted leading-relaxed">
            Your Minecraft username links your in-game character to your web profile, purchases, and future leaderboard stats.
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isSubmitting}
          disabled={!isAvailable || !!error || !username.trim()}
          icon={<Check className="w-4 h-4" />}
        >
          Set Username
        </Button>
      </form>
    </Modal>
  );
}
