import { useDiscordStatus } from '@/hooks/useDiscordStatus'
import { useMcServerStatus } from '@/hooks/useMcServerStatus'
import { InfiniteRibbon } from '@/components/ui/infinite-ribbon'

export function ServerRibbon() {
  const { onlineCount, loading } = useDiscordStatus()
  const { playersOnline, playersMax, loading: mcLoading } = useMcServerStatus()
  const dcCount = loading ? '...' : onlineCount.toLocaleString()
  const mcCount = mcLoading ? '...' : `${playersOnline}/${playersMax}`
  const text = ` BhukkadSMP — ${mcCount} in-game • ${dcCount} on Discord — play.bhukkadsmp.fun — Custom Arenas • Practice PvP • Ranks • Crates `

  return (
    <div className="relative -mt-px">
      <InfiniteRibbon
        duration={52}
        rotation={0}
        className="bg-gradient-to-r from-cyan-950/60 via-transparent to-cyan-950/60 border-y border-white/5 text-cyan-300/70 leading-relaxed"
      >
        {text}
      </InfiniteRibbon>
      <InfiniteRibbon
        duration={52}
        reverse
        rotation={0}
        className="bg-gradient-to-r from-gold-950/40 via-transparent to-gold-950/40 border-b border-white/5 text-gold-300/50 text-xs leading-relaxed"
      >
        {text}
      </InfiniteRibbon>
    </div>
  )
}
