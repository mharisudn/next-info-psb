import Image from "next/image"
import { cn } from "@/lib/utils"

interface PesantrenLogoProps {
  className?: string
  showText?: boolean
  variant?: "vertical" | "horizontal"
  size?: "sm" | "md" | "lg"
}

export function PesantrenLogo({ className, showText = true, variant = "vertical", size = "md" }: PesantrenLogoProps) {
  const logoSizes = {
    sm: { width: 40, height: 40 },
    md: { width: 60, height: 60 },
    lg: { width: 80, height: 80 },
  }

  const { width, height } = logoSizes[size]

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        variant === "vertical" && "flex-col",
        variant === "horizontal" && "flex-row",
        className,
      )}
    >
      <div className="relative flex items-center justify-center">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2p87mvLhZpaTaZI-BJkfJrN4HqDrJ17ZLFw&s"
          alt="Logo Pondok Pesantren Assalam Al-Islami"
          width={width}
          height={height}
          className="h-auto"
          priority
        />
      </div>
      {showText && (
        <div
          className={cn(
            "flex flex-col",
            variant === "vertical" && "items-center text-center",
            variant === "horizontal" && "items-start",
          )}
        >
          <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">Pondok Pesantren</span>
          <span className="font-bold tracking-tight leading-tight">Assalam Al-Islami</span>
        </div>
      )}
    </div>
  )
}

