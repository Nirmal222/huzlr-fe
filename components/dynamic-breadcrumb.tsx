"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const routeMapping: Record<string, string> = {
    projects: "Projects",
    new: "New Project",
    brainstorms: "Brainstorms",
    dashboard: "Dashboard",
}

export function DynamicBreadcrumb() {
    const pathname = usePathname()
    const segments = pathname.split("/").filter((segment) => segment !== "")

    // If we are on home page
    if (segments.length === 0) {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Home</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        )
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {segments.map((segment, index) => {
                    const isLast = index === segments.length - 1
                    const href = `/${segments.slice(0, index + 1).join("/")}`

                    // Format the label
                    let label = routeMapping[segment]
                    if (!label) {
                        // Fallback: capitalize or show segment as is (e.g. for IDs)
                        // Check if it looks like an ID (numeric or long string)
                        if (/^\d+$/.test(segment)) {
                            label = `#${segment}`
                        } else {
                            label = segment.charAt(0).toUpperCase() + segment.slice(1)
                        }
                    }

                    return (
                        <React.Fragment key={href}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
