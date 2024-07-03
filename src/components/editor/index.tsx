'use client'

import { cn } from '@/lib/utils'
import { HyperMultimediaKit } from '@docs.plus/extension-hypermultimedia'
import Blockquote from '@tiptap/extension-blockquote'
import Heading from '@tiptap/extension-heading'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, mergeAttributes, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FieldError } from 'react-hook-form'
import { FormMessage } from '../ui/form'
import { ImageResize } from './image-resize-component'
import { Toolbar } from './toolbar'

type TiptapProps =
  | {
      editable: true
      onChange: (value: string) => void
      error: FieldError | undefined
      content?: string
    }
  | {
      editable?: false
      content: string
    }

const Editor = (props: TiptapProps) => {
  const editor = useEditor({
    editable: props.editable ?? false,
    editorProps: {
      attributes: {
        // class:
        //   'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto max-h-[380px] min-h-[80px] w-full overflow-auto rounded-md rounded-tl-none rounded-tr-none bg-transparent text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        class:
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none',
      },
    },
    extensions: [
      StarterKit.configure({
        heading: false,
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4',
          },
        },
      }),
      Heading.extend({
        levels: [1, 2],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0]
          const classes: { [index: number]: string } = {
            1: 'h1',
            2: 'h2',
            3: 'h3',
            4: 'h4',
            5: 'h5',
            6: 'h6',
          }
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ]
        },
      }).configure({ levels: [1, 2, 3, 4, 5, 6] }),
      HyperMultimediaKit.configure({
        Audio: {
          // modal: audioModal,
          // inline: true,
        },
        Image: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      ImageResize,
      Blockquote.configure({
        HTMLAttributes: {
          class: 'mt-6 border-l-2 pl-6 italic',
        },
      }),
      Table.configure({
        // resizable: true,
        HTMLAttributes: {
          class: 'w-full',
        },
      }),
      TableRow.configure({
        // HTMLAttributes: {
        //   class: 'border-2',
        // },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border-x border-t py-4 px-2',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border py-4 px-2',
        },
      }),
    ],
    content: props?.content ? JSON.parse(props.content) : '',
    onUpdate({ editor }) {
      if (props.editable) {
        if (!editor.isEmpty) {
          props.onChange(JSON.stringify(editor.getJSON()))
        } else {
          props.onChange('')
        }
      }
    },
  })

  if (!editor) return null

  return (
    <div>
      {props?.editable ? (
        <>
          <div
            className={cn('rounded-md border border-input', {
              'border-destructive': props.error,
            })}
          >
            <Toolbar editor={editor} />
            <div className="px-3 py-2">
              <EditorContent editor={editor} />
            </div>
          </div>
          {props?.error && <FormMessage>{props.error.message}</FormMessage>}
        </>
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  )
}

export default Editor
