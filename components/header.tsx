"use client"

import { Menu } from "lucide-react"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-background/95 backdrop-blur border-b border-border">
      <div className="h-full flex items-center justify-between px-3 sm:px-4 md:px-6">
        <div className="flex items-center gap-2 sm:gap-3">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="xl:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg holographic-box"
            style={{ background: "linear-gradient(135deg, #ffccff 0%, #ccffff 50%, #ffffcc 100%)" }}
          />
          <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight">Colors Vault</h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <span>75 Palettes</span>
          <span className="text-border">|</span>
          <span>1,500 Colors</span>
        </div>
      </div>
    </header>
  )
}
