import Editor from '@/components/editor'
import { FillAssessmentInputSchema } from '@/features/assessment-tests/api/fill-assessment-test'
import { questionTypesSwitchProps } from '@/types/assessment-tests'
import { useFormContext } from 'react-hook-form'

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import UserItem from '../sortable-item'

export const SortableType = (props: questionTypesSwitchProps) => {
  const { question, partIndex, pageIndex, questionIndex } = props
  const { control } = useFormContext<FillAssessmentInputSchema>()

  const [userList, setUserList] = useState<User[]>([])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setUserList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }
  console.log(userList)

  useEffect(() => {
    setUserList(question.options)
  }, [])

  return (
    <div className="my-10 grid gap-2 space-y-4">
      <Editor
        key={`editor-${partIndex}-${pageIndex}-${questionIndex}`}
        content={question.label}
      />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        // modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={userList}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex justify-evenly">
            {userList.map((option) => (
              <UserItem key={option.id} option={option} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
