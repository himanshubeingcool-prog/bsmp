import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { StaggerGroup, StaggerItem } from '@/components/ui/Stagger'
import { ShoppingCart, Plus, Package, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SearchBar } from '@/components/ui/SearchBar'
import { Modal } from '@/components/ui/Modal'
import { AmbientBackground } from '@/components/ui/AmbientBackground'
import { PRODUCTS } from '@/lib/mock-data'
import type { Product, ProductCategory } from '@/types'

const CATEGORIES: { label: string; value: ProductCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Ranks', value: 'ranks' },
  { label: 'Keys', value: 'keys' },
  { label: 'Crates', value: 'crates' },
  { label: 'Coins', value: 'coins' },
  { label: 'Bundles', value: 'bundles' },
  { label: 'Cosmetics', value: 'cosmetics' },
  { label: 'Boosters', value: 'boosters' },
  { label: 'Tokens', value: 'tokens' },
]

const categoryBorder: Record<ProductCategory, string> = {
  ranks: 'border-cyan-500/20',
  keys: 'border-cyan-500/20',
  crates: 'border-cyan-500/20',
  coins: 'border-gold-500/20',
  bundles: 'border-cyan-500/20',
  cosmetics: 'border-cyan-500/20',
  boosters: 'border-gold-500/20',
  tokens: 'border-cyan-500/20',
}

export function StorePage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { addItem, itemCount, openCart, itemExists } = useCart()
  const { addToast } = useToast()

  const filtered = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (product: Product) => {
    addItem(product)
    addToast('success', `${product.name} added to cart`)
  }

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation()
    handleAddToCart(product)
  }

  const formatPrice = (p: Product) => `$${(p.salePrice ?? p.price).toFixed(2)}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 relative overflow-hidden">
      <AmbientBackground accent="mixed" voxels={9} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="flex items-start sm:items-center justify-between gap-3 mb-8 sm:mb-10">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400/70 font-medium mb-1">Shop</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white tracking-tight">Store</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1 truncate">Premium perks, keys, crates and more</p>
          </div>
          <Button variant="primary" size="md" icon={<ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />} onClick={openCart} className="relative shrink-0">
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                className="absolute -top-2 -right-2 bg-gold-500 text-stone-950 text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"
              >
                {itemCount > 99 ? '99+' : itemCount}
              </motion.span>
            )}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => {
            const active = activeCategory === cat.value
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer active:scale-95 ${
                  active
                    ? 'text-white'
                    : 'bg-stone-800/50 text-gray-400 hover:bg-stone-700/50 hover:text-white border border-stone-700/50'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="store-category-pill"
                    className="absolute inset-0 rounded-lg bg-cyan-600 shadow-lg shadow-cyan-600/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            )
          })}
        </div>

        <StaggerGroup
          key={activeCategory + search}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {filtered.map(product => (
            <StaggerItem key={product.id}
            >
            <Card
              variant="default"
              hover
              tilt
              glowOnHover
              className={`group relative overflow-hidden border ${categoryBorder[product.category]} transition-all duration-300`}
              onClick={() => setSelectedProduct(product)}
            >
              {product.discount && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant="danger">-{product.discount}%</Badge>
                </div>
              )}
              {product.popular && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="gold">Popular</Badge>
                </div>
              )}
              <span className="shine-layer rounded-[inherit]" />
              <div className="relative z-10 text-4xl mb-4 inline-block transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6">{product.image}</div>
              <h3 className="relative z-10 text-lg font-heading font-bold text-white mb-1 group-hover:text-cyan-50 transition-colors">{product.name}</h3>
              <Badge variant="default" size="sm" className="relative z-10 mb-3">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Badge>
              <p className="relative z-10 text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>
              <div className="relative z-10 flex items-center justify-between mt-auto">
                <div className="flex items-baseline gap-2">
                  {product.salePrice ? (
                    <>
                      <span className="text-lg font-bold text-cyan-400">${product.salePrice.toFixed(2)}</span>
                      <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-cyan-400">${product.price.toFixed(2)}</span>
                  )}
                </div>
                <Button
                  size="sm"
                  variant={itemExists(product.id) ? 'secondary' : 'primary'}
                  icon={<Plus className="w-4 h-4" />}
                  onClick={e => handleQuickAdd(e, product)}
                >
                  {itemExists(product.id) ? 'Add More' : 'Add'}
                </Button>
              </div>
            </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <Package className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-heading font-bold text-gray-400 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </motion.div>
        )}
      </div>

      <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} title={selectedProduct?.name} size="lg">
        {selectedProduct && (
          <div>
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="text-6xl flex-shrink-0">{selectedProduct.image}</div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default">{selectedProduct.category}</Badge>
                  {selectedProduct.popular && <Badge variant="gold">Popular</Badge>}
                  {selectedProduct.discount && <Badge variant="danger">-{selectedProduct.discount}%</Badge>}
                </div>
                <p className="text-gray-400 mb-4">{selectedProduct.description}</p>
                <div className="flex items-baseline gap-2 mb-4">
                  {selectedProduct.salePrice ? (
                    <>
                      <span className="text-2xl font-bold text-cyan-400">${selectedProduct.salePrice.toFixed(2)}</span>
                      <span className="text-lg text-gray-500 line-through">${selectedProduct.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-cyan-400">${selectedProduct.price.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null) }}
                  >
                    Add to Cart — {formatPrice(selectedProduct)}
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    icon={<ShoppingCart className="w-5 h-5" />}
                    onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); openCart() }}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
            {selectedProduct.features.length > 0 && (
              <div>
                <h4 className="text-sm font-heading font-bold text-gray-300 mb-3 uppercase tracking-wider">Features</h4>
                <ul className="space-y-2">
                  {selectedProduct.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
