"use client"

import { ColorBox, type ColorInfo } from "./color-box"
import type { Palette } from "@/lib/palette-data"

interface PaletteSectionProps {
  palette: Palette
  onCopy: (color: string) => void
  onHover: (info: ColorInfo | null) => void
  favorites: Set<string>
  onToggleFavorite: (id: string, info: ColorInfo) => void
}

export function PaletteSection({ palette, onCopy, onHover, favorites, onToggleFavorite }: PaletteSectionProps) {
  return (
    <div className="bg-background/50 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 shadow-sm border border-border/30 hover:shadow-md transition-shadow">
      <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-foreground mb-2 sm:mb-3 text-center">
        {palette.name}
      </h2>
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 w-fit mx-auto">
        {palette.colors.map((color, index) => {
          const colorId = `${palette.name}-${index}`
          return (
            <ColorBox
              key={colorId}
              color={color}
              type={palette.type}
              colorIndex={index}
              paletteName={palette.name}
              onCopy={onCopy}
              onHover={onHover}
              isFavorite={favorites.has(colorId)}
              onToggleFavorite={onToggleFavorite}
            />
          )
        })}
      </div>
    </div>
  )
}
