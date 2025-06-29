import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText } from "lucide-react"

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-10">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Alur Tes Santri Baru
        </h1>
        <h2 className="text-xl font-semibold text-primary">Gelombang 3</h2>
        <p className="text-lg text-muted-foreground">
          Informasi lengkap mengenai proses tes masuk untuk calon santri baru. Ikuti setiap langkah dengan seksama untuk
          kelancaran proses tes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
          <Link href="/alur-tes">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              Lihat Alur Tes
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/hasil-tes">
            <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
              Cek Hasil Tes
              <FileText className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="pt-8">
          <img
            src="/placeholder.svg?height=300&width=500"
            alt="Ilustrasi Tes Santri"
            className="mx-auto rounded-lg shadow-md"
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
  )
}
