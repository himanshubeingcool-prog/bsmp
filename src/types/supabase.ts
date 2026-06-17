export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          minecraft_username: string | null;
          display_name: string | null;
          avatar_url: string | null;
          provider: string | null;
          role: 'user' | 'moderator' | 'admin';
          rank: string;
          balance: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          minecraft_username?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          provider?: string | null;
          role?: 'user' | 'moderator' | 'admin';
          rank?: string;
          balance?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          minecraft_username?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          provider?: string | null;
          role?: 'user' | 'moderator' | 'admin';
          rank?: string;
          balance?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Functions: {
      is_minecraft_username_taken: {
        Args: { p_username: string };
        Returns: boolean;
      };
    };
  };
}
