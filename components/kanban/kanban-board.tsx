"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  LayoutGrid,
  LayoutList,
  Table,
  Plus,
  X,
  ChevronDown,
  Settings2,
  Filter,
  Search,
  MoreHorizontal,
  Settings,
  Paperclip,
  MessageSquare,
} from "lucide-react"

export interface Task {
  id: string
  title: string
  description?: string
  status: string
  priority: "low" | "medium" | "high"
  progress?: number
  assignee?: {
    name: string
    avatar: string
  }
  creator?: {
    name: string
    avatar: string
  }
  dueDate?: string
  project?: string
  tags?: string[]
  attachments?: number
  comments?: number
}

export interface Column {
  id: string
  title: string
  tasks: Task[]
}

interface KanbanBoardProps {
  columns: Column[]
  onTaskMove?: (taskId: string, fromColumn: string, toColumn: string) => void
  onTaskDelete?: (taskId: string) => void
  onTaskAdd?: (columnId: string, task: Task) => void
  onColumnAdd?: (columnTitle: string) => void
  onColumnDelete?: (columnId: string) => void
}

type FieldVisibility = {
  description: boolean
  priority: boolean
  assignee: boolean
  creator: boolean
  dueDate: boolean
  tags: boolean
  project: boolean
  progress: boolean
  attachments: boolean
  comments: boolean
}

type Filters = {
  projects: string[]
  assignees: string[]
  creators: string[]
  priorities: string[]
  dateRange: { start?: string; end?: string }
  search: string
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-500/10 text-red-600 dark:text-red-400"
    case "medium":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400"
    case "low":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
    default:
      return "bg-primary/10 text-primary"
  }
}

const TaskCard: React.FC<{
  task: Task
  columnId: string
  onDragStart: (e: React.DragEvent, task: Task, columnId: string) => void
  onDelete: (taskId: string) => void
  fieldVisibility: FieldVisibility
}> = ({ task, columnId, onDragStart, onDelete, fieldVisibility }) => (
  <Card
    draggable
    onDragStart={(e) => onDragStart(e, task, columnId)}
    className="group cursor-grab active:cursor-grabbing bg-card p-3 rounded-lg border border-border/40 hover:border-primary/20 transition-all duration-200 space-y-3"
  >
    {/* Title and Delete Button */}
    <div className="flex items-start justify-between gap-2">
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-foreground leading-snug">{task.title}</h4>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
        onClick={() => onDelete(task.id)}
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </div>

    {/* Description */}
    {fieldVisibility.description && task.description && (
      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{task.description}</p>
    )}

    {/* Progress Bar */}
    {fieldVisibility.progress && task.progress !== undefined && (
      <div className="space-y-1 pt-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{task.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${task.progress}%` }} />
        </div>
      </div>
    )}

    {/* Bottom Info Bar */}
    <div className="flex items-end justify-between gap-2 pt-2 border-t border-border/20">
      <div className="flex items-center gap-2">
        {fieldVisibility.priority && (
          <Badge
            variant="secondary"
            className={`${getPriorityColor(task.priority)} text-xs font-medium px-2 py-0.5`}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
        )}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {fieldVisibility.attachments && task.attachments !== undefined && (
            <div className="flex items-center gap-1">
              <Paperclip className="h-3 w-3" />
              <span>{task.attachments}</span>
            </div>
          )}
          {fieldVisibility.comments && task.comments !== undefined && (
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              <span>{task.comments}</span>
            </div>
          )}
        </div>
      </div>
      {fieldVisibility.assignee && task.assignee && (
        <Avatar className="h-6 w-6">
          <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
          <AvatarFallback className="text-xs font-semibold text-primary-foreground bg-primary">
            {task.assignee.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  </Card>
)

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns,
  onTaskMove,
  onTaskDelete,
  onTaskAdd,
  onColumnAdd,
  onColumnDelete,
}) => {
  const [view, setView] = useState<"board" | "list" | "table">("board")
  const [draggedTask, setDraggedTask] = useState<{ task: Task; fromColumn: string } | null>(null)
  const [fieldVisibility, setFieldVisibility] = useState<FieldVisibility>({
    description: true,
    priority: true,
    assignee: true,
    creator: false,
    dueDate: true,
    tags: false,
    project: false,
    progress: true,
    attachments: true,
    comments: true,
  })
  const [filters, setFilters] = useState<Filters>({
    projects: [],
    assignees: [],
    creators: [],
    priorities: [],
    dateRange: {},
    search: "",
  })
  const [newColumnTitle, setNewColumnTitle] = useState("")
  const [showNewColumnInput, setShowNewColumnInput] = useState(false)

  const allProjects = Array.from(
    new Set(
      columns
        .flatMap((col) => col.tasks)
        .map((task) => task.project)
        .filter((project): project is string => Boolean(project)),
    ),
  )
  const allAssignees = Array.from(
    new Set(
      columns
        .flatMap((col) => col.tasks)
        .map((task) => task.assignee?.name)
        .filter((name): name is string => Boolean(name)),
    ),
  )
  const allCreators = Array.from(
    new Set(
      columns
        .flatMap((col) => col.tasks)
        .map((task) => task.creator?.name)
        .filter((name): name is string => Boolean(name)),
    ),
  )

  // Get all unique assignees for the header
  const uniqueAssignees = Array.from(
    new Map(
      columns
        .flatMap((col) => col.tasks)
        .map((task) => task.assignee)
        .filter(
          (assignee): assignee is { name: string; avatar: string } => !!assignee,
        )
        .map((a) => [a.name, a]),
    ).values(),
  ).slice(0, 4)

  const handleDragStart = useCallback((e: React.DragEvent, task: Task, columnId: string) => {
    setDraggedTask({ task, fromColumn: columnId })
    e.dataTransfer.effectAllowed = "move"
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent, toColumnId: string) => {
      e.preventDefault()
      if (draggedTask && draggedTask.fromColumn !== toColumnId) {
        onTaskMove?.(draggedTask.task.id, draggedTask.fromColumn, toColumnId)
      }
      setDraggedTask(null)
    },
    [draggedTask, onTaskMove],
  )

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      onColumnAdd?.(newColumnTitle)
      setNewColumnTitle("")
      setShowNewColumnInput(false)
    }
  }

  const filteredColumns = columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description?.toLowerCase().includes(filters.search.toLowerCase())

      if (!matchesSearch) return false
      if (filters.projects.length > 0 && !filters.projects.includes(task.project || "")) return false
      if (filters.assignees.length > 0 && !filters.assignees.includes(task.assignee?.name || "")) return false
      if (filters.creators.length > 0 && !filters.creators.includes(task.creator?.name || "")) return false
      if (filters.priorities.length > 0 && !filters.priorities.includes(task.priority)) return false
      if (filters.dateRange.start && task.dueDate && task.dueDate < filters.dateRange.start) return false
      if (filters.dateRange.end && task.dueDate && task.dueDate > filters.dateRange.end) return false
      return true
    }),
  }))

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (typeof value === "string") {
      return value.length > 0
    }
    if (Array.isArray(value)) {
      return value.length > 0
    }
    if (key === "dateRange") {
      return !!value.start || !!value.end
    }
    return false
  })

  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Header: Title and Assignees */}
      <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold text-foreground">Realese</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                {uniqueAssignees.map((assignee) => (
                  <Avatar key={assignee!.name} className="h-8 w-8 border border-border/40">
                    <AvatarImage src={assignee!.avatar} alt={assignee!.name} />
                    <AvatarFallback className="text-xs font-semibold text-primary-foreground bg-primary">
                      {assignee!.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="text-xs gap-1 h-8 ml-2" onClick={() => {}}>
                <Plus className="h-3.5 w-3.5" />+{Math.max(0, allAssignees.length - 4)} Add Assignee
              </Button>
            </div>
            <Button className="gap-2 text-sm h-8 font-medium">
              <Plus className="h-4 w-4" />
              Add Board
            </Button>
          </div>
        </div>
      </div>

      {/* Control Bar: View Toggle, Search, Filters, Fields */}
      <div className="border-b border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center gap-3 flex-wrap">
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-muted/40 rounded-lg p-1 border border-border/30">
            <Button
              variant={view === "board" ? "default" : "ghost"}
              size="icon"
              className="h-7 w-7 rounded text-xs"
              onClick={() => setView("board")}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="icon"
              className="h-7 w-7 rounded text-xs"
              onClick={() => setView("list")}
            >
              <LayoutList className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={view === "table" ? "default" : "ghost"}
              size="icon"
              className="h-7 w-7 rounded text-xs"
              onClick={() => setView("table")}
            >
              <Table className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="h-8 pl-8 text-xs bg-background/50 border-border/30 rounded-md"
            />
          </div>

          <div className="flex-1" />

          {/* Filters Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`gap-2 text-xs h-8 ${hasActiveFilters ? "border-primary/50 bg-primary/5" : ""}`}
              >
                <Filter className="h-3.5 w-3.5" />
                Filters {hasActiveFilters && <span className="text-primary font-bold">●</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <div className="px-2 py-1.5 text-xs font-semibold text-foreground">Filters</div>
              <DropdownMenuSeparator />

              {/* Project Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="px-2 py-1.5 text-xs font-medium text-foreground/70 hover:bg-muted/50 rounded cursor-pointer flex items-center justify-between">
                    Project {filters.projects.length > 0 && `(${filters.projects.length})`}
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-44">
                  {allProjects.length === 0 ? (
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">No projects</div>
                  ) : (
                    allProjects.map((project) => (
                      <DropdownMenuCheckboxItem
                        key={project}
                        checked={filters.projects.includes(project)}
                        onCheckedChange={(checked) => {
                          setFilters((prev) => ({
                            ...prev,
                            projects: checked
                              ? [...prev.projects, project]
                              : prev.projects.filter((p) => p !== project),
                          }))
                        }}
                      >
                        {project}
                      </DropdownMenuCheckboxItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Assignee Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="px-2 py-1.5 text-xs font-medium text-foreground/70 hover:bg-muted/50 rounded cursor-pointer flex items-center justify-between">
                    Assignee {filters.assignees.length > 0 && `(${filters.assignees.length})`}
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-44">
                  {allAssignees.length === 0 ? (
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">No assignees</div>
                  ) : (
                    allAssignees.map((assignee) => (
                      <DropdownMenuCheckboxItem
                        key={assignee}
                        checked={filters.assignees.includes(assignee)}
                        onCheckedChange={(checked) => {
                          setFilters((prev) => ({
                            ...prev,
                            assignees: checked
                              ? [...prev.assignees, assignee]
                              : prev.assignees.filter((a) => a !== assignee),
                          }))
                        }}
                      >
                        {assignee}
                      </DropdownMenuCheckboxItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Creator Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="px-2 py-1.5 text-xs font-medium text-foreground/70 hover:bg-muted/50 rounded cursor-pointer flex items-center justify-between">
                    Creator {filters.creators.length > 0 && `(${filters.creators.length})`}
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-44">
                  {allCreators.length === 0 ? (
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">No creators</div>
                  ) : (
                    allCreators.map((creator) => (
                      <DropdownMenuCheckboxItem
                        key={creator}
                        checked={filters.creators.includes(creator)}
                        onCheckedChange={(checked) => {
                          setFilters((prev) => ({
                            ...prev,
                            creators: checked
                              ? [...prev.creators, creator]
                              : prev.creators.filter((c) => c !== creator),
                          }))
                        }}
                      >
                        {creator}
                      </DropdownMenuCheckboxItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Priority Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="px-2 py-1.5 text-xs font-medium text-foreground/70 hover:bg-muted/50 rounded cursor-pointer flex items-center justify-between">
                    Priority {filters.priorities.length > 0 && `(${filters.priorities.length})`}
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-44">
                  {["low", "medium", "high"].map((priority) => (
                    <DropdownMenuCheckboxItem
                      key={priority}
                      checked={filters.priorities.includes(priority)}
                      onCheckedChange={(checked) => {
                        setFilters((prev) => ({
                          ...prev,
                          priorities: checked
                            ? [...prev.priorities, priority]
                            : prev.priorities.filter((p) => p !== priority),
                        }))
                      }}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Date Range Filter */}
              <DropdownMenuSeparator />
              <div className="px-2 py-2 space-y-2">
                <Input
                  type="date"
                  value={filters.dateRange.start || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, dateRange: { ...prev.dateRange, start: e.target.value } }))
                  }
                  className="h-7 text-xs"
                />
                <Input
                  type="date"
                  value={filters.dateRange.end || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, dateRange: { ...prev.dateRange, end: e.target.value } }))
                  }
                  className="h-7 text-xs"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Fields Visibility Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8 border-border/30 bg-transparent">
                <Settings2 className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5 text-xs font-semibold text-foreground">Visible Fields</div>
              <DropdownMenuSeparator />
              {Object.entries(fieldVisibility).map(([key, value]) => (
                <DropdownMenuCheckboxItem
                  key={key}
                  checked={value}
                  onCheckedChange={(checked) =>
                    setFieldVisibility((prev) => ({
                      ...prev,
                      [key]: checked,
                    }))
                  }
                >
                  <span className="text-xs">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                  </span>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Board Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {view === "board" && (
          <div className="flex-1 overflow-x-auto overflow-y-hidden">
            <div className="p-4 h-full">
              <div className="flex gap-4 h-full min-w-max">
                {filteredColumns.map((column) => (
                  <div key={column.id} className="flex flex-col w-80 flex-shrink-0 h-full">
                    {/* Column Header */}
                    <div className="mb-3 flex items-center justify-between px-1">
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-foreground text-sm">{column.title}</h2>
                        <Badge variant="secondary" className="text-xs font-medium">
                          {column.tasks.length}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                          <Settings className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Tasks Container - Scrollable */}
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, column.id)}
                      className="flex-1 bg-muted/20 rounded-lg p-3 border border-border/30 overflow-y-auto space-y-2"
                    >
                      {column.tasks.length === 0 ? (
                        <div className="flex items-center justify-center h-32 text-muted-foreground">
                          <p className="text-xs">No tasks</p>
                        </div>
                      ) : (
                        column.tasks.map((task) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            columnId={column.id}
                            onDragStart={handleDragStart}
                            onDelete={onTaskDelete || (() => {})}
                            fieldVisibility={fieldVisibility}
                          />
                        ))
                      )}
                    </div>

                    {/* Add Task Button */}
                    <Button
                      variant="ghost"
                      className="mt-3 w-full gap-2 text-xs h-8 text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        const newTask: Task = {
                          id: Date.now().toString(),
                          title: "New Task",
                          status: column.id,
                          priority: "medium",
                          progress: 0,
                        }
                        onTaskAdd?.(column.id, newTask)
                      }}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Task
                    </Button>
                  </div>
                ))}

                {/* Add Column Button */}
                <div className="w-80 flex-shrink-0">
                  {!showNewColumnInput ? (
                    <Button
                      variant="ghost"
                      className="w-full h-14 text-muted-foreground border border-border/30 gap-2 text-xs"
                      onClick={() => setShowNewColumnInput(true)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Column
                    </Button>
                  ) : (
                    <Card className="p-3 border border-border/40 bg-card">
                      <Input
                        placeholder="Column name..."
                        value={newColumnTitle}
                        onChange={(e) => setNewColumnTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddColumn()
                          if (e.key === "Escape") setShowNewColumnInput(false)
                        }}
                        className="h-7 text-xs mb-2"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleAddColumn} className="flex-1 h-6 text-xs">
                          Add
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowNewColumnInput(false)}
                          className="flex-1 h-6 text-xs"
                        >
                          Cancel
                        </Button>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === "list" && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {filteredColumns.map((column) => (
                <div key={column.id}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                      {column.title}
                      <Badge variant="secondary" className="text-xs">
                        {column.tasks.length}
                      </Badge>
                    </h3>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                        <Settings className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {column.tasks.map((task) => (
                      <Card
                        key={task.id}
                        className="border border-border/30 bg-card/60 p-3 hover:shadow-md hover:border-border/50 transition-all duration-200 group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-foreground">{task.title}</h4>
                            {fieldVisibility.description && task.description && (
                              <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                            )}
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {fieldVisibility.priority && (
                              <Badge
                                variant="secondary"
                                className={`${getPriorityColor(task.priority)} text-xs font-medium px-2`}
                              >
                                {task.priority.charAt(0).toUpperCase()}
                              </Badge>
                            )}

                            {fieldVisibility.assignee && task.assignee && (
                              <Avatar className="h-6 w-6 flex-shrink-0">
                                <AvatarFallback className="text-xs font-semibold text-primary-foreground bg-primary">
                                  {task.assignee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            )}

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => onTaskDelete?.(task.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "table" && (
          <div className="flex-1 overflow-auto p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left py-2 px-3 font-medium text-foreground">Task</th>
                  <th className="text-left py-2 px-3 font-medium text-foreground">Status</th>
                  <th className="text-left py-2 px-3 font-medium text-foreground">Priority</th>
                  <th className="text-left py-2 px-3 font-medium text-foreground">Assignee</th>
                  <th className="text-left py-2 px-3 font-medium text-foreground">Progress</th>
                </tr>
              </thead>
              <tbody>
                {filteredColumns.flatMap((column) =>
                  column.tasks.map((task) => (
                    <tr key={task.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                      <td className="py-2 px-3 text-foreground">{task.title}</td>
                      <td className="py-2 px-3 text-muted-foreground">{column.title}</td>
                      <td className="py-2 px-3">
                        <Badge className={getPriorityColor(task.priority)} variant="secondary">
                          {task.priority}
                        </Badge>
                      </td>
                      <td className="py-2 px-3">
                        {task.assignee ? (
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs font-semibold text-primary-foreground bg-primary">
                              {task.assignee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        {task.progress !== undefined && (
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-muted rounded-full h-1.5">
                              <div className="h-full bg-primary" style={{ width: `${task.progress}%` }} />
                            </div>
                            <span className="text-xs text-muted-foreground">{task.progress}%</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
