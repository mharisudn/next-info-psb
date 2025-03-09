"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ClipboardList, BookOpen, FileText, Users, CheckCircle, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { PesantrenLogo } from "@/components/pesantren-logo"

const steps = [
  {
    id: 1,
    title: "Pendaftaran & Informasi",
    description: "Santri datang ke bagian informasi, menyerahkan berkas & mendapatkan kartu tes",
    icon: ClipboardList,
    color: "bg-blue-100 dark:bg-blue-950",
    textColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    id: 2,
    title: "Tes Tulis",
    description: "Santri menuju tempat tes tulis, wali menunggu di area yang telah disediakan",
    icon: FileText,
    color: "bg-purple-100 dark:bg-purple-950",
    textColor: "text-purple-600 dark:text-purple-400",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
  {
    id: 3,
    title: "Tes Al-Qur'an",
    description: "Setelah tes tulis, santri mengikuti tes membaca Al-Qur'an, wali tetap menunggu",
    icon: BookOpen,
    color: "bg-green-100 dark:bg-green-950",
    textColor: "text-green-600 dark:text-green-400",
    borderColor: "border-green-200 dark:border-green-800",
  },
  {
    id: 4,
    title: "Wawancara",
    description: "Santri bersama wali masuk ke ruang wawancara, wawancara dilakukan sesuai arahan petugas",
    icon: Users,
    color: "bg-amber-100 dark:bg-amber-950",
    textColor: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
  {
    id: 5,
    title: "Tes Selesai",
    description: "Santri dan wali dipersilakan meninggalkan tempat",
    icon: CheckCircle,
    color: "bg-emerald-100 dark:bg-emerald-950",
    textColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-200 dark:border-emerald-800",
  },
]

export default function AlurTes() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]))
  }

  return (
    <div className="container max-w-4xl px-4 py-8 pb-20">
      <div className="flex flex-col items-center mb-8">
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Alur Tes Santri Baru</h1>
          <h2 className="text-xl font-semibold text-primary">Gelombang 1</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Ikuti setiap tahapan tes sesuai dengan alur yang telah ditentukan
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={cn(
                "relative overflow-hidden transition-all",
                completedSteps.includes(step.id) ? "border-2 " + step.borderColor : "",
              )}
            >
              {completedSteps.includes(step.id) && (
                <div className="absolute top-0 right-0 p-2">
                  <div className="bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
              )}
              <CardHeader className={cn("flex flex-row items-center gap-4", step.color)}>
                <div className={cn("p-2 rounded-full", step.color)}>
                  <step.icon className={cn("h-6 w-6", step.textColor)} />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-background text-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                      {step.id}
                    </span>
                    {step.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="text-base">{step.description}</CardDescription>
                <div className="mt-4 flex items-center">
                  <Checkbox
                    id={`step-${step.id}`}
                    checked={completedSteps.includes(step.id)}
                    onCheckedChange={() => toggleStep(step.id)}
                  />
                  <label htmlFor={`step-${step.id}`} className="ml-2 text-sm font-medium cursor-pointer">
                    Tandai telah selesai
                  </label>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground">
          Jumlah tahapan yang telah diselesaikan: {completedSteps.length} dari {steps.length}
        </p>
        {completedSteps.length === steps.length && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-4">
            <Card className="bg-green-100 dark:bg-green-950 border-green-200 dark:border-green-800">
              <CardContent className="pt-6 pb-4">
                <p className="text-green-700 dark:text-green-300 font-medium">
                  Selamat! Anda telah menyelesaikan seluruh tahapan tes santri baru.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

