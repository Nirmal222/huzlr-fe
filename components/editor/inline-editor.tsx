"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import { Extension } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import { useEffect } from "react"

// Prevent Enter key from creating new lines — keeps the field single-line
const PreventNewLine = Extension.create({
    name: "preventNewLine",
    addKeyboardShortcuts() {
        return {
            Enter: () => true, // consume the event, do nothing
        }
    },
})

interface InlineEditorProps {
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    className?: string
    onEnter?: () => void // optional: trigger submit on Enter
}

export function InlineEditor({
    value = "",
    onChange,
    placeholder = "Type here...",
    className = "",
    onEnter,
}: InlineEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // Disable block-level nodes we don't need in an inline field
                heading: false,
                blockquote: false,
                codeBlock: false,
                bulletList: false,
                orderedList: false,
                listItem: false,
                horizontalRule: false,
            }),
            onEnter
                ? Extension.create({
                    name: "submitOnEnter",
                    addKeyboardShortcuts() {
                        return {
                            Enter: () => {
                                onEnter()
                                return true
                            },
                        }
                    },
                })
                : PreventNewLine,
        ],
        content: value,
        editorProps: {
            attributes: {
                class: [
                    "focus:outline-none w-full",
                    // Strip out any prose min-height; let parent control sizing
                    className,
                ].join(" "),
            },
        },
        onUpdate: ({ editor }) => {
            // getText() gives plain text; getHTML() wraps in <p> tags
            // We return plain text for title/summary fields
            onChange?.(editor.getText())
        },
        immediatelyRender: false,
    })

    // Sync external value changes into the editor
    useEffect(() => {
        if (editor && !editor.isFocused && value !== editor.getText()) {
            editor.commands.setContent(value)
        }
    }, [value, editor])

    return (
        <div className={`relative ${!value && !editor?.isFocused ? "before:pointer-events-none" : ""}`}>
            {/* Placeholder rendered when editor is empty and not focused */}
            {editor && !editor.getText() && (
                <span
                    className="absolute top-0 left-0 pointer-events-none select-none text-muted-foreground/40"
                    aria-hidden="true"
                >
                    {placeholder}
                </span>
            )}
            <EditorContent editor={editor} />
        </div>
    )
}
