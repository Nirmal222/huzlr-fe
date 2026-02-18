"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import Image from "@tiptap/extension-image"
import { useEffect } from "react"
import { SlashCommand, getSuggestionItems, renderItems } from "./extensions/slash-command"

interface TiptapEditorProps {
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    className?: string
}

export function TiptapEditor({
    value = "",
    onChange,
    placeholder = "Write something...",
    className,
}: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Image,
            SlashCommand.configure({
                suggestion: {
                    items: getSuggestionItems,
                    render: renderItems,
                },
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: `prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[150px] ${className}`,
            },
        },
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML())
        },
        immediatelyRender: false,
    })

    // Update content if value changes externally
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value)
        }
    }, [value, editor])

    return <EditorContent editor={editor} />
}
