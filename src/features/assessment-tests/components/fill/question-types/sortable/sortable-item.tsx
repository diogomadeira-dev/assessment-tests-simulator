import { FillAssessmentInputSchema } from '@/features/assessment-tests/api/fill-assessment-test'
import { cn } from '@/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useFormContext } from 'react-hook-form'
import { SortableBase } from './sortable-base'

export type SortableItemProps = {
  option: FillAssessmentInputSchema['parts'][number]['pages'][number]['questions'][number]['option'][number]
  partIndex: number
  pageIndex: number
  questionIndex: number
  optionIndex: number
}

export const SortableItem = (props: SortableItemProps) => {
  const { option, partIndex, pageIndex, questionIndex } = props

  const { formState } = useFormContext<FillAssessmentInputSchema>()

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: option.id,
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
      className={cn(
        'flex cursor-grab justify-between rounded border-2 border-dashed bg-white transition-colors duration-200 hover:border-secondary',
        {
          // ! TODO: ERROR MESSAGE NOT REMOVED AFTER SORT IMAGES
          'border-warning': Boolean(
            formState?.errors?.parts?.[partIndex].pages?.[pageIndex]
              .questions?.[questionIndex]?.answer,
          ),
        },
      )}
    >
      <SortableBase {...props} />
    </div>
  )
}
