"use client"

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import type { AppData, CafeMenuItem, RetailProduct, SiteAsset, WholesaleProduct, HomeFeaturedCoffee } from "@/lib/types"
import { initialData } from "@/lib/initial-data"
import { fetchSiteData, saveSiteData } from "@/lib/api"

type MenuContextValue = {
  data: AppData
  setData: React.Dispatch<React.SetStateAction<AppData>>
  resetToDefaults: () => void
  addCafeItem: (item: Omit<CafeMenuItem, "id">) => void
  updateCafeItem: (id: string, patch: Partial<CafeMenuItem>) => void
  removeCafeItem: (id: string) => void
  addWholesaleProduct: (product: WholesaleProduct) => void
  updateWholesaleProduct: (id: string, patch: Partial<WholesaleProduct>) => void
  removeWholesaleProduct: (id: string) => void
  addRetailProduct: (product: RetailProduct) => void
  updateRetailProduct: (id: string, patch: Partial<RetailProduct>) => void
  removeRetailProduct: (id: string) => void
  addSiteAsset: (asset: SiteAsset) => void
  updateSiteAsset: (id: string, patch: Partial<SiteAsset>) => void
  removeSiteAsset: (id: string) => void
  addHomeFeaturedCoffee: (coffee: HomeFeaturedCoffee) => void
  updateHomeFeaturedCoffee: (id: string, patch: Partial<HomeFeaturedCoffee>) => void
  removeHomeFeaturedCoffee: (id: string) => void
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined)

function normalizeAppData(raw: unknown): AppData {
  if (!raw || typeof raw !== "object") return initialData
  const obj = raw as Partial<AppData>

  return {
    ...initialData,
    ...obj,
    cafeCategories: Array.isArray(obj.cafeCategories) ? obj.cafeCategories : initialData.cafeCategories,
    cafeItems: Array.isArray(obj.cafeItems) ? obj.cafeItems : initialData.cafeItems,
    wholesaleProducts: Array.isArray(obj.wholesaleProducts) ? obj.wholesaleProducts : initialData.wholesaleProducts,
    retailProducts: Array.isArray(obj.retailProducts) ? obj.retailProducts : initialData.retailProducts,
    siteAssets: Array.isArray(obj.siteAssets) ? obj.siteAssets : initialData.siteAssets,
    homeFeaturedCoffees: Array.isArray(obj.homeFeaturedCoffees)
      ? obj.homeFeaturedCoffees
      : initialData.homeFeaturedCoffees,
  }
}

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(initialData)
  const isInitialized = useRef(false)

  // Load from Google Sheets on mount
  useEffect(() => {
    async function loadData() {
      const remoteData = await fetchSiteData()
      if (remoteData) {
        const normalized = normalizeAppData(remoteData)
        setData(normalized)
      }
      isInitialized.current = true
    }
    loadData()
  }, [])

  // Save to Google Sheets on change (debounced 2s)
  useEffect(() => {
    if (!isInitialized.current) return

    const timer = setTimeout(() => {
      saveSiteData(data)
    }, 2000)

    return () => clearTimeout(timer)
  }, [data])

  const resetToDefaults = () => {
    setData(initialData)
    // Will trigger save effect automatically
  }

  const addCafeItem: MenuContextValue["addCafeItem"] = (item) => {
    setData((current) => {
      const nextId = `${item.categoryId}-${Date.now()}`
      return { ...current, cafeItems: [...current.cafeItems, { ...item, id: nextId }] }
    })
  }

  const updateCafeItem: MenuContextValue["updateCafeItem"] = (id, patch) => {
    setData((current) => ({
      ...current,
      cafeItems: current.cafeItems.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    }))
  }

  const removeCafeItem: MenuContextValue["removeCafeItem"] = (id) => {
    setData((current) => ({
      ...current,
      cafeItems: current.cafeItems.filter((it) => it.id !== id),
    }))
  }

  const addWholesaleProduct: MenuContextValue["addWholesaleProduct"] = (product) => {
    setData((current) => ({
      ...current,
      wholesaleProducts: [...current.wholesaleProducts, product],
    }))
  }

  const updateWholesaleProduct: MenuContextValue["updateWholesaleProduct"] = (id, patch) => {
    setData((current) => ({
      ...current,
      wholesaleProducts: current.wholesaleProducts.map((p) =>
        p.id === id ? { ...p, ...patch } : p
      ),
    }))
  }

  const removeWholesaleProduct: MenuContextValue["removeWholesaleProduct"] = (id) => {
    setData((current) => ({
      ...current,
      wholesaleProducts: current.wholesaleProducts.filter((p) => p.id !== id),
    }))
  }

  const addRetailProduct: MenuContextValue["addRetailProduct"] = (product) => {
    setData((current) => ({
      ...current,
      retailProducts: [...current.retailProducts, product],
    }))
  }

  const updateRetailProduct: MenuContextValue["updateRetailProduct"] = (id, patch) => {
    setData((current) => ({
      ...current,
      retailProducts: current.retailProducts.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }))
  }

  const removeRetailProduct: MenuContextValue["removeRetailProduct"] = (id) => {
    setData((current) => ({
      ...current,
      retailProducts: current.retailProducts.filter((p) => p.id !== id),
    }))
  }

  const addSiteAsset: MenuContextValue["addSiteAsset"] = (asset) => {
    setData((current) => ({
      ...current,
      siteAssets: [...current.siteAssets, asset],
    }))
  }

  const updateSiteAsset: MenuContextValue["updateSiteAsset"] = (id, patch) => {
    setData((current) => ({
      ...current,
      siteAssets: current.siteAssets.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    }))
  }

  const removeSiteAsset: MenuContextValue["removeSiteAsset"] = (id) => {
    setData((current) => ({
      ...current,
      siteAssets: current.siteAssets.filter((a) => a.id !== id),
    }))
  }

  const addHomeFeaturedCoffee: MenuContextValue["addHomeFeaturedCoffee"] = (coffee) => {
    setData((current) => ({
      ...current,
      homeFeaturedCoffees: [...current.homeFeaturedCoffees, coffee],
    }))
  }

  const updateHomeFeaturedCoffee: MenuContextValue["updateHomeFeaturedCoffee"] = (id, patch) => {
    setData((current) => ({
      ...current,
      homeFeaturedCoffees: current.homeFeaturedCoffees.map((c) =>
        c.id === id ? { ...c, ...patch } : c
      ),
    }))
  }

  const removeHomeFeaturedCoffee: MenuContextValue["removeHomeFeaturedCoffee"] = (id) => {
    setData((current) => ({
      ...current,
      homeFeaturedCoffees: current.homeFeaturedCoffees.filter((c) => c.id !== id),
    }))
  }

  const value = useMemo<MenuContextValue>(
    () => ({
      data,
      setData,
      resetToDefaults,
      addCafeItem,
      updateCafeItem,
      removeCafeItem,
      addWholesaleProduct,
      updateWholesaleProduct,
      removeWholesaleProduct,
      addRetailProduct,
      updateRetailProduct,
      removeRetailProduct,
      addSiteAsset,
      updateSiteAsset,
      removeSiteAsset,
      addHomeFeaturedCoffee,
      updateHomeFeaturedCoffee,
      removeHomeFeaturedCoffee,
    }),
    [data]
  )

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export function useMenu() {
  const ctx = useContext(MenuContext)
  if (!ctx) throw new Error("useMenu must be used within MenuProvider")
  return ctx
}
