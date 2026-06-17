import { InfiniteRibbon } from '@/components/ui/infinite-ribbon'

export function ServerRibbon() {
  const text = ' BhukkadSMP — Premium Minecraft Survival — play.bhukkadsmp.com — 1,247 Players Online — Ranks • Keys • Crates • Custom Economy '

  return (
    <div className="relative -mt-px">
      <InfiniteRibbon
        duration={52}
        rotation={0}
        className="bg-gradient-to-r from-green-900/40 via-gold-900/20 to-green-900/40 border-y border-green-500/10 text-green-300 leading-relaxed"
      >
        {text}
      </InfiniteRibbon>
      <InfiniteRibbon
        duration={52}
        reverse
        rotation={0}
        className="bg-gradient-to-r from-gold-900/20 via-green-900/30 to-gold-900/20 border-b border-gold-500/10 text-gold-300/80 text-xs leading-relaxed"
      >
        {text}
      </InfiniteRibbon>
    </div>
  )
}
