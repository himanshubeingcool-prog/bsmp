import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { ShoppingCart, X, Plus, Minus, Trash2, Tag, ArrowRight, CreditCard, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function CartDrawer() {
  const {
    items, isOpen, itemCount, subtotal,
    closeCart, removeItem, updateQuantity, clearCart,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      closeCart();
      navigate('/login');
      addToast('info', 'Please log in to complete your purchase');
      return;
    }
    addToast('success', 'Order placed successfully!');
    clearCart();
    closeCart();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-stone-950 border-l border-stone-800 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-heading font-bold text-white">
              Cart {itemCount > 0 && <span className="text-gold-400">({itemCount})</span>}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={() => { clearCart(); addToast('info', 'Cart cleared'); }}
                className="text-xs text-gray-500 hover:text-red-400 transition-colors px-2 py-1 cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              onClick={closeCart}
              className="p-1.5 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-20 h-20 rounded-2xl bg-stone-800/50 flex items-center justify-center mb-4">
                <ShoppingCart className="w-10 h-10 text-stone-600" />
              </div>
              <h3 className="text-lg font-heading font-bold text-gray-300 mb-1">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-xs">
                Looks like you haven't added anything yet. Browse the store for ranks, keys, crates, and more!
              </p>
              <Button variant="primary" onClick={() => { closeCart(); navigate('/store'); }}>
                Browse Store
              </Button>
            </div>
          ) : (
            items.map((item) => {
              const unitPrice = item.product.salePrice ?? item.product.price;
              const lineTotal = unitPrice * item.quantity;

              return (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 bg-stone-900/50 rounded-xl p-3 sm:p-4 border border-stone-800 hover:border-stone-700 transition-colors group"
                >
                  <div className="text-2xl shrink-0 w-10 h-10 flex items-center justify-center">
                    {item.product.image}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">{item.product.name}</h4>
                    <p className="text-xs text-gray-500 capitalize">{item.product.category}</p>
                    <p className="text-sm text-green-400 font-medium mt-0.5">
                      ${lineTotal.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        if (item.quantity <= 1) {
                          removeItem(item.product.id);
                        } else {
                          updateQuantity(item.product.id, item.quantity - 1);
                        }
                      }}
                      className="p-1 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                    <span className="w-8 text-center text-sm text-white font-medium tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-1 hover:bg-red-900/30 rounded-md transition-colors ml-1 cursor-pointer opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-stone-800 p-4 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 p-3 bg-stone-900/50 rounded-xl border border-stone-800">
              <Tag className="w-4 h-4 text-gray-500 shrink-0" />
              <input
                type="text"
                placeholder="Promo code"
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addToast('info', 'Promo code feature coming soon');
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <button
                onClick={() => addToast('info', 'Promo code feature coming soon')}
                className="text-xs text-green-400 hover:text-green-300 font-medium transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tax</span>
                <span className="text-gray-500">Calculated at checkout</span>
              </div>
              <div className="h-px bg-stone-800 my-2" />
              <div className="flex justify-between">
                <span className="text-base font-heading font-bold text-white">Total</span>
                <span className="text-xl font-bold text-green-400">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="gold"
                size="lg"
                fullWidth
                icon={<CreditCard className="w-5 h-5" />}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5" />
                Secure checkout
              </div>
            </div>
          </div>
        )}

        {items.length > 0 && (
          <div className="text-center pb-4">
            <button
              onClick={closeCart}
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
