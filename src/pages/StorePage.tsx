import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { Search, ShoppingCart, X, Plus, Minus, Trash2, Star, Shield, Crown, Zap, Package, Key, Gift, ChevronRight, Check, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SearchBar } from '@/components/ui/SearchBar'
import { Modal } from '@/components/ui/Modal'
import { PRODUCTS, CATEGORY_ICONS } from '@/lib/mock-data'
import type { Product, CartItem, ProductCategory } from '@/types'

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

const categoryGradient: Record<ProductCategory, string> = {
  ranks: 'from-purple-600/20 to-purple-900/20 border-purple-500/20',
  keys: 'from-amber-600/20 to-amber-900/20 border-amber-500/20',
  crates: 'from-blue-600/20 to-blue-900/20 border-blue-500/20',
  coins: 'from-yellow-600/20 to-yellow-900/20 border-yellow-500/20',
  bundles: 'from-green-600/20 to-green-900/20 border-green-500/20',
  cosmetics: 'from-pink-600/20 to-pink-900/20 border-pink-500/20',
  boosters: 'from-cyan-600/20 to-cyan-900/20 border-cyan-500/20',
  tokens: 'from-stone-600/20 to-stone-900/20 border-stone-500/20',
}

const categoryIconMap: Record<ProductCategory, typeof Star> = {
  ranks: Crown,
  keys: Key,
  crates: Package,
  coins: Star,
  bundles: Gift,
  cosmetics: Zap,
  boosters: Zap,
  tokens: Star,
}

export function StorePage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { requireAuth, AuthModal } = useRequireAuth()

  const filtered = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (product: Product) => {
    requireAuth(() => {
      setCart(prev => {
        const existing = prev.find(item => item.product.id === product.id)
        if (existing) {
          return prev.map(item =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        }
        return [...prev, { product, quantity: 1 }]
      })
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id !== productId) return item
      const newQty = item.quantity + delta
      if (newQty <= 0) return null
      return { ...item, quantity: newQty }
    }).filter(Boolean) as CartItem[])
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.salePrice ?? item.product.price) * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const formatPrice = (p: Product) => `$${(p.salePrice ?? p.price).toFixed(2)}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white">Store</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1 truncate">Premium perks, keys, crates and more</p>
          </div>
          <Button variant="primary" size="md" icon={<ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />} onClick={() => setCartOpen(true)} className="relative shrink-0 sm:size-lg">
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-500 text-stone-950 text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat.value
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                  : 'bg-stone-800/50 text-gray-400 hover:bg-stone-700/50 hover:text-white border border-stone-700/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {filtered.map(product => (
            <motion.div
              key={product.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
            <Card
              variant="default"
              hover
              tilt
              glowOnHover
              className={`group relative overflow-hidden border ${categoryGradient[product.category]} transition-all duration-300`}
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
              <div className="text-4xl mb-4">{product.image}</div>
              <h3 className="text-lg font-heading font-bold text-white mb-1">{product.name}</h3>
              <Badge variant="default" size="sm" className="mb-3">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Badge>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-baseline gap-2">
                  {product.salePrice ? (
                    <>
                      <span className="text-lg font-bold text-green-400">${product.salePrice.toFixed(2)}</span>
                      <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-green-400">${product.price.toFixed(2)}</span>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  icon={<Plus className="w-4 h-4" />}
                  onClick={e => { e.stopPropagation(); addToCart(product) }}
                >
                  Add
                </Button>
              </div>
            </Card>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-heading font-bold text-gray-400 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </div>
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
                      <span className="text-2xl font-bold text-green-400">${selectedProduct.salePrice.toFixed(2)}</span>
                      <span className="text-lg text-gray-500 line-through">${selectedProduct.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-green-400">${selectedProduct.price.toFixed(2)}</span>
                  )}
                </div>
                <Button variant="primary" size="lg" fullWidth onClick={() => { addToCart(selectedProduct); setSelectedProduct(null) }}>
                  Add to Cart — {formatPrice(selectedProduct)}
                </Button>
              </div>
            </div>
            {selectedProduct.features.length > 0 && (
              <div>
                <h4 className="text-sm font-heading font-bold text-gray-300 mb-3 uppercase tracking-wider">Features</h4>
                <ul className="space-y-2">
                  {selectedProduct.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setCartOpen(false)}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-stone-950 border-l border-stone-800 shadow-2xl transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-green-400" />
              <h2 className="text-lg font-heading font-bold text-white">Cart ({cartCount})</h2>
            </div>
            <button onClick={() => setCartOpen(false)} className="p-1 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-12 h-12 mx-auto text-gray-600 mb-3" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.product.id} className="flex items-center gap-4 bg-stone-900/50 rounded-xl p-3 sm:p-4 border border-stone-800">
                  <div className="text-2xl">{item.product.image}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">{item.product.name}</h4>
                    <p className="text-sm text-green-400">${((item.product.salePrice ?? item.product.price) * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, -1)}
                      className="p-1 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
                    >
                      <Minus className="w-4 h-4 text-gray-400" />
                    </button>
                    <span className="w-8 text-center text-sm text-white font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, 1)}
                      className="p-1 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 hover:bg-red-900/30 rounded-md transition-colors ml-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-stone-800 p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total</span>
                <span className="text-xl font-bold text-green-400">${cartTotal.toFixed(2)}</span>
              </div>
               <Button variant="gold" size="lg" fullWidth icon={<ShoppingCart className="w-5 h-5" />} onClick={() => requireAuth(() => setCartOpen(false))}>
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
      {AuthModal}
    </div>
  )
}
