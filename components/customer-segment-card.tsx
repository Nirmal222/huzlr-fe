import Image from "next/image"
import { ArrowRight, Calendar, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CustomerSegmentCardProps {
  imageSrc: string
  category: string
  title: string
  description: string
}

export function CustomerSegmentCard({
  imageSrc,
  category,
  title,
  description,
}: CustomerSegmentCardProps) {
  return (
    <Card className="group relative flex h-[400px] flex-col overflow-hidden rounded-3xl border-0 bg-transparent shadow-none transition-all duration-500 hover:shadow-2xl">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <CardContent className="relative z-10 flex h-full flex-col justify-end p-6 text-white sm:p-8">
        <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-md">
            {category}
          </span>
          <h3 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
            {title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-300 opacity-90 transition-opacity duration-500 group-hover:opacity-100 group-hover:line-clamp-none">
            {description}
          </p>

          <div className="mt-6 flex translate-y-4 items-center gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-sm font-semibold">Learn more</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
