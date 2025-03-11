"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Search, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Form schema
const formSchema = z.object({
  kode: z
    .string()
    .min(5, {
      message: "Kode peserta minimal 5 karakter",
    })
    .max(10, {
      message: "Kode peserta maksimal 10 karakter",
    }),
})

// Mock data for test results
const mockResults = {
  MTPI001: {
    nama: "PRINCESS SYAKIRA IRAWAN",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 82,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPA001: {
    nama: "DARMA YUDA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 76,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MTPI002: {
    nama: "NAJWA RAHMA HAFIDZA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 91,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MTPI003: {
    nama: "INTAN NUR HAMIMAH",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 88,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPA002: {
    nama: "YASSER ATTILA SYAHEL",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 80,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MTPI004: {
    nama: "MISHEL AUSTIN UTAMI",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 73,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MAPI002: {
    nama: "ARUMI KHAIRUNISA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 70,
          "Tes Al-Qur'an & Ibadah": null
    },
  },
  MTPI005: {
    nama: "ELISYA PUTRI ANGGARAINI",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 82,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPA003: {
    nama: "PIQUE LABERTO",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 70,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MAPI003: {
    nama: "DEA LITISAPUTRI",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 76,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MTPI006: {
    nama: "KHANZA SYAHIRA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 88,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPI007: {
    nama: "AFIFAH AZZAHRA TISNA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 84,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPA004: {
    nama: "ILHAM BAYU LAKSANA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 80,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPA005: {
    nama: "MUSYAFFA YUSUF ALI",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 85,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPI008: {
    nama: "NAZHIIFAH AFLAH DZAKIYAH",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 78,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MAPA001: {
    nama: "MUHAMMAD FATIR AKBAR",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 88,
          "Tes Al-Qur'an & Ibadah": 70
    },
  },
  MTPA006: {
    nama: "DAVIAN ARYADI",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 82,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPI009: {
    nama: "AQEELA AZALIYYAH MEBIAN",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 80,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPI010: {
    nama: "FAYHA AUNI AZYAN",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 89,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPI011: {
    nama: "FANESA FRATISTA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 73,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MAPA002: {
    nama: "ZUHDI ALFATH RAHMAN ZAM",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 0,
          "Tes Al-Qur'an & Ibadah": null
    },
  },
  MTPA007: {
    nama: "AFDAL DINILHAQ",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 85,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPA008: {
    nama: "M. FARRAZ ALZAM PRATAMA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 67,
          "Tes Al-Qur'an & Ibadah": 70
    },
  },
  MTPI012: {
    nama: "DURRAH EL QUDSIYAH",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 91,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPI013: {
    nama: "VANIA SALSABILA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 0,
          "Tes Al-Qur'an & Ibadah": null
    },
  },
  MTPI014: {
    nama: "FAKHIRAH ZALPAH",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 95,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MTPI015: {
    nama: "ZAKIA SYIFA CAHYADI",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 88,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MTPI016: {
    nama: "RAISA AZZAHRAH",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 80,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MTPI017: {
    nama: "NAURA PARA DISKA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 74,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MTPA009: {
    nama: "MUHAMMAD LUTHFI AL-FURQON",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 82,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MAPA003: {
    nama: "ANDIKA SETIAWAN",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 74,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPA010: {
    nama: "MUHAMMAD TRY DAVIAN",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 65,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPI018: {
    nama: "NAOMI INTANIA ZARIFAH",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 82,
          "Tes Al-Qur'an & Ibadah": 70
    },
  },
  MTPI019: {
    nama: "FAIZA AFIFAH",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 80,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MTPA011: {
    nama: "ABDUL JALIL",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 84,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MTPA012: {
    nama: "MUHAMMAD FAIZ RASYID",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 82,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MAPA004: {
    nama: "OKTA HAFIZILLA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 88,
          "Tes Al-Qur'an & Ibadah": null
    },
  },
  MTPI020: {
    nama: "ANNISSA NURAINI KARIM",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 84,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPI021: {
    nama: "ALMIRA ZAHIRA SHOFA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 88,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPI022: {
    nama: "DESTI PUTRI KANDITA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 80,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPI023: {
    nama: "ALIFAH NOOR SAFFINAH",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 84,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPA013: {
    nama: "AL ABIZAR GUNAWAN",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 82,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPI024: {
    nama: "SALMA SALSABILA RHAMADANY",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 73,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPI025: {
    nama: "ANISA SALSABILA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 85,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MAPA005: {
    nama: "SAPTA PRATAMA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 65,
          "Tes Al-Qur'an & Ibadah": null
    },
  },
  MTPI026: {
    nama: "MUMTADZAH QURRATA AINI",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 0,
          "Tes Al-Qur'an & Ibadah": null
    },
  },
  MAPA006: {
    nama: "M. RAIHAN AL ZIKRI",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 69,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPI027: {
    nama: "NUURA SHAFA AZZAHRAA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 89,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPA014: {
    nama: "ABDUL KHODIR JAILANI",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 65,
          "Tes Al-Qur'an & Ibadah": 60
    },
  },
  MTPA015: {
    nama: "M. SAKHI FARRAS",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 0,
          "Tes Al-Qur'an & Ibadah": null
    },
  },
  MTPI028: {
    nama: "INAYAH MAULIDA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 84,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MTPA016: {
    nama: "WILDAN UBAIDILLAH",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 82,
          "Tes Al-Qur'an & Ibadah": 70
    },
  },
  MTPI029: {
    nama: "ADIBAH MUSHLIHAH",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 80,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MTPI030: {
    nama: "ALLAWIYAH MAULANA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 74,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPI031: {
    nama: "CAHAYA WULANDARI",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 76,
          "Tes Al-Qur'an & Ibadah": 70
    },
  },
  MTPA017: {
    nama: "MUAMAR KHUZAIRY",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 85,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPI032: {
    nama: "ZILFA SHAKILA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 89,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPA018: {
    nama: "MUHAMMAD ZAHRAN AKMAL",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 80,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPA019: {
    nama: "OMAR NUSANTARA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 70,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MAPI004: {
    nama: "AZMY NAILAH AZ-ZAHIRAH",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 88,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MTPA020: {
    nama: "DAFFA AFKAR AQILAH",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 82,
          "Tes Al-Qur'an & Ibadah": 70
    },
  },
  MTPI033: {
    nama: "NAYLA AZZAHRA ARSYFA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 69,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MAPI005: {
    nama: "LAYLAH SYAKIRAH",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 69,
          "Tes Al-Qur'an & Ibadah": 70
    },
  },
  MTPA021: {
    nama: "M. ELTRY RIANZAH S",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 69,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPI034: {
    nama: "NAYLA KHOIRUN NISA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 78,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MTPA022: {
    nama: "ERLANGGA EKA PRATAMA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 85,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
  MTPA023: {
    nama: "M. ROHIS NURUL ADHA",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 82,
          "Tes Al-Qur'an & Ibadah": 90
    },
  },
  MAPA007: {
    nama: "MUHAMMAD ABDILLAH",
        status: "DITERIMA",
        nilai: {
      "Tes Tertulis": 84,
          "Tes Al-Qur'an & Ibadah": 80
    },
  },
}

export default function HasilTes() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kode: "",
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    setError("")
    setResult(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const kode = values.kode.toUpperCase()
    if (mockResults[kode]) {
      setResult(mockResults[kode])
    } else {
      setError("Kode peserta tidak ditemukan. Silakan periksa kembali kode yang Anda masukkan.")
    }

    setLoading(false)
  }

  return (
    <div className="container max-w-md px-4 py-8 pb-20">
      <div className="flex flex-col items-center mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Hasil Tes Santri</h1>
          <p className="text-muted-foreground mt-2">Masukkan kode peserta untuk melihat hasil tes</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cek Hasil Tes</CardTitle>
          <CardDescription>Masukkan kode peserta yang telah diberikan saat pendaftaran</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="kode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode Peserta</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: MAPA001" {...field} />
                    </FormControl>
                    <FormDescription>Kode peserta terdiri dari 5-10 karakter</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mencari...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Cek Hasil
                  </>
                )}
              </Button>
            </form>
          </Form>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm"
            >
              <XCircle className="inline-block mr-2 h-4 w-4" />
              {error}
            </motion.div>
          )}
        </CardContent>
      </Card>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <Card className={result.status === "DITERIMA" ? "border-green-200" : "border-red-200"}>
            <CardHeader
              className={
                result.status === "DITERIMA" ? "bg-green-50 dark:bg-green-950/20" : "bg-red-50 dark:bg-red-950/20"
              }
            >
              <div className="flex justify-between items-center">
                <CardTitle>{result.nama}</CardTitle>
                <Badge variant={result.status === "DITERIMA" ? "default" : "destructive"}>
                  {result.status === "DITERIMA" ? "DITERIMA" : "TIDAK DITERIMA"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">NILAI TES</h3>
                  <div className="space-y-2">
                    {Object.entries(result.nilai).map(([subject, score]) => (
                      <div key={subject} className="flex justify-between items-center">
                        <span>{subject}</span>
                        <span className="font-medium">{score}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">KETERANGAN</h3>
                  <p className="text-sm">{result.pesan}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 flex justify-center">
              {result.status === "DITERIMA" ? (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  <span>Selamat! Anda telah diterima sebagai santri.</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600 dark:text-red-400">
                  <XCircle className="mr-2 h-5 w-5" />
                  <span>Tetap semangat untuk kesempatan berikutnya</span>
                </div>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
