import { FillAssessmentInputSchema } from '@/features/assessment-tests/api/fill-assessment-test'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SortableBase } from './sortable-base'

export type SortableItemProps = {
  option: FillAssessmentInputSchema['parts'][number]['pages'][number]['questions'][number]['option'][number]
  partIndex: number
  pageIndex: number
  questionIndex: number
  optionIndex: number
}

export const SortableItem = (props: SortableItemProps) => {
  const { option } = props

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
      className="flex cursor-grab justify-between rounded border-2 border-dashed bg-white transition-colors duration-300 hover:border-secondary"
    >
      <SortableBase {...props} />
    </div>
  )
}
