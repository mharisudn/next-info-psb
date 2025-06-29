"use client"

import {useState} from "react"
import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {motion} from "framer-motion"
import {CheckCircle, Clock, Loader2, Search, XCircle} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Badge} from "@/components/ui/badge"
import {Separator} from "@/components/ui/separator"
import { resultMts } from "@/app/data/result_mts";

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
        if (resultMts[kode]) {
            setResult(resultMts[kode])
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
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Kode Peserta</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Contoh: MAPA-001" {...field} />
                                        </FormControl>
                                        <FormDescription>Kode peserta terdiri dari 5-10 karakter</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                        Mencari...
                                    </>
                                ) : (
                                    <>
                                        <Search className="mr-2 h-4 w-4"/>
                                        Cek Hasil
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>

                    {error && (
                        <motion.div
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm"
                        >
                            <XCircle className="inline-block mr-2 h-4 w-4"/>
                            {error}
                        </motion.div>
                    )}
                </CardContent>
            </Card>

            {result && (
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="mt-6">
<Card className={
  result.status === "DITERIMA"
    ? "border-green-200"
    : result.status === "MENUNGGU"
    ? "border-yellow-200"
    : "border-red-200"
}>                        <CardHeader className={
    result.status === "DITERIMA"
      ? "bg-green-50 dark:bg-green-950/20"
      : result.status === "MENUNGGU"
      ? "bg-yellow-50 dark:bg-yellow-950/20"
      : "bg-red-50 dark:bg-red-950/20"
  }>
                            <div className="flex justify-between items-center">
      <CardTitle>{result.nama}</CardTitle>
      <Badge variant={
        result.status === "DITERIMA"
          ? "default"
          : result.status === "MENUNGGU"
          ? "secondary"
          : "destructive"
      }>
        {result.status}
      </Badge>
    </div>
  </CardHeader>
                        <CardContent className="pt-6">
    <div className="space-y-4">
      {Object.keys(result.nilai).length > 0 ? (
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
      ) : (
        <div className="text-sm italic text-muted-foreground">
          Nilai belum tersedia.
        </div>
      )}

      <Separator/>
    </div>
  </CardContent>

  <CardFooter className="bg-muted/50 flex justify-center">
    {result.status === "DITERIMA" ? (
      <div className="flex items-center text-green-600 dark:text-green-400">
        <CheckCircle className="mr-2 h-5 w-5"/>
        <span>Selamat! Anda telah diterima sebagai santri.</span>
      </div>
    ) : result.status === "MENUNGGU" ? (
      <div className="flex items-center text-yellow-600 dark:text-yellow-400">
        <Clock className="mr-2 h-5 w-5"/>
        <span>Menunggu hasil ujian dikirim oleh peserta.</span>
      </div>
    ) : (
      <div className="flex items-center text-red-600 dark:text-red-400">
        <XCircle className="mr-2 h-5 w-5"/>
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
