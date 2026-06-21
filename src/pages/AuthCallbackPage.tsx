import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { LoadingScreen } from '@/components/auth/LoadingScreen';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setError(error.message);
        return;
      }
      if (data?.session?.user) {
        const user = data.session.user;

        if (user.email) {
          const { data: existingProvider } = await supabase.rpc('check_email_exists', {
            p_email: user.email,
            p_exclude_user_id: user.id,
          });

          if (existingProvider) {
            await supabase.auth.signOut();
            const method = existingProvider === 'google'
              ? 'Google'
              : existingProvider === 'email'
              ? 'email'
              : 'a different login method';
            setError(`This email is already linked with ${method}. Please use the original login method.`);
            return;
          }
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('minecraft_username')
          .eq('id', user.id)
          .single();

        const returnTo = localStorage.getItem('auth_redirect');
        localStorage.removeItem('auth_redirect');

        const p = profile as { minecraft_username: string | null } | null;
        if (p && !p.minecraft_username) {
          navigate('/setup-username', { replace: true });
        } else {
          navigate(returnTo || '/dashboard', { replace: true });
        }
      } else {
        navigate('/login', { replace: true });
      }
    };
    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 flex items-center justify-center">
            <span className="text-2xl">!</span>
          </div>
          <h2 className="text-xl font-heading font-bold text-white mb-2">Authentication Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return <LoadingScreen />;
}
