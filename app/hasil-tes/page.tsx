"use client"

import {useState} from "react"
import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {motion} from "framer-motion"
import {CheckCircle, Loader2, Search, XCircle} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Badge} from "@/components/ui/badge"
import {Separator} from "@/components/ui/separator"

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
    "MAPA-008": {
        nama: "ALVINDO WARDHANA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 84,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MAPA-009": {
        nama: "DANI YUDA PRATAMA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 76,
            "Tes Al-Qur'an & Ibadah": 0,
        },
    },
    "MAPA-010": {
        nama: "PELDI WIJAYA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MAPA-011": {
        nama: "FADLAN",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 72,
            "Tes Al-Qur'an & Ibadah": 95
        },
    },
    "MAPI-007": {
        nama: "FRANSISCA NURPALA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 0,
            "Tes Al-Qur'an & Ibadah": 0
        },
    },
    "MAPI-008": {
        nama: "AZ ZAHRAWANI ZAINUNA ALI",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 96,
            "Tes Al-Qur'an & Ibadah": 80
        },
    },
    "MAPI-009": {
        nama: "KAMILAH PUTRI AZZAHRA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 80
        },
    },
    "MAPI-010": {
        nama: "RISTIYANI",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MAPI-011": {
        nama: "TAZKIA ALTHAFUN NISA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 100,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MAPI-012": {
        nama: "AISYAH",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 80,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MAPI-013": {
        nama: "RINI",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 84,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MAPI-014": {
        nama: "FATHIMAH MUTHMAINNAH",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 100,
            "Tes Al-Qur'an & Ibadah": 95
        },
    },
    "MAPI-015": {
        nama: "ARINA DEKA ZAKIYAH SYAFITRI",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 0,
            "Tes Al-Qur'an & Ibadah": 0
        },
    },
    "MAPI-016": {
        nama: "SYERIL AIDA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 100,
            "Tes Al-Qur'an & Ibadah": 90
        },
    },

    "MTPA-015": {
        nama: "M. SAKHI FARRAS",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 80,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPA-025": {
        nama: "MUHAMMAD AL KARIIM KUSUMA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 88,
            "Tes Al-Qur'an & Ibadah": 80
        },
    },
    "MTPA-026": {
        nama: "M. RIZQI MAULANA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 84,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPA-027": {
        nama: "M.WAFI",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 76,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPA-028": {
        nama: "MUHAMMAD RHAVELL FAHREZA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 96,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPA-029": {
        nama: "RAJIB RAHMADI",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 96,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPA-030": {
        nama: "MUHAMAD MISBAKHUL HUDA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 84,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPA-031": {
        nama: "MUHAMMAD RAFLI RAMADHAN",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 0,
            "Tes Al-Qur'an & Ibadah": 0
        },
    },
    "MTPA-032": {
        nama: "MUZAKKI SYAH",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 96,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPA-033": {
        nama: "M. JASSTIN ALFARO",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPA-034": {
        nama: "AZMI EL AHMAD",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 88,
            "Tes Al-Qur'an & Ibadah": 80
        },
    },
    "MTPA-035": {
        nama: "ADILA APRIANTO",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 100,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPA-036": {
        nama: "MUDAKKIR AQIL",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 96,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPA-037": {
        nama: "ARKAN RAFIF AZKIYA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 72,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPA-038": {
        nama: "HARMOKO",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPA-039": {
        nama: "MUHAMMAD FATIH FARHAT",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 88,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPA-040": {
        nama: "YUDA FIRMANA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 96,
            "Tes Al-Qur'an & Ibadah": 80
        },
    },
    "MTPA-041": {
        nama: "ENGGI ALPA JERIN NUNAINO",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 0,
            "Tes Al-Qur'an & Ibadah": 0
        },
    },
    "MTPA-042": {
        nama: "NAUFAL AZZAM ALDRIK",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 88,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPA-043": {
        nama: "ZACKY ARROSYID",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPA-044": {
        nama: "AZKA RAJA IRAWAN",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 88,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPA-045": {
        nama: "DIKA FAUZAN AL-HAFIZH",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 88,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPA-046": {
        nama: "MUHAMMAD ADRYANSYAH",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPA-047": {
        nama: "AMMAR ZULHILMI",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPA-048": {
        nama: "MUHAMMAD EMIRUL FAIZ",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 76,
            "Tes Al-Qur'an & Ibadah": 80
        },
    },
    "MTPA-049": {
        nama: "ANDI MUHAMMAD YUSRA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 64,
            "Tes Al-Qur'an & Ibadah": 80
        },
    },
    "MTPA-050": {
        nama: "ALKHALIFI MANGGALA MAHARDIKA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 96,
            "Tes Al-Qur'an & Ibadah": 0
        },
    },
    "MTPA-051": {
        nama: "AZZAM MUJAMIL HAQ",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPA-052": {
        nama: "KHAIRI GALIH PRATAMA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 80,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPA-053": {
        nama: "HAZIQ ARADHANA WILANTARA DAWNIKA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPA-054": {
        nama: "MUHAMMAD MUZAHIDIN LATIF",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPA-055": {
        nama: "MUHAMMMAD JUMADIL AKBAR",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 76,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPA-056": {
        nama: "MUHAMMAD KHOLID",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPA-057": {
        nama: "AFFAF SALIM MURTADHO",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 88,
            "Tes Al-Qur'an & Ibadah": 80
        },
    },
    "MTPA-058": {
        nama: "RYAN SAPUTRA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 96,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPA-059": {
        nama: "MIFTAHUL FADLI",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 88,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPI-035": {
        nama: "SRI MULYANI",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 84,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPI-036": {
        nama: "KALILA RIFDA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPI-037": {
        nama: "NAURAH HUMAIRA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPI-038": {
        nama: "ATHIYAH SHAFA HUMAIRAH",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 76,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPI-039": {
        nama: "AZZAHRA FAIZA HUMAIROH",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 88,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPI-040": {
        nama: "FAZILA FRISKA FRONIA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPI-041": {
        nama: "FILDZAH HANNIYAH FAJRI",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 88,
            "Tes Al-Qur'an & Ibadah": 80
        },
    },
    "MTPI-042": {
        nama: "MAR ATUSHOLEHAH",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPI-043": {
        nama: "ALIKA NOUVALIN KHAYANA PUTRI",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPI-044": {
        nama: "SITI ZAHRA RAHMATIN",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 80
        },
    },
    "MTPI-045": {
        nama: "AQILA NIRA AFIFAH",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPI-046": {
        nama: "KHALISA AURORA PUTRI",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPI-047": {
        nama: "TIFANI AZZAHRA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 96,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPI-048": {
        nama: "AFRIN SYAIFANI ZAHRA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPI-049": {
        nama: "SALSA AULIA BILLA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 88,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPI-050": {
        nama: "NAILA RAMADHINA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 84,
            "Tes Al-Qur'an & Ibadah": 80
        },
    },
    "MTPI-051": {
        nama: "HANIFAH DWI WINARSIH",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 0,
            "Tes Al-Qur'an & Ibadah": 0
        },
    },
    "MTPI-052": {
        nama: "ANINDITA KHOIRINNISWA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 80,
            "Tes Al-Qur'an & Ibadah": 80
        },
    },
    "MTPI-053": {
        nama: "ALLICA NAURA ASYIFA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 92,
            "Tes Al-Qur'an & Ibadah": 45
        },
    },
    "MTPI-054": {
        nama: "QONITA AZMI KAMILA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 84,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPI-055": {
        nama: "MARISTA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 84,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPI-056": {
        nama: "QEENAN QIVANDY",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 72,
            "Tes Al-Qur'an & Ibadah": 70
        },
    },
    "MTPI-057": {
        nama: "FATHIYAH AL FAIRUZAH",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 96,
            "Tes Al-Qur'an & Ibadah": 65
        },
    },
    "MTPI-058": {
        nama: "KESIHA NANDIA KIRANA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 88,
            "Tes Al-Qur'an & Ibadah": 80
        },
    },
    "MTPI-059": {
        nama: "RERE MAEDA NISDALIPA",
        status: "DITERIMA",
        nilai: {
            "Tes Tertulis": 76,
            "Tes Al-Qur'an & Ibadah": 65
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

                                <Separator/>

                                <div>
                                    <h3 className="font-medium text-sm text-muted-foreground mb-2">KETERANGAN</h3>
                                    <p className="text-sm">{result.pesan}</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/50 flex justify-center">
                            {result.status === "DITERIMA" ? (
                                <div className="flex items-center text-green-600 dark:text-green-400">
                                    <CheckCircle className="mr-2 h-5 w-5"/>
                                    <span>Selamat! Anda telah diterima sebagai santri.</span>
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
