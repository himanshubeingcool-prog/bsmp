import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { ShoppingCart, Crown, Package, Key, Gift, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CRATES, KEY_BUNDLES } from '@/lib/mock-data'
import { getRarityColor, getRarityBg } from '@/lib/utils'
import type { ProductCategory } from '@/types'

const rarityBorderAnimations: Record<string, string> = {
  common: 'before:animate-pulse before:border-gray-500',
  rare: 'before:animate-pulse before:border-blue-500',
  epic: 'before:animate-pulse before:border-purple-500',
  legendary: 'before:animate-pulse before:border-yellow-500',
  mythic: 'before:animate-pulse before:border-red-500',
}

function RarityBadge({ rarity }: { rarity: string }) {
  const variantMap: Record<string, 'default' | 'info' | 'premium' | 'gold' | 'danger'> = {
    common: 'default',
    rare: 'info',
    epic: 'premium',
    legendary: 'gold',
    mythic: 'danger',
  }
  return (
    <Badge variant={variantMap[rarity] || 'default'} size="sm">
      {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
    </Badge>
  )
}

export function CratesPage() {
  const [openingCrate, setOpeningCrate] = useState<string | null>(null)
  const [showRewards, setShowRewards] = useState<string | null>(null)
  const { addItem } = useCart()
  const { addToast } = useToast()

  const featuredCrate = CRATES.find(c => c.id === 'crate-mythic') || CRATES[0]
  const otherCrates = CRATES.filter(c => c.id !== featuredCrate.id)

  const handleOpen = (crateId: string) => {
    setOpeningCrate(crateId)
    setTimeout(() => {
      setOpeningCrate(null)
      setShowRewards(crateId)
      setTimeout(() => setShowRewards(null), 4000)
    }, 1500)
  }

  const handleAddCrate = (crate: typeof CRATES[number]) => {
    addItem({
      id: crate.id,
      name: crate.name,
      description: crate.description,
      category: 'crates' as ProductCategory,
      price: crate.price,
      image: crate.image,
      features: [],
      inStock: true,
    })
    addToast('success', `${crate.name} added to cart`)
  }

  const handleAddBundle = (bundle: typeof KEY_BUNDLES[number]) => {
    addItem({
      id: bundle.id,
      name: bundle.name,
      description: `${bundle.keys} Keys`,
      category: 'keys' as ProductCategory,
      price: bundle.price,
      image: bundle.image,
      features: [],
      inStock: true,
      discount: bundle.discount,
    })
    addToast('success', `${bundle.name} added to cart`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-3">
            <Package className="w-8 h-8 inline-block text-green-400 mr-2" />
            Crates
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Open crates to win exclusive rewards. The rarer the crate, the better the loot.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Crown className="w-6 h-6 text-gold-400" />
            <h2 className="text-2xl font-heading font-bold text-white">Featured Crate</h2>
          </div>
          <Card
            variant="highlight"
            className={`relative overflow-hidden border-2 ${getRarityColor(featuredCrate.rarity)} ${getRarityBg(featuredCrate.rarity)}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/5 to-transparent animate-pulse pointer-events-none" />
            <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
              <div className="flex-shrink-0">
                <div className="text-8xl lg:text-9xl animate-bounce-slow">{featuredCrate.image}</div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">{featuredCrate.name}</h3>
                  <RarityBadge rarity={featuredCrate.rarity} />
                </div>
                <p className="text-gray-400 mb-4 max-w-lg">{featuredCrate.description}</p>
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                  <span className="text-3xl font-bold text-green-400">${featuredCrate.price.toFixed(2)}</span>
                  <div className="flex gap-3">
                    <Button
                      variant="gold"
                      size="lg"
                      icon={<Zap className="w-5 h-5" />}
                      onClick={() => handleOpen(featuredCrate.id)}
                      loading={openingCrate === featuredCrate.id}
                    >
                      {openingCrate === featuredCrate.id ? 'Opening...' : 'Open Crate'}
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      icon={<ShoppingCart className="w-5 h-5" />}
                      onClick={() => handleAddCrate(featuredCrate)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {featuredCrate.rewards.map(reward => (
                    <div
                      key={reward.id}
                      className={`flex items-center gap-2 p-2 rounded-lg ${getRarityBg(reward.rarity)} border ${getRarityColor(reward.rarity).replace('text-', 'border-').replace('text-', 'border-')}/20 transition-all duration-200 hover:scale-105`}
                    >
                      <span className="text-lg">{reward.image}</span>
                      <div className="min-w-0">
                        <p className="text-xs text-white truncate">{reward.name}</p>
                        <span className={`text-[10px] ${getRarityColor(reward.rarity)}`}>{reward.chance}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-heading font-bold text-white">All Crates</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {otherCrates.map(crate => (
              <Card
                key={crate.id}
                variant="default"
                hover
                className={`relative overflow-hidden group transition-all duration-300 ${getRarityBg(crate.rarity)}`}
              >
                <div className={`absolute inset-0 rounded-xl border-2 pointer-events-none transition-all duration-500 ${getRarityColor(crate.rarity).replace('text-', 'border-')} opacity-0 group-hover:opacity-100`} />
                <div className={`absolute -inset-1 rounded-2xl border-2 border-dashed ${getRarityColor(crate.rarity).replace('text-', 'border-')} opacity-0 group-hover:opacity-30 animate-pulse pointer-events-none`} />

                <div className="text-center mb-4">
                  <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300 inline-block">{crate.image}</div>
                  <h3 className="text-lg font-heading font-bold text-white">{crate.name}</h3>
                  <RarityBadge rarity={crate.rarity} />
                </div>

                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-green-400">${crate.price.toFixed(2)}</span>
                </div>

                <div className="space-y-2 mb-4">
                  {crate.rewards.slice(0, 4).map(reward => (
                    <div key={reward.id} className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-0.5">
                          <span className={`${getRarityColor(reward.rarity)} truncate`}>
                            {reward.image} {reward.name}
                          </span>
                          <span className="text-gray-500 ml-2">{reward.chance}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              reward.rarity === 'common' ? 'bg-gray-500' :
                              reward.rarity === 'rare' ? 'bg-blue-500' :
                              reward.rarity === 'epic' ? 'bg-purple-500' :
                              reward.rarity === 'legendary' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${reward.chance * 2}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {crate.rewards.length > 4 && (
                    <p className="text-xs text-gray-600 text-center pt-1">+{crate.rewards.length - 4} more rewards</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="md"
                    className="flex-1"
                    icon={openingCrate === crate.id ? undefined : <Key className="w-4 h-4" />}
                    onClick={() => handleOpen(crate.id)}
                    loading={openingCrate === crate.id}
                  >
                    {openingCrate === crate.id ? 'Opening...' : 'Open'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    icon={<ShoppingCart className="w-4 h-4" />}
                    onClick={() => handleAddCrate(crate)}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <Gift className="w-6 h-6 text-gold-400" />
            <h2 className="text-2xl font-heading font-bold text-white">Bundle Deals</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {KEY_BUNDLES.slice(1, 4).map(bundle => (
              <Card key={bundle.id} variant="gradient" hover className="relative overflow-hidden border-gold-500/20">
                {bundle.discount >= 40 && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge variant="danger">-{bundle.discount}%</Badge>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-4xl mb-2">{bundle.image}</div>
                  <h3 className="text-lg font-heading font-bold text-white">{bundle.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{bundle.keys} Keys</p>
                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-gold-400">${bundle.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 line-through">
                      ${(bundle.price / (1 - bundle.discount / 100)).toFixed(2)}
                    </span>
                  </div>
                  <Button variant="gold" size="sm" fullWidth icon={<ShoppingCart className="w-4 h-4" />} onClick={() => handleAddBundle(bundle)}>
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
