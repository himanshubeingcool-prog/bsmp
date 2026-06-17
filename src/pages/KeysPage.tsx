import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { ShoppingCart, Package, Key } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { KEY_BUNDLES, CRATES } from '@/lib/mock-data'
import { getRarityColor, getRarityBg } from '@/lib/utils'
import type { ProductCategory } from '@/types'

export function KeysPage() {
  const [selectedCrate, setSelectedCrate] = useState<typeof CRATES[number] | null>(null)
  const { addItem } = useCart()
  const { addToast } = useToast()

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-3">
            Keys & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gold-400">Crates</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Unlock exclusive rewards with keys and crates. Better keys mean better loot.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-6 h-6 text-gold-400" />
            <h2 className="text-2xl font-heading font-bold text-white">Key Bundles</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {KEY_BUNDLES.map(bundle => (
              <Card
                key={bundle.id}
                variant="default"
                hover
                className="relative overflow-hidden group border-amber-500/10 hover:border-amber-500/30 transition-all duration-300"
              >
                {bundle.discount >= 50 && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge variant="danger">-{bundle.discount}%</Badge>
                  </div>
                )}
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{bundle.image}</div>
                  <h3 className="text-lg font-heading font-bold text-white">{bundle.name}</h3>
                  <p className="text-sm text-gray-400">{bundle.keys} Keys</p>
                </div>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-green-400">${bundle.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-500 line-through">
                    ${(bundle.price / (1 - bundle.discount / 100)).toFixed(2)}
                  </span>
                </div>
                <div className="text-center mb-4">
                  <span className="text-xs text-gray-500">${(bundle.price / bundle.keys).toFixed(2)} per key</span>
                </div>
                <Button variant="primary" size="sm" fullWidth icon={<ShoppingCart className="w-4 h-4" />} onClick={() => handleAddBundle(bundle)}>
                  Add to Cart
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-heading font-bold text-white">Crate Previews</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {CRATES.map(crate => (
              <Card
                key={crate.id}
                variant="default"
                hover
                className={`relative overflow-hidden group transition-all duration-300 ${getRarityBg(crate.rarity)}`}
                onClick={() => setSelectedCrate(crate)}
              >
                <div className={`absolute inset-0 rounded-xl border-2 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${getRarityColor(crate.rarity)}`} />

                <div className="text-center mb-4">
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{crate.image}</div>
                  <h3 className="text-lg font-heading font-bold text-white">{crate.name}</h3>
                  <Badge
                    variant={
                      crate.rarity === 'common' ? 'default' :
                      crate.rarity === 'rare' ? 'info' :
                      crate.rarity === 'epic' ? 'premium' :
                      crate.rarity === 'legendary' ? 'gold' : 'danger'
                    }
                    size="sm"
                    className="mt-2"
                  >
                    {crate.rarity.charAt(0).toUpperCase() + crate.rarity.slice(1)}
                  </Badge>
                </div>

                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-green-400">${crate.price.toFixed(2)}</span>
                </div>

                <div className="space-y-1.5 mb-4">
                  {crate.rewards.slice(0, 3).map(reward => (
                    <div key={reward.id} className="flex items-center justify-between text-xs">
                      <span className={`${getRarityColor(reward.rarity)} truncate`}>
                        {reward.image} {reward.name}
                      </span>
                      <span className="text-gray-500 ml-2">{reward.chance}%</span>
                    </div>
                  ))}
                  {crate.rewards.length > 3 && (
                    <p className="text-xs text-gray-600 text-center pt-1">+{crate.rewards.length - 3} more rewards</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="primary" size="sm" fullWidth icon={<Key className="w-4 h-4" />} onClick={() => { addToast('info', 'Opening crates requires an owned crate key'); }}>
                    Open
                  </Button>
                  <Button variant="secondary" size="sm" icon={<ShoppingCart className="w-4 h-4" />} className="!px-3" onClick={() => handleAddCrate(crate)} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
