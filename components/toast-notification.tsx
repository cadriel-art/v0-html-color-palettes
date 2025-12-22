"use client"

import { useEffect } from "react"
import { cn } from "@/lib/utils"

interface ToastNotificationProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export function ToastNotification({ message, isVisible, onClose }: ToastNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed top-8 right-8 bg-emerald-500 text-white px-8 py-4 rounded-xl",
        "text-base font-bold shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-50",
        "animate-in slide-in-from-top-4 fade-in duration-300",
      )}
    >
      {message}
    </div>
  )
}
