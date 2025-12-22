"use client"

import type React from "react"

import { Search, Star, Filter, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

interface LeftSidebarProps {
  categories: { name: string; count: number }[]
  activeCategory: string | null
  onCategoryClick: (category: string | null) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  favorites: string[]
  onShowFavorites: () => void
  showingFavorites: boolean
  isOpen: boolean
  onClose: () => void
}

export function LeftSidebar({
  categories,
  activeCategory,
  onCategoryClick,
  searchQuery,
  onSearchChange,
  favorites,
  onShowFavorites,
  showingFavorites,
  isOpen,
  onClose,
}: LeftSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    favorites: true,
  })

  const toggleSection = (section: "categories" | "favorites") => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} aria-hidden="true" />}

      <aside
        className={`fixed left-0 top-16 bottom-0 w-56 xl:w-60 bg-background border-r-2 holographic-box overflow-y-auto z-40 transition-transform duration-300 xl:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          borderImageSource: "linear-gradient(180deg, #ffccff, #ddccff, #ccffff, #eeffdd)",
          borderImageSlice: 1,
        }}
      >
        <div className="p-3 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search palettes..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 holographic-box"
              style={{ "--tw-ring-color": "#ffccff" } as React.CSSProperties}
            />
          </div>

          {/* Favorites Section */}
          <div>
            <button
              onClick={() => toggleSection("favorites")}
              className="flex items-center justify-between w-full text-sm font-medium text-foreground mb-2"
            >
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 holographic-box" style={{ color: "#ffccff" }} />
                Favorites ({favorites.length})
              </span>
              {expandedSections.favorites ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {expandedSections.favorites && (
              <button
                onClick={onShowFavorites}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  showingFavorites ? "holographic-box text-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
                style={showingFavorites ? { background: "linear-gradient(135deg, #ffccff 0%, #eeccff 100%)" } : {}}
              >
                {showingFavorites ? "Showing Favorites" : "View Saved Colors"}
              </button>
            )}
          </div>

          {/* Categories Section */}
          <div>
            <button
              onClick={() => toggleSection("categories")}
              className="flex items-center justify-between w-full text-sm font-medium text-foreground mb-2"
            >
              <span className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Categories
              </span>
              {expandedSections.categories ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {expandedSections.categories && (
              <div className="space-y-1">
                <button
                  onClick={() => onCategoryClick(null)}
                  className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    activeCategory === null && !showingFavorites
                      ? "holographic-box text-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                  style={
                    activeCategory === null && !showingFavorites
                      ? { background: "linear-gradient(135deg, #ffccff 0%, #eeccff 100%)" }
                      : {}
                  }
                >
                  All Palettes
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => onCategoryClick(cat.name)}
                    className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center justify-between ${
                      activeCategory === cat.name
                        ? "holographic-box text-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                    style={
                      activeCategory === cat.name
                        ? { background: "linear-gradient(135deg, #ffccff 0%, #eeccff 100%)" }
                        : {}
                    }
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs opacity-60">{cat.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
