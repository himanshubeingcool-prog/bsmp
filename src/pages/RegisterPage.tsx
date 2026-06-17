import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { User, Mail, Lock, Eye, EyeOff, Globe, MessageCircle, Check } from 'lucide-react';
import { DiscordIcon } from '@/components/ui/SocialIcons';

function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-400', 'bg-green-500'];
  return { score, label: labels[score], color: colors[score] };
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, loginWithGoogle, loginWithDiscord } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordStrength = getPasswordStrength(form.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.password) { setError('Please fill in all fields'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (!agreed) { setError('You must agree to the terms'); return; }

    setLoading(true);
    const { error: registerError } = await register(form.email, form.password);
    setLoading(false);

    if (registerError) {
      if (registerError.includes('already registered')) {
        setError('An account with this email already exists');
      } else {
        setError(registerError);
      }
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-500/10 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white mb-2">Check Your Email</h1>
          <p className="text-gray-400 mb-6">
            We sent a verification link to <strong className="text-white">{form.email}</strong>.
            Click the link to activate your account.
          </p>
          <Link to="/login">
            <Button variant="primary">Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-gold-500 flex items-center justify-center font-heading font-bold text-stone-950">B</div>
            <span className="font-heading font-bold text-lg bg-gradient-to-r from-green-400 to-gold-400 bg-clip-text text-transparent">BhukkadSMP</span>
          </Link>
          <h1 className="text-2xl font-heading font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400 text-sm">Join the BhukkadSMP community</p>
        </div>

        <Card variant="default" padding="lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              icon={<Mail className="w-4 h-4" />}
            />

            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={form.password}
                onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                icon={<Lock className="w-4 h-4" />}
              />
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${i <= passwordStrength.score ? passwordStrength.color : 'bg-stone-700'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted">{passwordStrength.label}</p>
                </div>
              )}
            </div>

            <Input
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={e => setForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              icon={<Lock className="w-4 h-4" />}
            />

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-border bg-surface text-green-600 focus:ring-green-500"
              />
              <span className="text-xs text-muted leading-relaxed">
                I agree to the{' '}
                <Link to="/rules" className="text-green-400 hover:text-green-300">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/rules" className="text-green-400 hover:text-green-300">Privacy Policy</Link>
              </span>
            </label>

            {error && (
              <p className="text-sm text-red-400 bg-red-900/20 rounded-lg px-3 py-2 border border-red-500/20">{error}</p>
            )}

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
              Create Account
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted">or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" onClick={loginWithGoogle} className="!border-gray-700">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
            <Button variant="secondary" onClick={loginWithDiscord} className="!border-gray-700">
              <DiscordIcon className="w-4 h-4 text-[#5865F2]" />
              Discord
            </Button>
          </div>
        </Card>

        <p className="text-center text-sm text-muted mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-green-400 hover:text-green-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
