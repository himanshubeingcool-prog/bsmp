import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AlertCircle, Check, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,16}$/;

export function SetupUsernamePage() {
  const navigate = useNavigate();
  const { supabaseUser, isAuthenticated, isLoading, needsUsername, setMinecraftUsername } = useAuth();
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate('/login', { replace: true });
    if (!isLoading && isAuthenticated && !needsUsername) navigate('/dashboard', { replace: true });
  }, [isLoading, isAuthenticated, needsUsername, navigate]);

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
    navigate('/dashboard', { replace: true });
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-gold-500 flex items-center justify-center">
            <User className="w-8 h-8 text-stone-950" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Set Your Minecraft Username</h1>
          <p className="text-gray-400">
            This will be your display name across the entire website.
          </p>
        </div>

        <Card variant="default" padding="lg">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                <strong className="text-white">Why do we need this?</strong><br />
                Your Minecraft username will be used as your website identity.
                It links your in-game character to your web profile, purchases, and leaderboard stats.
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
              Confirm Username
            </Button>

            <p className="text-xs text-center text-gray-500">
              This can be changed later in your profile settings.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
