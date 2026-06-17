import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) { setError('Please enter your email'); return; }
    setLoading(true);
    const { error: resetError } = await resetPassword(email);
    setLoading(false);
    if (resetError) { setError(resetError); return; }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-500/10 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white mb-2">Check Your Email</h1>
          <p className="text-gray-400 mb-2">
            We sent a password reset link to <strong className="text-white">{email}</strong>.
          </p>
          <p className="text-sm text-muted mb-6">
            Didn't receive it?{' '}
            <button onClick={() => setSent(false)} className="text-green-400 hover:text-green-300 transition-colors">
              Try a different email
            </button>
          </p>
          <Link to="/login">
            <Button variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
              Back to Login
            </Button>
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
          <h1 className="text-2xl font-heading font-bold text-white mb-2">Reset Password</h1>
          <p className="text-gray-400 text-sm">We'll send you a reset link</p>
        </div>

        <Card variant="default" padding="lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
            />

            {error && (
              <p className="text-sm text-red-400 bg-red-900/20 rounded-lg px-3 py-2 border border-red-500/20">{error}</p>
            )}

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
              Send Reset Link
            </Button>
          </form>
        </Card>

        <p className="text-center mt-6">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-green-400 hover:text-green-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
