import Image from "next/image"
import { ArrowRight, Calendar, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CustomerSegmentCardProps {
  imageSrc: string
  category: string
  title: string
  description: string
  time: string
  readTime: string
}

export function CustomerSegmentCard({
  imageSrc,
  category,
  title,
  description,
  time,
  readTime,
}: CustomerSegmentCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-3xl border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-lg md:flex-row h-full">
      <div className="relative h-48 w-full p-4 md:h-auto md:w-2/5">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <CardContent className="flex flex-1 flex-col justify-between p-6 md:p-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="rounded-lg bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {category}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{time}</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold leading-tight tracking-tight text-foreground">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{readTime}</span>
          </div>
          <Button variant="ghost" size="sm" className="group gap-2 text-xs font-medium">
            Explore {category}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
