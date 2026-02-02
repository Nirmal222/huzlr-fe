
"use client"

import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { SlideCover } from "@/components/pitch-deck/slide-cover"
import { SlideProblem } from "@/components/pitch-deck/slide-problem"

export default function PitchDeckPage() {
    const [api, setApi] = React.useState<any>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    const slides = [
        {
            id: "cover",
            content: (
                <SlideCover
                    companyName="huzlr."
                    title={
                        <>
                            Project Management is Chaos
                        </>
                    }
                    tagline={<><b className="font-bold">& huzlr</b> brings your chaos to clarity.</>}
                    subheadline="Built for PMs drowning in updates, follow-ups, and late surprises."
                    presenter="Nirmal"
                    learnMoreUrl="#"
                    quote="Your AI co-pilot for project management."
                />
            ),
        },
        {
            id: "problem",
            content: <SlideProblem />,
        },
    ]

    return (
        <div className="w-full h-screen bg-background overflow-hidden relative">
            <Carousel setApi={setApi} className="w-full h-full" opts={{ loop: true }}>
                <CarouselContent className="h-full ml-0">
                    {slides.map((slide) => (
                        <CarouselItem key={slide.id} className="h-full pl-0">
                            <div className="h-full w-full bg-card text-card-foreground overflow-hidden">
                                {slide.content}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-background/5 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-2xl transition-all hover:bg-background/10 hover:border-white/20">
                    <CarouselPrevious variant="ghost" className="static translate-y-0 h-8 w-8 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground" />
                    <div className="px-2 text-xs font-medium text-muted-foreground text-center tabular-nums select-none tracking-widest">
                        <span className="text-foreground">{current}</span>
                        <span className="mx-1 opacity-30">/</span>
                        <span>{count}</span>
                    </div>
                    <CarouselNext variant="ghost" className="static translate-y-0 h-8 w-8 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground" />
                </div>
            </Carousel>
        </div>
    )
}
