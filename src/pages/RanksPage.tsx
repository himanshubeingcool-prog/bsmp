import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { Check, ShoppingCart, Star, Shield, Crown, Zap, ArrowUpRight, Gem, Swords, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { RANKS } from '@/lib/mock-data'
import { getRankColor, getRankGradient, cn } from '@/lib/utils'
import type { Rank } from '@/types'

const CURRENT_RANK: Rank = RANKS[1]

const COMPARE_FEATURES = [
  '/fly anywhere',
  '/hat command',
  '/craft command',
  '/ec (enderchest)',
  '/feed',
  '/heal',
  '/near',
  '/ptime',
  '/nickname',
  '/skull',
  '/workbench',
  '/gamemode spectator',
  '/god command',
  'Vote multiplier',
  'Priority queue',
  'Lifetime rank',
]

const RANK_FEATURE_MAP: Record<string, string[]> = {
  Voter: ['/fly in spawn', '', '', '', '', '', '', '', '', '', '', '', '', '2x', '', ''],
  VIP: ['/fly everywhere', '/hat command', '/craft command', '/ec (enderchest)', '', '', '', '', '', '', '', '', '', '3x', '', ''],
  MVP: ['/fly everywhere', '/hat command', '/craft command', '/ec (enderchest)', '/feed', '/heal', '/near', '/ptime', '', '', '', '', '', '4x', '', ''],
  'MVP+': ['/fly everywhere', '/hat command', '/craft command', '/ec (enderchest)', '/feed', '/heal', '/near', '/ptime', '/nickname', '/skull', '/workbench', '', '', '5x', '', ''],
  Elite: ['/fly everywhere', '/hat command', '/craft command', '/ec (enderchest)', '/feed', '/heal', '/near', '/ptime', '/nickname', '/skull', '/workbench', '/gamemode spectator', '', '6x', 'Priority queue', ''],
  Immortal: ['/fly everywhere', '/hat command', '/craft command', '/ec (enderchest)', '/feed', '/heal', '/near', '/ptime', '/nickname', '/skull', '/workbench', '/gamemode spectator', '/god command', '7x', 'Priority queue', ''],
  Legend: ['/fly everywhere', '/hat command', '/craft command', '/ec (enderchest)', '/feed', '/heal', '/near', '/ptime', '/nickname', '/skull', '/workbench', '/gamemode spectator', '/god command', '10x', 'Priority queue', 'Lifetime rank'],
}

function hasPerk(rankName: string, feature: string): boolean {
  const perks = RANK_FEATURE_MAP[rankName]
  if (!perks) return false
  const idx = COMPARE_FEATURES.indexOf(feature)
  if (idx === -1) return false
  return perks[idx] !== undefined && perks[idx] !== ''
}

function getPerkValue(rankName: string, feature: string): string {
  const perks = RANK_FEATURE_MAP[rankName]
  if (!perks) return ''
  const idx = COMPARE_FEATURES.indexOf(feature)
  if (idx === -1) return ''
  return perks[idx]
}

function getNextRank(current: Rank): Rank | null {
  const idx = RANKS.findIndex(r => r.id === current.id)
  if (idx < RANKS.length - 1) return RANKS[idx + 1]
  return null
}

export function RanksPage() {
  const [selectedRank, setSelectedRank] = useState<Rank | null>(null)
  const nextRank = getNextRank(CURRENT_RANK)
  const { requireAuth, AuthModal } = useRequireAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s', animationDuration: '8s' }} />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s', animationDuration: '10s' }} />
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s', animationDuration: '12s' }} />
        <motion.div
          className="absolute top-20 left-[15%] opacity-10"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Gem className="w-12 h-12 text-green-400" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-[20%] opacity-10"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          <Swords className="w-10 h-10 text-gold-400" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-[10%] opacity-10"
          animate={{ y: [-10, 10, -10], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="w-8 h-8 text-green-400" />
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
            <Crown className="w-4 h-4 text-green-400" />
            <span className="text-xs sm:text-sm font-medium text-green-400">Premium Ranks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-3">
            Server <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gold-400">Ranks</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Unlock exclusive perks, commands, and status. Each rank builds upon the last.
          </p>
        </motion.div>

        {nextRank && (
          <Card variant="highlight" className="mb-10 border-gold-500/30 bg-gradient-to-r from-gold-900/10 to-gold-900/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <ArrowUpRight className="w-8 h-8 text-gold-400" />
                <div>
                  <p className="text-sm text-gray-400">Your Rank: <span className="text-emerald-400 font-semibold">{CURRENT_RANK.name}</span></p>
                  <p className="text-lg font-heading font-bold text-white">
                    Upgrade to <span style={{ color: nextRank.color }}>{nextRank.name}</span> — ${nextRank.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <Button variant="gold" size="lg" icon={<Crown className="w-5 h-5" />} onClick={() => requireAuth(() => {})}>
                Upgrade to {nextRank.name}
              </Button>
            </div>
          </Card>
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12"
        >
          {RANKS.filter(r => r.price > 0).map((rank, i) => {
            const isFeatured = rank.id === 'rank-mvpp'
            const isCurrent = rank.id === CURRENT_RANK.id
            const rankUpgradable = nextRank && rank.id === CURRENT_RANK.id

            return (
              <motion.div
                key={rank.id}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
              <Card
                variant={isFeatured ? 'highlight' : 'default'}
                hover
                tilt
                className={`relative overflow-hidden group transition-all duration-300 ${
                  isFeatured ? 'ring-2 ring-gold-500/50 shadow-lg shadow-gold-500/10' : ''
                }`}
                onClick={() => setSelectedRank(rank)}
              >
                {isFeatured && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-gold-500 to-green-500" />
                )}
                {rank.popular && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge variant="gold">Popular</Badge>
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute top-3 left-3 z-10">
                    <Badge variant="success">Current</Badge>
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${getRankGradient(rank.name)} flex items-center justify-center shadow-lg`}>
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-bold" style={{ color: rank.color }}>{rank.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{rank.description}</p>
                </div>

                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-3xl font-bold text-white">${rank.price.toFixed(2)}</span>
                  {rank.monthlyPrice && (
                    <span className="text-sm text-gray-500">or ${rank.monthlyPrice.toFixed(2)}/mo</span>
                  )}
                </div>

                <ul className="space-y-2 mb-6">
                  {rank.perks.slice(0, 5).map((perk, pi) => (
                    <li key={pi} className="flex items-start gap-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                  {rank.perks.length > 5 && (
                    <li className="text-xs text-gray-500 pl-6">+{rank.perks.length - 5} more perks</li>
                  )}
                </ul>

                {rankUpgradable ? (
                  <Button variant="gold" size="md" fullWidth icon={<ArrowUpRight className="w-4 h-4" />} onClick={() => requireAuth(() => {})}>
                    Upgrade to {nextRank?.name}
                  </Button>
                ) : (
                  <Button
                    variant={isCurrent ? 'secondary' : 'primary'}
                    size="md"
                    fullWidth
                    icon={isCurrent ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                    onClick={isCurrent ? undefined : () => requireAuth(() => {})}
                  >
                    {isCurrent ? 'Current Rank' : `Buy ${rank.name}`}
                  </Button>
                )}
              </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <Card variant="default" className="overflow-hidden" padding="none">
          <div className="p-4 sm:p-6 border-b border-stone-800">
            <h2 className="text-xl font-heading font-bold text-white">Rank Comparison</h2>
            <p className="text-sm text-gray-400 mt-1">Compare features across all ranks</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-800">
                  <th className="text-left p-3 sm:p-4 text-gray-500 font-medium sticky left-0 bg-stone-950 z-10 min-w-[160px]">Feature</th>
                  {RANKS.filter(r => r.price > 0).map(rank => (
                    <th key={rank.id} className="p-3 sm:p-4 text-center min-w-[100px]">
                      <span className="font-heading font-bold" style={{ color: rank.color }}>{rank.name}</span>
                      <div className="text-xs text-gray-500 mt-0.5">${rank.price.toFixed(2)}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_FEATURES.map((feature, fi) => (
                  <tr key={fi} className="border-b border-stone-800/50 hover:bg-stone-900/30 transition-colors">
                    <td className="p-3 sm:p-4 text-gray-400 sticky left-0 bg-stone-950 z-10">{feature}</td>
                    {RANKS.filter(r => r.price > 0).map(rank => {
                      const value = getPerkValue(rank.name, feature)
                      const hasIt = hasPerk(rank.name, feature)
                      const isCurrent = CURRENT_RANK.name === rank.name

                      return (
                        <td key={rank.id} className={`p-3 sm:p-4 text-center ${isCurrent ? 'bg-green-900/10' : ''}`}>
                          {hasIt ? (
                            value === 'true' || value === '' ? (
                              <Check className="w-4 h-4 text-green-400 mx-auto" />
                            ) : (
                              <span className="text-green-400 font-medium">{value}</span>
                            )
                          ) : (
                            <span className="text-gray-600">—</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      {AuthModal}
    </div>
  )
}
