import Link from "next/link"
import { PesantrenLogo } from "./pesantren-logo"

interface HeaderProps {
  minimal?: boolean
}

export function Header({ minimal = false }: HeaderProps) {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-4 flex items-center space-x-2">
          <PesantrenLogo showText={!minimal} variant="horizontal" size="sm" />
        </Link>
        <div className="flex flex-1 items-center justify-end">
          {minimal && (
            <nav className="flex items-center">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Beranda
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}

