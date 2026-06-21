import { useState, useEffect } from 'react';

const MC_SERVER_IP = '34.93.251.23';
const POLL_INTERVAL = 60000;

interface McServerStatus {
  online: boolean;
  playersOnline: number;
  playersMax: number;
  version: string;
  motd: string;
  icon: string | null;
  loading: boolean;
  error: string | null;
}

export function useMcServerStatus(): McServerStatus {
  const [status, setStatus] = useState<McServerStatus>({
    online: false,
    playersOnline: 0,
    playersMax: 0,
    version: '',
    motd: '',
    icon: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setTimeout>;

    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `https://api.mcstatus.io/v2/status/java/${MC_SERVER_IP}`
        );
        if (!res.ok) throw new Error(`MC status API returned ${res.status}`);
        const data = await res.json();

        if (!mounted) return;

        setStatus({
          online: data.online ?? false,
          playersOnline: data.players?.online ?? 0,
          playersMax: data.players?.max ?? 0,
          version: data.version?.name_clean ?? 'Unknown',
          motd: data.motd?.clean ?? '',
          icon: data.icon ?? null,
          loading: false,
          error: null,
        });
      } catch (err) {
        if (!mounted) return;
        setStatus(prev => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to fetch server status',
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
