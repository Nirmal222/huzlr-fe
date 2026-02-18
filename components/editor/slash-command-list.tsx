import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from "react"
import { Editor, Range } from "@tiptap/core"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover"
import {
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    MessageSquareQuote,
    Code,
    CheckSquare,
    Text,
    Minus,
    Image,
    Film,
    Paperclip,
    Workflow,
    ChevronDown,
    LucideIcon
} from "lucide-react"

interface CommandItemProps {
    title: string
    description: string
    icon: string
    command: ({ editor, range }: { editor: Editor; range: Range }) => void
}

interface SlashCommandListProps {
    items: CommandItemProps[]
    command: (item: CommandItemProps) => void
    editor: Editor
    range: Range
    clientRect?: (() => DOMRect | null) | null
}

const icons: Record<string, LucideIcon> = {
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote: MessageSquareQuote,
    Code,
    CheckSquare,
    Text,
    Minus,
    Image,
    Film,
    Paperclip,
    Workflow,
    ChevronDown
}

export const SlashCommandList = forwardRef((props: SlashCommandListProps, ref) => {
    const { items, command, editor, clientRect } = props
    const [selectedIndex, setSelectedIndex] = useState(0)
    const interactionSource = React.useRef<"keyboard" | "mouse">("keyboard")

    // Virtual element for Popover positioning
    const [virtualElement, setVirtualElement] = useState<any>(null)

    useEffect(() => {
        if (clientRect) {
            const getBoundingClientRect = clientRect
            setVirtualElement({
                getBoundingClientRect,
            })
        }
    }, [clientRect])

    const selectItem = useCallback(
        (index: number) => {
            const item = items[index]
            if (item) {
                command(item)
            }
        },
        [command, items]
    )

    useEffect(() => {
        setSelectedIndex(0)
    }, [items])

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }: { event: KeyboardEvent }) => {
            if (event.key === "ArrowUp") {
                interactionSource.current = "keyboard"
                setSelectedIndex((selectedIndex + items.length - 1) % items.length)
                return true
            }

            if (event.key === "ArrowDown") {
                interactionSource.current = "keyboard"
                setSelectedIndex((selectedIndex + 1) % items.length)
                return true
            }

            if (event.key === "Enter") {
                selectItem(selectedIndex)
                return true
            }

            return false
        },
    }))

    return (
        <Popover open={true} modal={false}>
            <PopoverAnchor virtualRef={{ current: virtualElement }} />
            <PopoverContent
                className="p-0 w-80 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
                side="bottom"
                align="start"
                sideOffset={8}
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => e.preventDefault()}
                onWheel={(e) => e.stopPropagation()}
            >
                <Command className="border-none shadow-none">
                    {/* Hidden input to keep command working but we use Tiptap for actual typing */}
                    <CommandList
                        className="max-h-[300px] overflow-y-auto p-1 overscroll-y-contain"
                        data-scroll-lock-scrollable
                    >
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            {items.map((item, index) => {
                                const Icon = icons[item.icon as keyof typeof icons] || Text
                                return (
                                    <CommandItem
                                        key={index}
                                        value={item.title}
                                        onSelect={() => selectItem(index)}
                                        className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground ${index === selectedIndex ? "bg-accent text-accent-foreground" : ""}`}
                                        ref={index === selectedIndex && interactionSource.current === "keyboard" ? (node) => {
                                            if (node) {
                                                node.scrollIntoView({ behavior: "smooth", block: "nearest" })
                                            }
                                        } : null}
                                        onMouseEnter={() => {
                                            interactionSource.current = "mouse"
                                            setSelectedIndex(index)
                                        }}
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                                            <Icon className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium leading-none">{item.title}</span>
                                            <span className="text-xs text-muted-foreground pt-1">{item.description}</span>
                                        </div>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
})

SlashCommandList.displayName = "SlashCommandList"
