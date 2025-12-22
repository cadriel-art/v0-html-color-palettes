"use client"

import { Copy, Trash2 } from "lucide-react"

interface ColorInfo {
  color: string
  name: string
  palette: string
  type: string
}

interface RightSidebarProps {
  hoveredColor: ColorInfo | null
  recentlyCopied: ColorInfo[]
  onClearRecent: () => void
  onCopyRecent: (color: ColorInfo) => void
  isOpen: boolean
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!match) return null
  return {
    r: Number.parseInt(match[1], 16),
    g: Number.parseInt(match[2], 16),
    b: Number.parseInt(match[3], 16),
  }
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

function extractFirstColor(colorStr: string): string {
  const hexMatch = colorStr.match(/#[a-fA-F0-9]{6}/)
  return hexMatch ? hexMatch[0] : "#000000"
}

export function RightSidebar({ hoveredColor, recentlyCopied, onClearRecent, onCopyRecent, isOpen }: RightSidebarProps) {
  const previewColor = hoveredColor?.color || "#1a1a2e"
  const firstHex = extractFirstColor(previewColor)
  const rgb = hexToRgb(firstHex)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null

  return (
    <aside
      className={`fixed right-0 top-16 bottom-0 w-56 bg-background border-l-2 holographic-box overflow-y-auto z-30 transition-transform duration-300 hidden xl:block`}
      style={{ borderImageSource: "linear-gradient(180deg, #ccffff, #eeffdd, #ffffcc, #ffddff)", borderImageSlice: 1 }}
    >
      <div className="p-3 space-y-4">
        {/* Color Preview */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-2">Color Preview</h3>
          <div
            className="w-full h-24 rounded-lg border-2 holographic-box mb-2 transition-all duration-200"
            style={{ background: previewColor, borderColor: "#ffccff" }}
          />
          {hoveredColor ? (
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">{hoveredColor.name}</p>
              <p className="text-xs text-muted-foreground">{hoveredColor.palette}</p>
              <p className="text-xs text-muted-foreground capitalize">{hoveredColor.type}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Hover over a color to preview</p>
          )}
        </div>

        {/* Color Info */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-2">Color Info</h3>
          <div className="space-y-2 text-sm">
            <div
              className="flex justify-between items-center p-2 rounded holographic-box"
              style={{ background: "linear-gradient(135deg, #ffccff20 0%, #eeccff20 100%)" }}
            >
              <span className="text-muted-foreground">HEX</span>
              <code className="text-foreground">{firstHex}</code>
            </div>
            {rgb && (
              <div
                className="flex justify-between items-center p-2 rounded holographic-box"
                style={{ background: "linear-gradient(135deg, #ccffff20 0%, #ddccff20 100%)" }}
              >
                <span className="text-muted-foreground">RGB</span>
                <code className="text-foreground">
                  {rgb.r}, {rgb.g}, {rgb.b}
                </code>
              </div>
            )}
            {hsl && (
              <div
                className="flex justify-between items-center p-2 rounded holographic-box"
                style={{ background: "linear-gradient(135deg, #ffffcc20 0%, #ffddff20 100%)" }}
              >
                <span className="text-muted-foreground">HSL</span>
                <code className="text-foreground">
                  {hsl.h}°, {hsl.s}%, {hsl.l}%
                </code>
              </div>
            )}
          </div>
        </div>

        {/* Recently Copied */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-foreground">Recently Copied</h3>
            {recentlyCopied.length > 0 && (
              <button
                onClick={onClearRecent}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          {recentlyCopied.length === 0 ? (
            <p className="text-sm text-muted-foreground">No colors copied yet</p>
          ) : (
            <div className="space-y-2">
              {recentlyCopied.slice(0, 10).map((item, index) => (
                <button
                  key={index}
                  onClick={() => onCopyRecent(item)}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div
                    className="w-8 h-8 rounded border border-border flex-shrink-0"
                    style={{ background: item.color }}
                  />
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.palette}</p>
                  </div>
                  <Copy className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
