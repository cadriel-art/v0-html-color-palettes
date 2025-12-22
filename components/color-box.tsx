"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PaletteType } from "@/lib/palette-data"

interface ColorBoxProps {
  color: string
  type: PaletteType
  colorIndex: number
  paletteName: string
  onCopy: (color: string) => void
  onHover: (info: any | null) => void
  isFavorite: boolean
  onToggleFavorite: (id: string, info: any) => void
}

function generateCSSCode(color: string, type: PaletteType): string {
  const baseStyles = `background: ${color};`

  switch (type) {
    case "satin":
      return `/* Satin Silk Effect */
${baseStyles}
position: relative;
overflow: hidden;

/* Add shimmer pseudo-element */
&::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: satinShimmer 3s ease-in-out infinite;
}

@keyframes satinShimmer {
  0% { left: -100%; }
  100% { left: 200%; }
}`

    case "satinshine":
      return `/* Satin Shine Effect */
${baseStyles}
position: relative;
overflow: hidden;

/* Add stronger shimmer pseudo-element */
&::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -100%;
  width: 100%;
  height: 200%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: satinShimmer 2.5s ease-in-out infinite;
}

@keyframes satinShimmer {
  0% { left: -100%; }
  100% { left: 200%; }
}`

    case "glowing":
      return `/* Glowing Effect */
${baseStyles}
animation: glow 2s ease-in-out infinite alternate;

@keyframes glow {
  from {
    filter: brightness(1) saturate(1);
  }
  to {
    filter: brightness(1.3) saturate(1.5);
  }
}`

    case "gradient":
      return `/* Animated Gradient Effect */
${baseStyles}
animation: glow 3s ease-in-out infinite alternate, gradientShift 8s ease-in-out infinite;

@keyframes glow {
  from { filter: brightness(1) saturate(1); }
  to { filter: brightness(1.3) saturate(1.5); }
}

@keyframes gradientShift {
  0%, 100% { filter: hue-rotate(0deg) brightness(1.1); }
  50% { filter: hue-rotate(30deg) brightness(1.3); }
}`

    case "metallic":
      return `/* Metallic Shine Effect */
${baseStyles}
background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%);
transition: transform 0.3s ease;

&:hover {
  transform: scale(1.1) translateY(-5px) rotateY(10deg);
}`

    case "holographic":
      return `/* Holographic Rainbow Effect */
${baseStyles}
animation: rainbow 3s linear infinite;

@keyframes rainbow {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}`

    case "glass":
      return `/* Frosted Glass Effect */
${baseStyles}
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);`

    case "solid":
    default:
      return baseStyles
  }
}

export function ColorBox({
  color,
  type,
  colorIndex,
  paletteName,
  onCopy,
  onHover,
  isFavorite,
  onToggleFavorite,
}: ColorBoxProps) {
  const [isHovered, setIsHovered] = useState(false)

  const isGradient = color.includes("gradient") || color.includes("rgba")
  const colorName = `Color ${colorIndex + 1}`
  const colorId = `${paletteName}-${colorIndex}`

  const colorInfo = {
    color,
    name: colorName,
    palette: paletteName,
    type,
  }

  const handleClick = () => {
    const cssCode = generateCSSCode(color, type)
    navigator.clipboard.writeText(cssCode)
    onCopy(cssCode)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover(colorInfo)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHover(null)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite(colorId, colorInfo)
  }

  const baseClasses =
    "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden"

  const shadowClasses =
    "shadow-[2px_2px_6px_#bebebe,-2px_-2px_6px_#ffffff] sm:shadow-[3px_3px_8px_#bebebe,-3px_-3px_8px_#ffffff]"
  const hoverShadow =
    "shadow-[4px_4px_10px_#bebebe,-4px_-4px_10px_#ffffff] sm:shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]"

  const typeClasses = {
    satin: "satin-box",
    satinshine: "satin-shine-box",
    gradient: "gradient-box",
    glowing: "glowing-box",
    metallic: "metallic-box",
    holographic: "holographic-box",
    glass: "glass-box",
    solid: "",
  }

  return (
    <div
      className={cn(
        baseClasses,
        isHovered ? hoverShadow : shadowClasses,
        isHovered && "scale-110 -translate-y-1",
        typeClasses[type],
      )}
      style={{ background: isGradient ? color : color }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={`Click to copy full CSS for this ${type} effect`}
    >
      <button
        onClick={handleFavoriteClick}
        className={cn(
          "absolute top-1 right-1 p-1 rounded-full transition-all duration-200",
          isHovered ? "opacity-100" : "opacity-0",
          isFavorite ? "text-yellow-400" : "text-white/70 hover:text-white",
        )}
      >
        <Star className={cn("w-3 h-3 sm:w-4 sm:h-4", isFavorite && "fill-yellow-400")} />
      </button>
    </div>
  )
}
