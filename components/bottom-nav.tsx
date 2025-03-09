"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ListChecks, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Beranda",
      href: "/",
      icon: Home,
    },
    {
      name: "Alur Tes",
      href: "/alur-tes",
      icon: ListChecks,
    },
    {
      name: "Hasil Tes",
      href: "/hasil-tes",
      icon: FileText,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="grid h-full grid-cols-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex flex-col items-center justify-center px-5 hover:bg-muted transition-colors",
              pathname === item.href ? "text-primary" : "text-muted-foreground",
            )}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

