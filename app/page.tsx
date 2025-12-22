"use client"

import { useState, useMemo } from "react"
import { PaletteSection } from "@/components/palette-section"
import { ToastNotification } from "@/components/toast-notification"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LeftSidebar } from "@/components/left-sidebar"
import { RightSidebar } from "@/components/right-sidebar"
import { allPalettes } from "@/lib/palette-data"
import type { ColorInfo } from "@/components/color-box"

export default function ColorPalettesPage() {
  const [toast, setToast] = useState({ visible: false, message: "" })
  const [hoveredColor, setHoveredColor] = useState<ColorInfo | null>(null)
  const [recentlyCopied, setRecentlyCopied] = useState<ColorInfo[]>([])
  const [favorites, setFavorites] = useState<Map<string, ColorInfo>>(new Map())
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [showingFavorites, setShowingFavorites] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)

  // Build categories from palette types
  const categories = useMemo(() => {
    const typeMap = new Map<string, number>()
    allPalettes.forEach((p) => {
      const typeName = p.type.charAt(0).toUpperCase() + p.type.slice(1)
      typeMap.set(typeName, (typeMap.get(typeName) || 0) + 1)
    })
    return Array.from(typeMap.entries()).map(([name, count]) => ({ name, count }))
  }, [])

  // Filter palettes based on search, category, and favorites
  const filteredPalettes = useMemo(() => {
    if (showingFavorites) {
      const favoriteColors = Array.from(favorites.values())
      if (favoriteColors.length === 0) return []

      const grouped = new Map<string, ColorInfo[]>()
      favoriteColors.forEach((info) => {
        const existing = grouped.get(info.palette) || []
        existing.push(info)
        grouped.set(info.palette, existing)
      })

      return Array.from(grouped.entries()).map(([name, colors]) => ({
        name: `${name} (Favorites)`,
        colors: colors.map((c) => c.color),
        type: colors[0].type as any,
      }))
    }

    return allPalettes.filter((palette) => {
      const matchesSearch = searchQuery === "" || palette.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === null || palette.type.toLowerCase() === activeCategory.toLowerCase()
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory, showingFavorites, favorites])

  const handleCopy = (cssCode: string) => {
    if (hoveredColor) {
      setRecentlyCopied((prev) => {
        const filtered = prev.filter((c) => !(c.palette === hoveredColor.palette && c.name === hoveredColor.name))
        return [hoveredColor, ...filtered].slice(0, 20)
      })
    }
    setToast({ visible: true, message: "CSS code copied to clipboard!" })
  }

  const handleToggleFavorite = (id: string, info: ColorInfo) => {
    setFavorites((prev) => {
      const newFavorites = new Map(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.set(id, info)
      }
      return newFavorites
    })
  }

  const handleCopyRecent = (info: ColorInfo) => {
    navigator.clipboard.writeText(info.color)
    setToast({ visible: true, message: "Color copied to clipboard!" })
  }

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category)
    setShowingFavorites(false)
  }

  const handleShowFavorites = () => {
    setShowingFavorites(!showingFavorites)
    setActiveCategory(null)
  }

  const favoritesSet = useMemo(() => new Set(favorites.keys()), [favorites])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0e5ec] to-[#f8f9fa]">
      <Header onMenuClick={() => setLeftSidebarOpen(!leftSidebarOpen)} />
      <LeftSidebar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favorites={Array.from(favorites.keys())}
        onShowFavorites={handleShowFavorites}
        showingFavorites={showingFavorites}
        isOpen={leftSidebarOpen}
        onClose={() => setLeftSidebarOpen(false)}
      />
      <RightSidebar
        hoveredColor={hoveredColor}
        recentlyCopied={recentlyCopied}
        onClearRecent={() => setRecentlyCopied([])}
        onCopyRecent={handleCopyRecent}
        isOpen={rightSidebarOpen}
      />

      <main className="pt-16 pb-16 min-h-screen transition-all duration-300 px-2 sm:px-4 xl:ml-60 xl:mr-56 xl:px-4">
        <div className="max-w-full mx-auto py-4">
          {filteredPalettes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">
                {showingFavorites
                  ? "No favorites saved yet. Click the star on any color to save it!"
                  : "No palettes found matching your search."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
              {filteredPalettes.map((palette) => (
                <PaletteSection
                  key={palette.name}
                  palette={palette}
                  onCopy={handleCopy}
                  onHover={setHoveredColor}
                  favorites={favoritesSet}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      <ToastNotification
        message={toast.message}
        isVisible={toast.visible}
        onClose={() => setToast({ visible: false, message: "" })}
      />
    </div>
  )
}
