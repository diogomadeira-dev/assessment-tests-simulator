import Image from '@tiptap/extension-image'
import {
  NodeViewWrapper,
  ReactNodeViewRenderer,
  nodeInputRule,
} from '@tiptap/react'
import { Expand } from 'lucide-react'
import React, { Component, FC, ReactElement } from 'react'

export const ImageResizeComponent = ({
  extension,
  editor,
  updateAttributes,
  node,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const {
    options: { editable },
  } = editor

  const handler = (mouseDownEvent: React.MouseEvent<HTMLImageElement>) => {
    const parent = (mouseDownEvent.target as HTMLElement).closest(
      '.image-resizer',
    )
    const image = parent?.querySelector('img.postimage') ?? null
    if (image === null) return
    const startSize = { x: image.clientWidth, y: image.clientHeight }
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY }

    function onMouseMove(mouseMoveEvent: MouseEvent) {
      updateAttributes({
        width: startSize.x - startPosition.x + mouseMoveEvent.pageX,
        height: startSize.y - startPosition.y + mouseMoveEvent.pageY,
      })
    }
    function onMouseUp() {
      document.body.removeEventListener('mousemove', onMouseMove)
    }

    document.body.addEventListener('mousemove', onMouseMove)
    document.body.addEventListener('mouseup', onMouseUp, { once: true })
  }
  return (
    <NodeViewWrapper className="image-resizer relative inline-flex flex-grow-0">
      {extension.options.useFigure ? (
        <figure>
          <img {...node.attrs} className="postimage" />
        </figure>
      ) : (
        <img {...node.attrs} className="postimage" />
      )}
      {editable && (
        <div
          className="resize-trigger absolute bottom-2 right-2 rounded-md bg-white p-2 shadow-md"
          onMouseDown={handler}
        >
          <Expand />
        </div>
      )}
    </NodeViewWrapper>
  )
}

export interface ImageOptions {
  inline: boolean
  allowBase64: boolean
  HTMLAttributes: Record<string, unknown>
  resizeIcon: FC | Component | ReactElement
  useFigure: boolean
}
declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    imageResize: {
      setImage: (options: {
        src: string
        alt?: string
        title?: string
        width?: string | number
        height?: string | number
        isDraggable?: boolean
      }) => ReturnType
    }
  }
}
export const inputRegex = /(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/
export const ImageResize = Image.extend<ImageOptions>({
  name: 'imageResize',
  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
      resizeIcon: <>⊙</>,
      useFigure: false,
    }
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '100%',
        renderHTML: (attributes) => {
          return {
            width: attributes.width,
          }
        },
      },
      height: {
        default: 'auto',
        renderHTML: (attributes) => {
          return {
            height: attributes.height,
          }
        },
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageResizeComponent)
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title, height, width, isDraggable] = match
          return { src, alt, title, height, width, isDraggable }
        },
      }),
    ]
  },
})
