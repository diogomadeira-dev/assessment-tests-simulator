import { DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core'
import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'

type Props = {
  control: Control
  handlerProps: {
    ref: (element: HTMLElement | null) => void
    attributes: DraggableAttributes
    listeners: DraggableSyntheticListeners
  }
  index: number
  isDragging: boolean
  onRemove: () => void
}

export const RhfSortableBase: FC<Props> = ({
  control,
  handlerProps,
  index,
  isDragging,
  onRemove,
  partIndex,
  pageIndex,
  questionIndex,
  optionIndex,
}) => {
  return (
    <div>
      {/* <div
        ref={handlerProps.ref}
        {...handlerProps.attributes}
        {...handlerProps.listeners}
      >
        Drag
      </div> */}
      <div>
        <Controller
          name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer.${optionIndex}`}
          control={control}
          render={({ field, fieldState }) => {
            return (
              // <TextField
              //   ref={field.ref}
              //   name={field.name}
              //   value={field.value}
              //   onBlur={field.onBlur}
              //   onChange={field.onChange}
              //   fullWidth
              // />
              <div>
                {/* <p>test - {JSON.stringify(field)}</p> */}
                {field.value?.image_url && (
                  <img
                    src={field.value.image_url}
                    width={100}
                    height={100}
                    alt={field.value.name}
                  />
                )}
                {field.value?.name && (
                  <h3 className="text-lg font-semibold">{field.value.name}</h3>
                )}
              </div>
            )
          }}
        />
      </div>
      <div>Close</div>
    </div>
  )
}
