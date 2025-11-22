"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { DataTable } from "@/components/data-table"
import { DataTableSkeleton } from "@/components/data-table-skeleton"
import { projectColumns, type ProjectData } from "./columns"
import { Badge } from "@/components/ui/badge"
import { useGetProjectsQuery } from "@/services/projectsApi"

export default function Page() {
  const { data, isLoading, isError, error } = useGetProjectsQuery()

  const tabs = [
    { value: "outline", label: "Outline" },
    { value: "past-performance", label: "Past Performance", badge: 3 },
    { value: "key-personnel", label: "Key Personnel", badge: 2 },
    { value: "focus-documents", label: "Focus Documents" },
  ]

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader>
          <Link href="/projects/new">
            <Button size="sm" className="gap-2 rounded-full">
              <Plus className="h-4 w-4" />
              Create Project
            </Button>
          </Link>
        </SiteHeader>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {isLoading && <DataTableSkeleton />}

              {isError && (
                <div className="flex items-center justify-center py-8">
                  <div className="text-destructive">
                    Error loading projects: {error?.toString()}
                  </div>
                </div>
              )}

              {data && data.length > 0 ? (
                <DataTable<ProjectData>
                  data={data}
                  columns={projectColumns}
                  tabs={tabs}
                />
              ) : (
                data && (
                  <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed shadow-sm py-16">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <h3 className="text-2xl font-bold tracking-tight">
                        You have no projects
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        You can start brainstorming a new project now.
                      </p>
                      <a href="/projects/new" className="mt-4">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                          Create Project
                        </button>
                      </a>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
