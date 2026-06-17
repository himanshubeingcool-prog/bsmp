import { useState, useEffect } from 'react';

const INVITE_CODE = import.meta.env.VITE_DISCORD_INVITE_CODE || 's7CETJXYhf';
const POLL_INTERVAL = 30000;

interface DiscordStatus {
  onlineCount: number;
  memberCount: number;
  guildName: string;
  guildIcon: string | null;
  loading: boolean;
  error: string | null;
}

export function useDiscordStatus(): DiscordStatus {
  const [status, setStatus] = useState<DiscordStatus>({
    onlineCount: 0,
    memberCount: 0,
    guildName: 'BhukkadSMP',
    guildIcon: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setTimeout>;

    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `https://discord.com/api/v10/invites/${INVITE_CODE}?with_counts=true`
        );
        if (!res.ok) throw new Error(`Discord API returned ${res.status}`);
        const data = await res.json();

        if (!mounted) return;

        setStatus({
          onlineCount: data.approximate_presence_count ?? 0,
          memberCount: data.approximate_member_count ?? 0,
          guildName: data.guild?.name ?? 'BhukkadSMP',
          guildIcon: data.guild?.icon
            ? `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png`
            : null,
          loading: false,
          error: null,
        });
      } catch (err) {
        if (!mounted) return;
        setStatus(prev => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to fetch Discord status',
        }));
      }
    };

    fetchStatus();
    timer = setInterval(fetchStatus, POLL_INTERVAL);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  return status;
}
