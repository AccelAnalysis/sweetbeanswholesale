"use client"

import { useMemo, useState, useEffect } from "react"
import { useMenu } from "@/components/menu-provider"
import type { CafeMenuItem, RetailProduct, SiteAsset, WholesaleProduct, HomeFeaturedCoffee } from "@/lib/types"

const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "sweetbeans"
const AUTH_STORAGE_KEY = "sb-admin-auth-v1"

type SectionKey = "cafe" | "wholesale" | "retail" | "site" | "home"

type EditableRow = {
  section: SectionKey
  id: string
  page?: string
  subpage?: string
  linkUrl?: string
  categoryId?: string
  name: string
  description?: string
  note?: string
  price: string
  roast?: string
  origin?: string
  notes?: string
  acidity?: string
  use?: string
  sizes?: string
  image?: string
  videoUrl?: string
  highlight?: string
  location?: string
  type?: string
  url?: string
  alt?: string
}

function downloadTextFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function escapeCsvCell(value: string) {
  const needsQuotes = /[\n\r,\"]/g.test(value)
  const escaped = value.replace(/\"/g, '""')
  return needsQuotes ? `"${escaped}"` : escaped
}

function toStringSafe(v: unknown) {
  if (v === null || v === undefined) return ""
  return String(v)
}

export default function AdminPage() {
  const {
    data,
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
    resetToDefaults,
  } = useMenu()

  const [activeSection, setActiveSection] = useState<SectionKey>("cafe")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 0)
    return () => window.clearTimeout(t)
  }, [])

  const [isAuthed, setIsAuthed] = useState(() => {
    if (typeof window === "undefined") return false
    return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true"
  })

  const rows = useMemo<EditableRow[]>(() => {
    const cafeRows: EditableRow[] = data.cafeItems.map((it) => ({
      section: "cafe",
      id: it.id,
      page: it.page,
      subpage: it.subpage,
      linkUrl: it.linkUrl,
      categoryId: it.categoryId,
      name: it.name,
      description: it.description,
      note: it.note,
      price: it.price,
      image: it.image,
      videoUrl: it.videoUrl,
      highlight: it.highlight ? "true" : "false",
    }))

    const wholesaleRows: EditableRow[] = data.wholesaleProducts.map((p) => ({
      section: "wholesale",
      id: p.id,
      page: p.page,
      subpage: p.subpage,
      linkUrl: p.linkUrl,
      name: p.name,
      price: String(p.price),
      roast: p.roast,
      origin: p.origin,
      notes: p.notes,
      acidity: p.acidity,
      use: p.use,
      sizes: p.sizes,
      image: p.image,
      videoUrl: p.videoUrl,
    }))

    const retailRows: EditableRow[] = data.retailProducts.map((p) => ({
      section: "retail",
      id: p.id,
      page: p.page,
      subpage: p.subpage,
      linkUrl: p.linkUrl,
      name: p.name,
      price: String(p.price),
      roast: p.roast,
      image: p.image,
      videoUrl: p.videoUrl,
    }))

    const siteRows: EditableRow[] = data.siteAssets.map((a) => ({
      section: "site",
      id: a.id,
      page: a.page,
      location: a.location,
      type: a.type,
      url: a.url,
      alt: a.alt,
      linkUrl: a.linkUrl,
      name: a.alt || a.id,
      price: "",
    }))

    const homeRows: EditableRow[] = data.homeFeaturedCoffees.map((c) => ({
      section: "home",
      id: c.id,
      name: c.name,
      description: c.description,
      roast: c.roast,
      image: c.image,
      price: "",
    }))

    if (activeSection === "cafe") return cafeRows
    if (activeSection === "wholesale") return wholesaleRows
    if (activeSection === "retail") return retailRows
    if (activeSection === "site") return siteRows
    return homeRows
  }, [activeSection, data.cafeItems, data.retailProducts, data.siteAssets, data.wholesaleProducts, data.homeFeaturedCoffees])

  const columns = useMemo(() => {
    if (activeSection === "home") {
      return [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
        { key: "roast", label: "Roast" },
        { key: "image", label: "Image" },
      ] as const
    }

    if (activeSection === "cafe") {
      return [
        { key: "id", label: "ID" },
        { key: "page", label: "Page" },
        { key: "subpage", label: "Subpage" },
        { key: "categoryId", label: "Category" },
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
        { key: "note", label: "Note" },
        { key: "price", label: "Price" },
        { key: "linkUrl", label: "Link" },
        { key: "image", label: "Image" },
        { key: "videoUrl", label: "Video" },
        { key: "highlight", label: "Highlight" },
      ] as const
    }

    if (activeSection === "wholesale") {
      return [
        { key: "id", label: "ID" },
        { key: "page", label: "Page" },
        { key: "subpage", label: "Subpage" },
        { key: "name", label: "Name" },
        { key: "origin", label: "Origin" },
        { key: "roast", label: "Roast" },
        { key: "notes", label: "Tasting Notes" },
        { key: "acidity", label: "Acidity" },
        { key: "use", label: "Best For" },
        { key: "sizes", label: "Sizes" },
        { key: "price", label: "Price" },
        { key: "linkUrl", label: "Link" },
        { key: "image", label: "Image" },
        { key: "videoUrl", label: "Video" },
      ] as const
    }

    if (activeSection === "site") {
      return [
        { key: "id", label: "ID" },
        { key: "page", label: "Page" },
        { key: "location", label: "Location" },
        { key: "type", label: "Type" },
        { key: "url", label: "URL" },
        { key: "alt", label: "Alt" },
        { key: "linkUrl", label: "Link" },
      ] as const
    }

    return [
      { key: "id", label: "ID" },
      { key: "page", label: "Page" },
      { key: "subpage", label: "Subpage" },
      { key: "name", label: "Name" },
      { key: "roast", label: "Roast" },
      { key: "price", label: "Price" },
      { key: "linkUrl", label: "Link" },
      { key: "image", label: "Image" },
      { key: "videoUrl", label: "Video" },
    ] as const
  }, [activeSection])

  const login = () => {
    setError(null)
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthed(true)
      window.localStorage.setItem(AUTH_STORAGE_KEY, "true")
      setPassword("")
      return
    }
    setError("Invalid credentials")
  }

  const logout = () => {
    setIsAuthed(false)
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const onCellChange = (row: EditableRow, key: string, value: string) => {
    if (row.section === "cafe") {
      const patch: Partial<CafeMenuItem> = {}
      if (key === "page") patch.page = value
      if (key === "subpage") patch.subpage = value
      if (key === "linkUrl") patch.linkUrl = value
      if (key === "categoryId") patch.categoryId = value
      if (key === "name") patch.name = value
      if (key === "description") patch.description = value
      if (key === "note") patch.note = value
      if (key === "price") patch.price = value
      if (key === "image") patch.image = value
      if (key === "videoUrl") patch.videoUrl = value
      if (key === "highlight") patch.highlight = value === "true"
      updateCafeItem(row.id, patch)
      return
    }

    if (row.section === "wholesale") {
      const patch: Partial<WholesaleProduct> = {}
      if (key === "page") patch.page = value
      if (key === "subpage") patch.subpage = value
      if (key === "linkUrl") patch.linkUrl = value
      if (key === "name") patch.name = value
      if (key === "origin") patch.origin = value
      if (key === "roast") patch.roast = value
      if (key === "notes") patch.notes = value
      if (key === "acidity") patch.acidity = value
      if (key === "use") patch.use = value
      if (key === "sizes") patch.sizes = value
      if (key === "image") patch.image = value
      if (key === "videoUrl") patch.videoUrl = value
      if (key === "price") patch.price = Number(value || 0)
      updateWholesaleProduct(row.id, patch)
      return
    }

    if (row.section === "site") {
      const patch: Partial<SiteAsset> = {}
      if (key === "page") patch.page = value
      if (key === "location") patch.location = value
      if (key === "type") patch.type = value
      if (key === "url") patch.url = value
      if (key === "alt") patch.alt = value
      if (key === "linkUrl") patch.linkUrl = value
      updateSiteAsset(row.id, patch)
      return
    }

    if (row.section === "home") {
      const patch: Partial<HomeFeaturedCoffee> = {}
      if (key === "name") patch.name = value
      if (key === "description") patch.description = value
      if (key === "roast") patch.roast = value
      if (key === "image") patch.image = value
      updateHomeFeaturedCoffee(row.id, patch)
      return
    }

    const patch: Partial<RetailProduct> = {}
    if (key === "page") patch.page = value
    if (key === "subpage") patch.subpage = value
    if (key === "linkUrl") patch.linkUrl = value
    if (key === "name") patch.name = value
    if (key === "roast") patch.roast = value
    if (key === "image") patch.image = value
    if (key === "videoUrl") patch.videoUrl = value
    if (key === "price") patch.price = Number(value || 0)
    updateRetailProduct(row.id, patch)
  }

  const addRow = () => {
    if (activeSection === "cafe") {
      const defaultCategory = data.cafeCategories[0]?.id || "coffee"
      addCafeItem({
        page: "cafe",
        subpage: "menu",
        categoryId: defaultCategory,
        name: "New Item",
        description: "",
        note: "",
        price: "0.00",
        linkUrl: "",
        image: "",
        videoUrl: "",
        highlight: false,
      })
      return
    }

    if (activeSection === "wholesale") {
      const nextId = `NEW-${Date.now()}`
      addWholesaleProduct({
        id: nextId,
        page: "wholesale",
        subpage: "catalog",
        name: "New Wholesale Product",
        origin: "",
        roast: "Medium",
        notes: "",
        acidity: "",
        use: "",
        sizes: "",
        price: 0,
        image: "",
        linkUrl: "",
        videoUrl: "",
      })
      return
    }

    if (activeSection === "site") {
      const nextId = `NEW-${Date.now()}`
      addSiteAsset({
        id: nextId,
        page: "home",
        location: "",
        type: "image",
        url: "",
        alt: "",
        linkUrl: "",
      })
      return
    }

    if (activeSection === "home") {
      const nextId = `NEW-${Date.now()}`
      addHomeFeaturedCoffee({
        id: nextId,
        name: "New Coffee",
        description: "",
        roast: "Medium",
        image: "",
        fallbackImage: "",
      })
      return
    }

    if (activeSection === "retail") {
      const nextId = `NEW-${Date.now()}`
      addRetailProduct({
        id: nextId,
        page: "shop",
        subpage: "retail",
        name: "New Retail Product",
        roast: "Medium",
        price: 0,
        image: "",
        linkUrl: "",
        videoUrl: "",
      })
      return
    }
  }

  const removeRow = (row: EditableRow) => {
    if (row.section === "cafe") return removeCafeItem(row.id)
    if (row.section === "wholesale") return removeWholesaleProduct(row.id)
    if (row.section === "site") return removeSiteAsset(row.id)
    if (row.section === "home") return removeHomeFeaturedCoffee(row.id)
    return removeRetailProduct(row.id)
  }

  const downloadCsv = () => {
    const keys = columns.map((c) => c.key)
    const header = keys.map((k) => escapeCsvCell(String(k))).join(",")

    const lines = rows.map((row) => {
      return keys
        .map((k) => escapeCsvCell(toStringSafe((row as unknown as Record<string, unknown>)[k])))
        .join(",")
    })

    const csv = [header, ...lines].join("\n")
    downloadTextFile(`sweetbeans-${activeSection}-menu.csv`, csv, "text/csv;charset=utf-8")
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md bg-white border border-coffee-light/20 rounded-2xl shadow-sm p-8">
          <div>Loading...</div>
        </div>
      </div>
    )
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md bg-white border border-coffee-light/20 rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-coffee-dark mb-2">Admin Login</h1>
          <p className="text-coffee-medium mb-6">
            Enter your admin credentials to manage menu pricing and items.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-coffee-dark mb-1">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-coffee-light/30 px-3 py-2"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-coffee-dark mb-1">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-coffee-light/30 px-3 py-2"
                type="password"
                autoComplete="current-password"
                onKeyDown={(e) => {
                  if (e.key === "Enter") login()
                }}
              />
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <button
              onClick={login}
              className="w-full rounded-lg bg-brand-purple text-white font-semibold py-2 hover:bg-brand-purple-light"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-coffee-dark">Admin Menu Manager</h1>
            <p className="text-coffee-medium">
              Edit items inline. Changes are saved in this browser.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={downloadCsv}
              className="rounded-lg border border-coffee-light/30 bg-white px-4 py-2 text-sm font-semibold text-coffee-dark hover:bg-coffee-light/10"
            >
              Download Table (CSV)
            </button>
            <button
              onClick={addRow}
              className="rounded-lg bg-brand-purple px-4 py-2 text-sm font-semibold text-white hover:bg-brand-purple-light"
            >
              Add Row
            </button>
            <button
              onClick={resetToDefaults}
              className="rounded-lg border border-coffee-light/30 bg-white px-4 py-2 text-sm font-semibold text-coffee-dark hover:bg-coffee-light/10"
            >
              Reset to Defaults
            </button>
            <button
              onClick={logout}
              className="rounded-lg border border-coffee-light/30 bg-white px-4 py-2 text-sm font-semibold text-coffee-dark hover:bg-coffee-light/10"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white border border-coffee-light/20 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-coffee-light/20">
            <div className="flex gap-2">
              {([
                { key: "cafe", label: "Cafe Menu" },
                { key: "wholesale", label: "Wholesale" },
                { key: "retail", label: "Retail" },
                { key: "home", label: "Home Featured" },
                { key: "site", label: "Site Media" },
              ] as const).map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveSection(t.key)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeSection === t.key
                      ? "bg-brand-purple text-white"
                      : "bg-coffee-light/10 text-coffee-dark hover:bg-coffee-light/20"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="text-xs text-coffee-medium">
              Rows: {rows.length}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-coffee-light/10">
                <tr>
                  {columns.map((c) => (
                    <th
                      key={c.key}
                      className="text-left px-3 py-2 font-bold text-coffee-dark whitespace-nowrap"
                    >
                      {c.label}
                    </th>
                  ))}
                  <th className="text-left px-3 py-2 font-bold text-coffee-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-coffee-light/20">
                    {columns.map((c) => {
                      const value = toStringSafe(
                        (row as unknown as Record<string, unknown>)[c.key]
                      )

                      const readOnly = c.key === "id"

                      return (
                        <td key={c.key} className="px-3 py-2 align-top">
                          <input
                            value={value}
                            readOnly={readOnly}
                            onChange={(e) => onCellChange(row, c.key, e.target.value)}
                            className={`w-full min-w-[180px] rounded-md border px-2 py-1 ${
                              readOnly
                                ? "border-transparent bg-transparent text-coffee-medium"
                                : "border-coffee-light/30"
                            }`}
                          />
                        </td>
                      )
                    })}
                    <td className="px-3 py-2">
                      <button
                        onClick={() => removeRow(row)}
                        className="rounded-md border border-coffee-light/30 bg-white px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
