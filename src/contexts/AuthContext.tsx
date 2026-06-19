import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase, type Profile } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { getRedirectUrl } from '@/lib/redirect';
import { UsernameSetupModal } from '@/components/auth/UsernameSetupModal';

interface AuthContextType {
  supabaseUser: SupabaseUser | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  needsUsername: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (email: string, password: string) => Promise<{ error: string | null }>;
  loginWithGoogle: () => Promise<void>;
  loginWithDiscord: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  setMinecraftUsername: (username: string) => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (!error && data) {
      setProfile(data);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setSupabaseUser(session.user);
        await fetchProfile(session.user.id);
      }
      setIsLoading(false);
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSupabaseUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const refreshProfile = useCallback(async () => {
    if (supabaseUser) {
      await fetchProfile(supabaseUser.id);
    }
  }, [supabaseUser, fetchProfile]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Login error:', error);
        return { error: error.message || 'An unexpected error occurred during login' };
      }
      return { error: null };
    } catch (err) {
      console.error('Login error:', err);
      return { error: err instanceof Error ? err.message : 'An unexpected error occurred' };
    }
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    try {
      const { data: existingProvider } = await supabase.rpc('check_email_exists', {
        p_email: email,
      });

      if (existingProvider) {
        if (existingProvider === 'google') {
          return { error: 'This email is already linked with Google. Please continue with Google login.' };
        }
        if (existingProvider === 'email') {
          return { error: 'This email is already registered. Please login with email.' };
        }
        return { error: 'This email is already linked with a different login method. Please use the original login method.' };
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: getRedirectUrl('/auth/callback') },
      });

      if (error) {
        console.error('Signup error:', error);
        return { error: error.message || 'An unexpected error occurred during signup' };
      }

      return { error: null };
    } catch (err) {
      console.error('Signup error:', err);
      return { error: err instanceof Error ? err.message : 'An unexpected error occurred' };
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: getRedirectUrl('/auth/callback') },
    });
  }, []);

  const loginWithDiscord = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo: getRedirectUrl('/auth/callback') },
    });
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setSupabaseUser(null);
    setProfile(null);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getRedirectUrl('/auth/callback?type=recovery'),
    });
    return { error: error?.message ?? null };
  }, []);

  const setMinecraftUsername = useCallback(async (username: string) => {
    if (!supabaseUser) return { error: 'Not authenticated' };
    const { error } = await (supabase as any)
      .from('profiles')
      .update({ minecraft_username: username, display_name: username })
      .eq('id', supabaseUser.id);
    if (!error) {
      if (profile) setProfile({ ...profile, minecraft_username: username, display_name: username });
    }
    return { error: error?.message ?? null };
  }, [supabaseUser, profile]);

  const isAuthenticated = !!supabaseUser;
  const needsUsername = isAuthenticated && !!profile && !profile.minecraft_username;

  return (
    <AuthContext.Provider
      value={{
        supabaseUser,
        profile,
        isAuthenticated,
        isLoading,
        needsUsername,
        login,
        register,
        loginWithGoogle,
        loginWithDiscord,
        logout,
        resetPassword,
        setMinecraftUsername,
        refreshProfile,
      }}
    >
      {children}
      <UsernameSetupModal />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
