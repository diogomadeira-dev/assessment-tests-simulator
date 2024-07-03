import { delay } from '@/utils/delay'
import { type Editor } from '@tiptap/react'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  FileAudio,
  FileImage,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Table,
  TextQuote,
} from 'lucide-react'
import { useRef } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Separator } from '../ui/separator'
import { Toggle } from '../ui/toggle'

export async function getPosts(formData) {
  const response = await fetch(`http://localhost:3333/file-upload/single`, {
    method: 'POST',
    body: formData,
  })

  const posts = await response.json()
  return posts
}

export const Toolbar = ({ editor }: { editor: Editor }) => {
  const audioFileInputRef = useRef<HTMLInputElement | null>(null)
  const imageFileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file: File = e.target.files[0]
      const fileUploaded = await handleUpload(file)

      await delay(100)

      if (fileUploaded.fileType === 'audio') {
        editor.commands.setAudio({
          src: 'http://' + fileUploaded.image_url,
          controls: true,
        })
      }

      if (fileUploaded.fileType === 'image') {
        editor.commands.setImage({
          src: 'http://' + fileUploaded.image_url,
        })
      }
    }
  }

  // ! TODO: REPEATED

  const handleUpload = async (file: File) => {
    if (file) {
      const blob = new Blob([file], { type: file.type })

      const formData = new FormData()
      formData.append('image', blob, file.name)

      try {
        const data = await getPosts(formData)
        return data
      } catch (error) {
        console.log('🚀 ~ handleUpload ~ error:', error)
      }
    }
  }

  return (
    <div className="flex flex-row items-center gap-1 rounded-tl-md rounded-tr-md border-b border-input bg-transparent p-1">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('blockquote')}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <TextQuote className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-8 w-[1px]" />
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 3 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 4 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 4 }).run()
        }
      >
        <Heading4 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 5 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 5 }).run()
        }
      >
        <Heading5 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 6 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 6 }).run()
        }
      >
        <Heading6 className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-8 w-[1px]" />
      <Toggle
        size="sm"
        pressed={editor.isActive('left')}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('left').run()
        }
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('center')}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('center').run()
        }
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('right')}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('right').run()
        }
      >
        <AlignRight className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('justify')}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('justify').run()
        }
      >
        <AlignJustify className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-8 w-[1px]" />
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-8 w-[1px]" />
      <Toggle
        size="sm"
        pressed={editor.isActive('audio')}
        onPressedChange={() => audioFileInputRef.current?.click()}
      >
        <FileAudio className="h-4 w-4" />
      </Toggle>
      <input
        onChange={handleFileChange}
        multiple={false}
        ref={audioFileInputRef}
        type="file"
        accept="audio/*"
        hidden
      />
      <Toggle
        size="sm"
        pressed={editor.isActive('image')}
        onPressedChange={() => imageFileInputRef.current?.click()}
      >
        <FileImage className="h-4 w-4" />
      </Toggle>
      <input
        onChange={handleFileChange}
        multiple={false}
        ref={imageFileInputRef}
        type="file"
        accept="image/*"
        hidden
      />
      <Separator orientation="vertical" className="h-8 w-[1px]" />
      <Toggle
        size="sm"
        pressed={editor.isActive('table')}
        onPressedChange={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        <Table className="h-4 w-4" />
      </Toggle>
      <Popover>
        <PopoverTrigger>Edit table</PopoverTrigger>
        <PopoverContent className="flex flex-col">
          <button
            onClick={() => editor.chain().focus().addColumnBefore().run()}
          >
            Add column before
          </button>
          <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
            Add column after
          </button>
          <button onClick={() => editor.chain().focus().deleteColumn().run()}>
            Delete column
          </button>
          <button onClick={() => editor.chain().focus().addRowBefore().run()}>
            Add row before
          </button>
          <button onClick={() => editor.chain().focus().addRowAfter().run()}>
            Add row after
          </button>
          <button onClick={() => editor.chain().focus().deleteRow().run()}>
            Delete row
          </button>
          <button onClick={() => editor.chain().focus().deleteTable().run()}>
            Delete table
          </button>
          <button onClick={() => editor.chain().focus().mergeCells().run()}>
            Merge cells
          </button>
          <button onClick={() => editor.chain().focus().splitCell().run()}>
            Split cell
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
          >
            Toggle header column
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeaderRow().run()}
          >
            Toggle header row
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeaderCell().run()}
          >
            Toggle header cell
          </button>
          <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
            Merge or split
          </button>
          <button
            onClick={() =>
              editor.chain().focus().setCellAttribute('colspan', 2).run()
            }
          >
            Set cell attribute
          </button>
          <button onClick={() => editor.chain().focus().fixTables().run()}>
            Fix tables
          </button>
          <button onClick={() => editor.chain().focus().goToNextCell().run()}>
            Go to next cell
          </button>
          <button
            onClick={() => editor.chain().focus().goToPreviousCell().run()}
          >
            Go to previous cell
          </button>
        </PopoverContent>
      </Popover>
      {/* <>
        <div>
          <label htmlFor="file" className="sr-only">
            Choose a file
          </label>
        </div>
        {file && (
          <section>
            File details:
            <ul>
              <li>Name: {file.name}</li>
              <li>Type: {file.type}</li>
              <li>Size: {file.size} bytes</li>
            </ul>
          </section>
        )}

        {file && (
          <Button type="button" onClick={handleUpload}>
            Upload a file
          </Button>
        )}
      </> */}
    </div>
  )
}
