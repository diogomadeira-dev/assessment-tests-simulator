import Editor from '@/components/editor'
import { FillAssessmentInputSchema } from '@/features/assessment-tests/api/fill-assessment-test'
import { questionTypesSwitchProps } from '@/types/assessment-tests'
import { DndContext } from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable'
import { useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { SortableItem } from './sortable-item'

export type InitialOptionsProps = {
  id: string
  name: string
  image_url?: string
}

export const SortableType = (props: questionTypesSwitchProps) => {
  const { question, partIndex, pageIndex, questionIndex } = props
  const { control, watch, setValue } =
    useFormContext<FillAssessmentInputSchema>()

  const { fields: questionOptions, move } = useFieldArray({
    control,
    name: `parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.option`,
  })

  useEffect(() => {
    if (
      question?.options &&
      watch().parts[partIndex].pages[pageIndex].questions[questionIndex].option
        .length === 0
    )
      setValue(
        `parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.option`,
        question.options,
      )
  }, [])

  return (
    <div className="my-10 grid gap-2 space-y-4">
      <Editor
        key={`editor-${partIndex}-${pageIndex}-${questionIndex}`}
        content={question.label}
      />

      <p>
        RESULT:{' '}
        {JSON.stringify(
          watch().parts[partIndex].pages[pageIndex].questions[questionIndex]
            .option,
        )}
      </p>

      <DndContext
        onDragEnd={(event) => {
          const { active, over } = event
          if (over == null) {
            return
          }
          if (active.id !== over.id) {
            const oldIndex = questionOptions.findIndex(
              (option) => option.id === active.id,
            )
            const newIndex = questionOptions.findIndex(
              (option) => option.id === over.id,
            )
            move(oldIndex, newIndex)
          }
        }}
      >
        <SortableContext
          items={questionOptions}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex justify-evenly">
            {questionOptions.map((option, optionIndex) => {
              return (
                <SortableItem
                  key={option.id}
                  option={option}
                  optionIndex={optionIndex}
                  {...props}
                />
              )
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
