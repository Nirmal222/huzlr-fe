"use client"

import * as React from "react"
import { Check, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { updatePropertyPreference } from "@/lib/redux/slices/metaSlice"

interface DisplayPropertiesMenuProps {
    entityType?: string
}

export function DisplayPropertiesMenu({ entityType = "project" }: DisplayPropertiesMenuProps) {
    const dispatch = useAppDispatch()
    const properties = useAppSelector((state) => state.meta.propertyDefinitions[entityType] || [])
    const loading = useAppSelector((state) => state.meta.loading[entityType])

    // Sort properties alphabetically or by some order if needed
    // For now, keep registry order but maybe filter out purely internal ones if any
    const displayableProperties = React.useMemo(() => {
        return properties.filter(p => p.key !== 'project_title') // Title is always visible
    }, [properties])

    const handleToggle = (key: string, currentVisible: boolean) => {
        // Optimistic update handled by Redux thunk implicitly if successful, 
        // but for better UI response we might want local state too. 
        // However, the thunk updates the store so it should reflect immediately if fast enough.
        // Or we can rely on the re-render from store update.

        // "visible" property might be undefined which implies true.
        const newVisible = currentVisible === false ? true : false

        dispatch(updatePropertyPreference({
            entityType,
            key,
            visible: newVisible
        }))
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 h-8">
                    <SlidersHorizontal className="h-4 w-4" />
                    Display
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end">
                <Command>
                    <CommandInput placeholder="Search properties..." />
                    <CommandList>
                        <CommandEmpty>No property found.</CommandEmpty>
                        <CommandGroup className="p-2">
                            {displayableProperties.map((prop) => {
                                const isVisible = prop.visible !== false
                                return (
                                    <div key={prop.key} className="flex items-center space-x-2 py-1.5 px-2 hover:bg-muted/50 rounded-sm">
                                        <Checkbox
                                            id={`prop-${prop.key}`}
                                            checked={isVisible}
                                            onCheckedChange={() => handleToggle(prop.key, isVisible)}
                                        />
                                        <Label
                                            htmlFor={`prop-${prop.key}`}
                                            className="flex-1 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {prop.label}
                                        </Label>
                                    </div>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
