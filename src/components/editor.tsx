'use client'

import { BlockNoteEditor, PartialBlock, locales } from '@blocknote/core'
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/shadcn'
import '@blocknote/shadcn/style.css'
// import { uploadFiles } from "@/utils/uploadthing";

// * https://www.youtube.com/watch?v=FspnnTtVJdk

interface EditorProps {
  // onChange: () => void
  initialContent?: string
  editable?: boolean
}

const Editor: React.FC<EditorProps> = ({
  // onChange,
  initialContent,
  editable = true,
}) => {
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    // uploadFile: async (file: File) => {
    //   const [res] = await uploadFiles("imageUploader", { files: [file] });
    //   return res.url;
    // },
    dictionary: locales.pt,
  })

  return (
    <div className="border py-4">
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme="light"
        // onChange={onChange}
      />
    </div>
  )
}

export default Editor
