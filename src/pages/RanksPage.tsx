import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { StaggerGroup, StaggerItem } from '@/components/ui/Stagger'
import { Check, ShoppingCart, Crown, ArrowUpRight, Gem, Swords, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { RANKS } from '@/lib/mock-data'
import { getRankGradient } from '@/lib/utils'
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

function rankToProduct(rank: Rank) {
  return {
    id: rank.id,
    name: `${rank.name} Rank`,
    description: rank.description,
    category: 'ranks' as const,
    price: rank.price,
    salePrice: undefined,
    image: '👑',
    features: rank.perks,
    inStock: true,
    popular: rank.popular,
  } as const;
}

export function RanksPage() {
  const [selectedRank, setSelectedRank] = useState<Rank | null>(null)
  const nextRank = getNextRank(CURRENT_RANK)
  const { addItem } = useCart()
  const { addToast } = useToast()

  const handleAddRank = (rank: Rank) => {
    addItem(rankToProduct(rank))
    addToast('success', `${rank.name} Rank added to cart`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s', animationDuration: '8s' }} />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s', animationDuration: '10s' }} />
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s', animationDuration: '12s' }} />
        <motion.div
          className="absolute top-20 left-[15%] opacity-10"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Gem className="w-12 h-12 text-cyan-400" />
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
          <Sparkles className="w-8 h-8 text-cyan-400" />
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Crown className="w-4 h-4 text-cyan-400" />
            <span className="text-xs sm:text-sm font-medium text-cyan-400">Premium Ranks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-3">
            Server <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-gold-400">Ranks</span>
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
                  <p className="text-sm text-gray-400">Your Rank: <span className="text-cyan-400 font-semibold">{CURRENT_RANK.name}</span></p>
                  <p className="text-lg font-heading font-bold text-white">
                    Upgrade to <span style={{ color: nextRank.color }}>{nextRank.name}</span> — ${nextRank.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <Button variant="gold" size="lg" icon={<Crown className="w-5 h-5" />} onClick={() => handleAddRank(nextRank)}>
                Add to Cart — ${nextRank.price.toFixed(2)}
              </Button>
            </div>
          </Card>
        )}

        <StaggerGroup
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12"
        >
          {RANKS.filter(r => r.price > 0).map((rank) => {
            const isFeatured = rank.id === 'rank-mvpp'
            const isCurrent = rank.id === CURRENT_RANK.id
            const rankUpgradable = nextRank && rank.id === CURRENT_RANK.id

            return (
              <StaggerItem key={rank.id}
              >
              <Card
                variant={isFeatured ? 'highlight' : 'default'}
                hover
                tilt
                className={`relative overflow-hidden group tier-border transition-all duration-300 ${
                  isFeatured ? 'ring-2 ring-gold-500/50 shadow-lg shadow-gold-500/10' : ''
                }`}
                style={{
                  ['--tier-from' as string]: rank.color,
                  ['--tier-to' as string]: isFeatured ? '#eab308' : rank.color,
                }}
                onClick={() => setSelectedRank(rank)}
              >
                <div
                  className="absolute -inset-px rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(120% 90% at 50% -10%, ${rank.color}22 0%, transparent 60%)` }}
                />
                <span className="shine-layer rounded-[inherit]" />
                {isFeatured && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-gold-500 to-cyan-500 animate-gradient" />
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

                <div className="relative text-center mb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${getRankGradient(rank.name)} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                    style={{ boxShadow: `0 8px 30px -8px ${rank.color}66` }}
                  >
                    <Crown className="w-8 h-8 text-white drop-shadow" />
                  </div>
                  <h3 className="text-xl font-heading font-bold" style={{ color: rank.color }}>{rank.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{rank.description}</p>
                </div>

                <div className="relative z-10 flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-3xl font-bold text-white">${rank.price.toFixed(2)}</span>
                  {rank.monthlyPrice && (
                    <span className="text-sm text-gray-500">or ${rank.monthlyPrice.toFixed(2)}/mo</span>
                  )}
                </div>

                <ul className="relative z-10 space-y-2 mb-6">
                  {rank.perks.slice(0, 5).map((perk, pi) => (
                    <li key={pi} className="flex items-start gap-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                  {rank.perks.length > 5 && (
                    <li className="text-xs text-gray-500 pl-6">+{rank.perks.length - 5} more perks</li>
                  )}
                </ul>

                <div className="relative z-10">
                {rankUpgradable ? (
                  <Button variant="gold" size="md" fullWidth icon={<ShoppingCart className="w-4 h-4" />} onClick={() => handleAddRank(nextRank!)}>
                    Add to Cart
                  </Button>
                ) : (
                  <Button
                    variant={isCurrent ? 'secondary' : 'primary'}
                    size="md"
                    fullWidth
                    icon={isCurrent ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                    onClick={isCurrent ? undefined : () => handleAddRank(rank)}
                  >
                    {isCurrent ? 'Current Rank' : `Add to Cart — $${rank.price.toFixed(2)}`}
                  </Button>
                )}
                </div>
              </Card>
              </StaggerItem>
            )
          })}
        </StaggerGroup>

        <Card variant="default" padding="none">
          <div className="p-4 sm:p-6 border-b border-stone-800">
            <h2 className="text-xl font-heading font-bold text-white">Rank Comparison</h2>
            <p className="text-sm text-gray-400 mt-1">Compare features across all ranks</p>
          </div>
          <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
            <table className="w-full text-sm min-w-[480px] sm:min-w-[600px]">
              <thead>
                <tr className="border-b border-stone-800">
                  <th className="text-left p-2 sm:p-4 text-gray-500 font-medium sticky left-0 bg-stone-950 z-10 min-w-[100px] sm:min-w-[140px]">Feature</th>
                  {RANKS.filter(r => r.price > 0).map(rank => (
                    <th key={rank.id} className="p-1.5 sm:p-4 text-center min-w-[60px] sm:min-w-[90px]">
                      <span className="font-heading font-bold text-xs sm:text-sm" style={{ color: rank.color }}>{rank.name}</span>
                      <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5">${rank.price.toFixed(2)}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_FEATURES.map((feature, fi) => (
                  <tr key={fi} className="border-b border-stone-800/50 hover:bg-stone-900/30 transition-colors">
                    <td className="p-2 sm:p-4 text-gray-400 sticky left-0 bg-stone-950 z-10 text-xs sm:text-sm">{feature}</td>
                    {RANKS.filter(r => r.price > 0).map(rank => {
                      const value = getPerkValue(rank.name, feature)
                      const hasIt = hasPerk(rank.name, feature)
                      const isCurrent = CURRENT_RANK.name === rank.name

                      return (
                        <td key={rank.id} className={`p-2 sm:p-4 text-center ${isCurrent ? 'bg-cyan-900/10' : ''}`}>
                          {hasIt ? (
                            value === 'true' || value === '' ? (
                              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 mx-auto" />
                            ) : (
                              <span className="text-cyan-400 font-medium text-xs sm:text-sm">{value}</span>
                            )
                          ) : (
                            <span className="text-gray-600 text-xs sm:text-sm">—</span>
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
    </div>
  )
}
