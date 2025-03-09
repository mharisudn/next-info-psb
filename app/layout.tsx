import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BottomNav } from "@/components/bottom-nav"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pondok Pesantren Assalam Al-Islami - Alur Tes Santri Baru",
  description: "Informasi lengkap mengenai proses tes masuk untuk calon santri baru Pondok Pesantren Assalam Al-Islami",
  images: {
    domains: ["aiis.assalam.id"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="pt-4">{children}</main>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'