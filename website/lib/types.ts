export type CafeMenuItem = {
  id: string
  name: string
  price: string
  description: string
  note?: string
  highlight?: boolean
  categoryId: string
  page?: string
  subpage?: string
  linkUrl?: string
  image?: string
  videoUrl?: string
}

export type CafeCategory = {
  id: string
  title: string
  icon?: string // We'll store icon name as string for serialization
}

export type WholesaleProduct = {
  id: string
  name: string
  origin: string
  roast: "Light" | "Medium" | "Dark" | string
  notes: string
  acidity: string
  use: string
  sizes: string
  price: number
  image: string
  page?: string
  subpage?: string
  linkUrl?: string
  videoUrl?: string
}

export type RetailProduct = {
  id: string
  name: string
  roast: "Light" | "Medium" | "Dark" | string
  price: number
  image: string
  page?: string
  subpage?: string
  linkUrl?: string
  videoUrl?: string
}

export type SiteAsset = {
  id: string
  page: string
  location: string
  type: "image" | "video" | "iframe" | string
  url: string
  alt?: string
  linkUrl?: string
}

export type HomeFeaturedCoffee = {
  id: string
  name: string
  description: string
  roast: "Light" | "Medium" | "Dark" | "Decaf" | string
  image: string
  fallbackImage?: string
}

export type AppData = {
  cafeCategories: CafeCategory[]
  cafeItems: CafeMenuItem[]
  wholesaleProducts: WholesaleProduct[]
  retailProducts: RetailProduct[]
  siteAssets: SiteAsset[]
  homeFeaturedCoffees: HomeFeaturedCoffee[]
}
