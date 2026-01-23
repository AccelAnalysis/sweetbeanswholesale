"use client"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CartDrawer() {
  const { items, removeItem, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart()

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-4 border-b border-coffee-light/20">
          <h2 className="text-lg font-bold text-coffee-dark flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Order
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-coffee-medium">
              <ShoppingBag className="h-12 w-12 opacity-20" />
              <p>Your cart is empty.</p>
              <Button variant="link" onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 p-3 bg-cream rounded-lg border border-coffee-light/20">
                <div className="relative h-20 w-20 bg-white rounded-md overflow-hidden shrink-0 border border-coffee-light/10">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-coffee-light/20">
                      <ShoppingBag className="h-8 w-8 text-coffee-medium/50" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-coffee-dark truncate">{item.name}</h3>
                    <p className="text-sm text-coffee-medium">{item.size}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-coffee-light/30 rounded-md bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                        className="p-1 hover:bg-coffee-light/10 text-coffee-dark"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-sm font-medium min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                        className="p-1 hover:bg-coffee-light/10 text-coffee-dark"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-coffee-dark">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button 
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-coffee-light/20 bg-cream/30 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-coffee-medium">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-coffee-medium">
                <span>Shipping</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-coffee-dark pt-2 border-t border-coffee-light/10">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full gap-2" size="lg" asChild>
              <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                Proceed to Quote Request
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
