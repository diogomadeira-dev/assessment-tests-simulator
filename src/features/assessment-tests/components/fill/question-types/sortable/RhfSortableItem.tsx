import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FC } from 'react'
import { Control, FieldArrayWithId } from 'react-hook-form'
import { RhfSortableBase } from './RhfSortableBase'

type Props = {
  textField: FieldArrayWithId
  control: Control
  index: number
  onRemove: () => void
}

export const RhfSortableItem: FC<Props> = ({
  textField,
  control,
  index,
  onRemove,
  partIndex,
  pageIndex,
  questionIndex,
  optionIndex,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: textField.id,
    // data: {
    //   text: textField.image_url,
    // },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex cursor-grab justify-between rounded border-2 border-dashed bg-white p-12"
    >
      <RhfSortableBase
        handlerProps={{
          ref: setActivatorNodeRef,
          attributes,
          listeners,
        }}
        control={control}
        index={index}
        onRemove={onRemove}
        isDragging={isDragging}
        partIndex={partIndex}
        pageIndex={pageIndex}
        questionIndex={questionIndex}
        optionIndex={optionIndex}
      />
    </div>
  )
}
