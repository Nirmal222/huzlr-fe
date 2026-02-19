"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Circle, HelpCircle, AlertCircle, ArrowUpCircle, XCircle, CalendarIcon, User as UserIcon, Tag, Plus } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export interface SelectorProps {
    value: string | string[] | undefined // Changed to support multi-select and dates
    onChange: (value: any) => void
    className?: string
}

// ----------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------

export const STATUSES = [
    { value: "Backlog", label: "Backlog", icon: HelpCircle },
    { value: "Planning", label: "Planning", icon: Circle },
    { value: "In Progress", label: "In Progress", icon: ArrowUpCircle },
    { value: "Paused", label: "Paused", icon: XCircle },
    { value: "Done", label: "Done", icon: Check },
    { value: "Canceled", label: "Canceled", icon: XCircle },
]

export const PRIORITIES = [
    { value: "Urgent", label: "Urgent", icon: AlertCircle },
    { value: "High", label: "High", icon: ArrowUpCircle },
    { value: "Medium", label: "Medium", icon: Circle },
    { value: "Low", label: "Low", icon: ArrowUpCircle },
    { value: "None", label: "No priority", icon: HelpCircle },
]

// Mock Users
export const USERS = [
    { id: "1", name: "Alicia Koch", username: "alicia", avatar: "/avatars/01.png" },
    { id: "2", name: "Acme Corp", username: "acme", avatar: "/avatars/02.png" },
    { id: "3", name: "Bruno", username: "bruno", avatar: "/avatars/03.png" },
]

export const LABELS = [
    { value: "Bug", label: "Bug", color: "bg-red-500" },
    { value: "Feature", label: "Feature", color: "bg-blue-500" },
    { value: "Enhancement", label: "Enhancement", color: "bg-green-500" },
    { value: "Documentation", label: "Documentation", color: "bg-yellow-500" },
    { value: "Design", label: "Design", color: "bg-purple-500" },
]

// ----------------------------------------------------------------------
// Status Selector
// ----------------------------------------------------------------------

export function ProjectStatusSelector({ value, onChange, className }: SelectorProps) {
    const [open, setOpen] = React.useState(false)
    const selectedStatus = STATUSES.find((s) => s.value === value) || STATUSES.find(s => s.value === "Backlog")!

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "h-7 px-2 text-xs font-medium rounded-md text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 gap-1.5 border border-transparent hover:border-border/40 transition-all",
                        className
                    )}
                >
                    <selectedStatus.icon className={cn("w-3.5 h-3.5", selectedStatus.value === "In Progress" ? "text-blue-500" : selectedStatus.value === "Done" ? "text-purple-500" : "text-muted-foreground")} />
                    <span>{selectedStatus.label}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-48" side="bottom" align="start">
                <Command>
                    <CommandInput placeholder="Change status..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {STATUSES.map((status) => (
                                <CommandItem
                                    key={status.value}
                                    value={status.value}
                                    onSelect={() => {
                                        onChange(status.value)
                                        setOpen(false)
                                    }}
                                >
                                    <status.icon className={cn("mr-2 h-4 w-4", status.value === value ? "opacity-100" : "opacity-40")} />
                                    <span>{status.label}</span>
                                    {value === status.value && <Check className="ml-auto h-4 w-4 opacity-100" />}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

// ----------------------------------------------------------------------
// Priority Selector
// ----------------------------------------------------------------------

export function ProjectPrioritySelector({ value, onChange, className }: SelectorProps) {
    const [open, setOpen] = React.useState(false)
    const selected = PRIORITIES.find((s) => s.value === value) || PRIORITIES.find(s => s.value === "None")!

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "h-7 px-2 text-xs font-medium rounded-md text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 gap-1.5 border border-transparent hover:border-border/40 transition-all",
                        className
                    )}
                >
                    <selected.icon className={cn("w-3.5 h-3.5", selected.value === "Urgent" ? "text-red-500" : selected.value === "High" ? "text-orange-500" : "text-muted-foreground")} />
                    <span>{selected.label}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-48" side="bottom" align="start">
                <Command>
                    <CommandInput placeholder="Change priority..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {PRIORITIES.map((priority) => (
                                <CommandItem
                                    key={priority.value}
                                    value={priority.value}
                                    onSelect={() => {
                                        onChange(priority.value)
                                        setOpen(false)
                                    }}
                                >
                                    <priority.icon className={cn("mr-2 h-4 w-4", priority.value === value ? "opacity-100" : "opacity-40")} />
                                    <span>{priority.label}</span>
                                    {value === priority.value && <Check className="ml-auto h-4 w-4 opacity-100" />}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

// ----------------------------------------------------------------------
// Member Selector (Single or Multi)
// ----------------------------------------------------------------------

interface MemberSelectorProps extends Omit<SelectorProps, 'value'> {
    value?: string | string[]
    multiple?: boolean
}

export function MemberSelector({ value, onChange, className, multiple = false }: MemberSelectorProps) {
    const [open, setOpen] = React.useState(false)

    // Helper to get user objects
    const selectedUsers = React.useMemo(() => {
        if (!value) return []
        const ids = Array.isArray(value) ? value : [value]
        return USERS.filter(u => ids.includes(u.id))
    }, [value])

    const handleSelect = (userId: string) => {
        if (multiple) {
            const current = Array.isArray(value) ? value : []
            const next = current.includes(userId)
                ? current.filter(id => id !== userId)
                : [...current, userId]
            onChange(next)
        } else {
            onChange(userId)
            setOpen(false)
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "h-7 px-2 text-xs font-medium rounded-md text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 gap-1.5 border border-transparent hover:border-border/40 transition-all",
                        className
                    )}
                >
                    {selectedUsers.length === 0 ? (
                        <>
                            <UserIcon className="w-3.5 h-3.5" />
                            <span>{multiple ? "Members" : "Lead"}</span>
                        </>
                    ) : (
                        <div className="flex items-center gap-1">
                            <div className="flex -space-x-1.5">
                                {selectedUsers.slice(0, 3).map(user => (
                                    <Avatar key={user.id} className="w-4 h-4 border border-background">
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback className="text-[8px]">{user.name[0]}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                            {selectedUsers.length > 3 && (
                                <span className="text-[10px] text-muted-foreground">+{selectedUsers.length - 3}</span>
                            )}
                            {!multiple && <span className="text-xs">{selectedUsers[0].name}</span>}
                        </div>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-56" side="bottom" align="start">
                <Command>
                    <CommandInput placeholder="Search team..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Team">
                            {USERS.map((user) => {
                                const isSelected = Array.isArray(value) ? value.includes(user.id) : value === user.id
                                return (
                                    <CommandItem
                                        key={user.id}
                                        value={user.name}
                                        onSelect={() => handleSelect(user.id)}
                                    >
                                        <Avatar className="w-6 h-6 mr-2">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{user.name}</span>
                                            <span className="text-xs text-muted-foreground">@{user.username}</span>
                                        </div>
                                        {isSelected && <Check className="ml-auto h-4 w-4 opacity-100" />}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

// ----------------------------------------------------------------------
// Date Selector
// ----------------------------------------------------------------------

export function DateSelector({ value, onChange, className }: SelectorProps) {
    const [open, setOpen] = React.useState(false)

    // Value is expected to be a date string (ISO) or undefined
    const date = value ? new Date(value as string) : undefined

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "h-7 px-2 text-xs font-medium rounded-md text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 gap-1.5 border border-transparent hover:border-border/40 transition-all",
                        className
                    )}
                >
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>{date ? format(date, "MMM d") : "Date"}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto" side="bottom" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                        onChange(d ? d.toISOString() : undefined)
                        setOpen(false)
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

// ----------------------------------------------------------------------
// Label Selector
// ----------------------------------------------------------------------

interface LabelSelectorProps extends Omit<SelectorProps, 'value'> {
    value?: string[]
}

export function LabelSelector({ value = [], onChange, className }: LabelSelectorProps) {
    const [open, setOpen] = React.useState(false)

    const handleSelect = (labelValue: string) => {
        const next = value.includes(labelValue)
            ? value.filter(v => v !== labelValue)
            : [...value, labelValue]
        onChange(next)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "h-7 px-2 text-xs font-medium rounded-md text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 gap-1.5 border border-transparent hover:border-border/40 transition-all",
                        className
                    )}
                >
                    <Tag className="w-3.5 h-3.5" />
                    {value.length === 0 ? (
                        <span>Labels</span>
                    ) : (
                        <div className="flex gap-1">
                            <span>{value.length} Labels</span>
                        </div>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-48" side="bottom" align="start">
                <Command>
                    <CommandInput placeholder="Search labels..." />
                    <CommandList>
                        <CommandEmpty>No labels found.</CommandEmpty>
                        <CommandGroup>
                            {LABELS.map((label) => {
                                const isSelected = value.includes(label.value)
                                return (
                                    <CommandItem
                                        key={label.value}
                                        value={label.value}
                                        onSelect={() => handleSelect(label.value)}
                                    >
                                        <div className={cn("w-2 h-2 rounded-full mr-2", label.color)} />
                                        <span>{label.label}</span>
                                        {isSelected && <Check className="ml-auto h-4 w-4 opacity-100" />}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
