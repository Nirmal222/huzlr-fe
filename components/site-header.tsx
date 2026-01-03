import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeSwitcher } from "@/components/theme-switcher"

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"

interface SiteHeaderProps {
  title?: string
  children?: React.ReactNode
}

export function SiteHeader({ title, children }: SiteHeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <DynamicBreadcrumb />
        <div className="ml-auto flex items-center gap-2">
          {children}
          <AnimatedThemeToggler className="h-8 w-8 rounded-full border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-1.5 flex items-center justify-center" />
        </div>
      </div>
    </header>
  )
}
