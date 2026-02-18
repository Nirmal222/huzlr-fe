import { Extension } from "@tiptap/core"
import Suggestion, { SuggestionProps, SuggestionKeyDownProps } from "@tiptap/suggestion"
import { ReactRenderer } from "@tiptap/react"
import { PluginKey } from "@tiptap/pm/state"
import { SlashCommandList } from "../slash-command-list"

export const SlashCommand = Extension.create({
    name: "slashCommand",

    addOptions() {
        return {
            suggestion: {
                char: "/",
                command: ({ editor, range, props }: any) => {
                    props.command({ editor, range })
                },
            },
        }
    },

    addProseMirrorPlugins() {
        return [
            Suggestion({
                editor: this.editor,
                ...this.options.suggestion,
            }),
        ]
    },
})

export const getSuggestionItems = ({ query }: { query: string }) => {
    return [
        {
            title: "Text",
            description: "Just start typing with plain text.",
            searchTerms: ["p", "paragraph"],
            icon: "Text",
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").run()
            },
        },
        {
            title: "Heading 1",
            description: "Big section heading.",
            searchTerms: ["title", "big", "large"],
            icon: "Heading1",
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run()
            },
        },
        {
            title: "Heading 2",
            description: "Medium section heading.",
            searchTerms: ["subtitle", "medium"],
            icon: "Heading2",
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run()
            },
        },
        {
            title: "Heading 3",
            description: "Small section heading.",
            searchTerms: ["subtitle", "small"],
            icon: "Heading3",
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run()
            },
        },
        {
            title: "Bullet List",
            description: "Create a simple bulleted list.",
            searchTerms: ["unordered", "point"],
            icon: "List",
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).toggleBulletList().run()
            },
        },
        {
            title: "Numbered List",
            description: "Create a list with numbering.",
            searchTerms: ["ordered"],
            icon: "ListOrdered",
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).toggleOrderedList().run()
            },
        },
        {
            title: "Checklist",
            description: "Track tasks with a todo list.",
            searchTerms: ["todo", "task", "list", "check", "checkbox"],
            icon: "CheckSquare",
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).toggleTaskList().run()
            },
        },
        {
            title: "Insert media",
            description: "Embed an image from a URL.",
            searchTerms: ["photo", "picture", "embed"],
            icon: "Image",
            command: ({ editor, range }: any) => {
                const url = window.prompt("Enter image URL")
                if (url) {
                    editor.chain().focus().deleteRange(range).setImage({ src: url }).run()
                }
            },
        },
        {
            title: "Insert gif",
            description: "Add a moving image.",
            searchTerms: ["gif", "animate"],
            icon: "Film",
            command: ({ editor, range }: any) => {
                // Placeholder - ideally opens a Giphy picker
                editor.chain().focus().deleteRange(range).insertContent("TODO: Insert GIF Picker").run()
            },
        },
        {
            title: "Attach files",
            description: "Upload a file to your project.",
            searchTerms: ["upload", "file", "attachment"],
            icon: "Paperclip",
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).insertContent("TODO: File Upload").run()
            },
        },
        {
            title: "Quote",
            description: "Capture a quote.",
            searchTerms: ["blockquote"],
            icon: "Quote",
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setBlockquote().run()
            },
        },
        {
            title: "Code block",
            description: "Capture a code snippet.",
            searchTerms: ["codeblock"],
            icon: "Code",
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setCodeBlock().run()
            },
        },
        {
            title: "Diagram",
            description: "Insert a Mermaid diagram.",
            searchTerms: ["mermaid", "flowchart"],
            icon: "Workflow",
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setCodeBlock({ language: 'mermaid' }).run()
            },
        },
        {
            title: "Collapsible section",
            description: "Toggle visibility of content.",
            searchTerms: ["details", "summary", "toggle"],
            icon: "ChevronDown",
            command: ({ editor, range }: any) => {
                // Placeholder or install extension-details
                editor.chain().focus().deleteRange(range).insertContent("TODO: Collapsible Section").run()
            },
        },
        {
            title: "Divider",
            description: "Visually divide blocks.",
            searchTerms: ["line", "hr"],
            icon: "Minus",
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setHorizontalRule().run()
            },
        }
    ].filter((item) => {
        if (typeof query === "string" && query.length > 0) {
            const search = query.toLowerCase()
            return (
                item.title.toLowerCase().includes(search) ||
                item.description.toLowerCase().includes(search) ||
                (item.searchTerms && item.searchTerms.some((term: string) => term.includes(search)))
            )
        }
        return true
    })
}

export const renderItems = () => {
    let component: ReactRenderer | null = null

    return {
        onStart: (props: SuggestionProps) => {
            component = new ReactRenderer(SlashCommandList, {
                props,
                editor: props.editor,
            })
        },

        onUpdate: (props: SuggestionProps) => {
            component?.updateProps(props)
        },

        onKeyDown: (props: SuggestionKeyDownProps) => {
            if (props.event.key === "Escape") {
                return (component?.ref as any)?.onKeyDown(props) || false
            }

            return (component?.ref as any)?.onKeyDown(props) || false
        },

        onExit: () => {
            component?.destroy()
        },
    }
}
