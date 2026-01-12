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
import { SpinnerEmpty } from "@/components/spinner-empty"
import { projectColumns, type ProjectData } from "./columns"
import { Badge } from "@/components/ui/badge"
import { ConnectedIntegrationsSheet } from "@/components/connected-integrations"
import { JiraImportDialog } from "@/components/jira-import-dialog"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { useEffect, useState } from "react"
import { fetchProjects } from "@/lib/redux/slices/projectSlice"

export default function Page() {
  const dispatch = useAppDispatch()
  const { items: data, loading: isLoading, error } = useAppSelector((state) => state.projects) // Assuming state.projects is bound in store
  const user = useAppSelector((state) => state.auth.user)
  const [jiraImportOpen, setJiraImportOpen] = useState(false)

  // Fetch projects on mount
  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const hasConnectedIntegrations = user?.integrations?.jira?.connected || false

  const tabs = [
    { value: "outline", label: "Outline" },
    { value: "past-performance", label: "Past Performance", badge: 3 },
    { value: "key-personnel", label: "Key Personnel", badge: 2 },
    { value: "focus-documents", label: "Focus Documents" },
  ]

  // Transform Redux Project[] to DataTable expected format
  const transformedData = data?.map(project => ({
    id: project.project_id,
    header: project.project_title,
    status: project.status || "Not Started",
    // Default values for fields not yet in backend model but required by UI columns
    type: "Focus Documents",
    target: "2000",
    limit: "5000",
    reviewer: "Assign reviewer"
  })) || []

  const isError = !!error;

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
        <div className="flex flex-1 flex-col gap-4 px-2 py-4">
          <div className="mx-auto w-full max-w-6xl flex flex-1 flex-col gap-2">
            <div className="flex flex-1 flex-col gap-4 md:gap-6">
              {isLoading && <SpinnerEmpty />}

              {isError && (
                <div className="flex items-center justify-center py-8">
                  <div className="text-destructive">
                    Error loading projects: {error?.toString()}
                  </div>
                </div>
              )}

              {transformedData.length > 0 ? (
                <DataTable<any>
                  data={transformedData}
                  columns={projectColumns}
                  tabs={tabs}
                />
              ) : (
                // Only show empty state if not loading and no data
                !isLoading && !isError && (
                  <div className="flex flex-1 flex-col items-center justify-center">
                    <div className="flex flex-col items-center gap-1 text-center">




                      <h3 className="text-base font-medium tracking-tight">
                        Start planning your projects
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Bring existing work or start fresh. huzlr helps you think, plan,execute, moitor and predict outcomes.
                      </p>

                      <div className="mt-4 flex items-center gap-4">
                        <Link href="/projects/new">
                          <Button className="gap-2 rounded-full cursor-pointer">
                            <Plus className="h-4 w-4" />
                            Start from Scratch
                          </Button>
                        </Link>
                        <ConnectedIntegrationsSheet
                          onImportClick={(integration) => {
                            if (integration === "jira") {
                              setJiraImportOpen(true)
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Jira Import Dialog */}
      <JiraImportDialog
        open={jiraImportOpen}
        onOpenChange={setJiraImportOpen}
      />
    </SidebarProvider>
  )
}
