"use client"

export function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-64 right-72 z-50 h-12 bg-background/95 backdrop-blur border-t-2 holographic-box"
      style={{ borderImageSource: "linear-gradient(90deg, #ffccff, #ccffff, #ffffcc, #ffddff)", borderImageSlice: 1 }}
    >
      <div className="h-full flex items-center justify-center px-6 text-sm text-muted-foreground">
        <span>{""}</span>
        <span className="mx-3 text-border">•</span>
        <span>{""}</span>
        <span className="mx-3 text-border">•</span>
        <span>{""}</span>
      </div>
    </footer>
  )
}
