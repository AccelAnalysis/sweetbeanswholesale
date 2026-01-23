"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  size?: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, size?: string) => void
  updateQuantity: (id: string, quantity: number, size?: string) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const isInitialized = React.useRef(false)

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("wholesale-cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setTimeout(() => setItems(parsedCart), 0)
      } catch (e) {
        console.error("Failed to parse cart", e)
      }
    }
    isInitialized.current = true
  }, [])

  // Save cart to local storage whenever it changes
  useEffect(() => {
    if (isInitialized.current) {
      localStorage.setItem("wholesale-cart", JSON.stringify(items))
    }
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      // Create a unique key for the item based on ID and size
      const existingItemIndex = currentItems.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      )

      if (existingItemIndex > -1) {
        const newItems = [...currentItems]
        newItems[existingItemIndex].quantity += newItem.quantity
        return newItems
      }
      return [...currentItems, newItem]
    })
    setIsCartOpen(true)
  }

  const removeItem = (itemId: string, size?: string) => {
    setItems((currentItems) => 
      currentItems.filter((item) => !(item.id === itemId && item.size === size))
    )
  }

  const updateQuantity = (itemId: string, quantity: number, size?: string) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        (item.id === itemId && item.size === size)
          ? { ...item, quantity: Math.max(0, quantity) } 
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
