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
import { useGetProjectsQuery } from "@/services/projectsApi"
import { IntegrationSelector } from "@/components/integration-selector"
import { ConnectedIntegrationsSheet } from "@/components/connected-integrations"
import { JiraImportDialog } from "@/components/jira-import-dialog"
import { useAppSelector } from "@/lib/redux/hooks"
import { useState } from "react"

export default function Page() {
  const { data, isLoading, isError, error } = useGetProjectsQuery()
  const user = useAppSelector((state) => state.auth.user)
  const [jiraImportOpen, setJiraImportOpen] = useState(false)

  const hasConnectedIntegrations = user?.integrations?.jira?.connected || false

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

              {data && data.length > 0 ? (
                <DataTable<ProjectData>
                  data={data}
                  columns={projectColumns}
                  tabs={tabs}
                />
              ) : (
                data && (
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
                        <IntegrationSelector />
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
        onImport={(projectKeys) => {
          console.log("Importing projects:", projectKeys)
          // TODO: Call API to import projects
        }}
      />
    </SidebarProvider>
  )
}
