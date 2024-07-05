import Editor from '@/components/editor'
import { FillAssessmentInputSchema } from '@/features/assessment-tests/api/fill-assessment-test'
import { questionTypesSwitchProps } from '@/types/assessment-tests'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { DndContext } from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable'
import { useEffect } from 'react'
import { RhfSortableItem } from './RhfSortableItem'

export type InitialOptionsProps = {
  id: string
  name: string
  image_url?: string
}

export const SortableType = (props: questionTypesSwitchProps) => {
  const { question, partIndex, pageIndex, questionIndex } = props
  const { control, watch, setValue } =
    useFormContext<FillAssessmentInputSchema>()

  // const [initialOptions, setInitialOptions] = useState<InitialOptionsProps[]>(
  //   question?.options || [],
  // )
  // const sensors = useSensors(
  //   useSensor(PointerSensor),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates,
  //   }),
  // )

  // function handleDragEnd(event: DragEndEvent, value, onChange) {
  //   console.log('🚀 ~ handleDragEnd ~ value:', value)
  //   const { active, over } = event

  //   if (!value) {
  //     if (over && active.id !== over.id) {
  //       setInitialOptions((items) => {
  //         const oldIndex = items.findIndex((item) => item.id === active.id)
  //         const newIndex = items.findIndex((item) => item.id === over.id)

  //         onChange(JSON.stringify(arrayMove(items, oldIndex, newIndex)))

  //         return arrayMove(items, oldIndex, newIndex)
  //       })
  //     }
  //   } else {
  //     if (over && active.id !== over.id) {
  //       // setInitialOptions((items) => {
  //       const oldIndex = value.findIndex((item) => item.id === active.id)
  //       const newIndex = value.findIndex((item) => item.id === over.id)

  //       // onChange(JSON.stringify(arrayMove(items, oldIndex, newIndex)))

  //       return arrayMove(value, oldIndex, newIndex)
  //       // })
  //     }
  //   }

  //   // if (over && active.id !== over.id) {
  //   //   // setInitialOptions((items) => {
  //   //   const oldIndex = value.findIndex((item) => item.id === active.id)
  //   //   const newIndex = value.findIndex((item) => item.id === over.id)

  //   //   // onChange(JSON.stringify(arrayMove(items, oldIndex, newIndex)))

  //   //   return arrayMove(value, oldIndex, newIndex)
  //   //   // })
  //   // }

  //   // if (over && active.id !== over.id) {
  //   //   // setInitialOptions((items) => {
  //   //   const oldIndex = value.findIndex((item) => item.id === active.id)
  //   //   const newIndex = value.findIndex((item) => item.id === over.id)

  //   //   // onChange(JSON.stringify(arrayMove(items, oldIndex, newIndex)))

  //   //   return arrayMove(value, oldIndex, newIndex)
  //   //   // })
  //   // }
  // }

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: `parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`,
  })

  useEffect(() => {
    if (
      question?.options &&
      watch().parts[partIndex].pages[pageIndex].questions[questionIndex].answer
        .length === 0
    )
      setValue(
        `parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`,
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
            .answer,
        )}
      </p>

      <DndContext
        onDragEnd={(event) => {
          const { active, over } = event
          if (over == null) {
            return
          }
          if (active.id !== over.id) {
            const oldIndex = fields.findIndex((field) => field.id === active.id)
            const newIndex = fields.findIndex((field) => field.id === over.id)
            move(oldIndex, newIndex)
          }
        }}
      >
        <SortableContext
          items={fields}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex justify-evenly">
            {fields.map((field, optionIndex) => {
              return (
                <RhfSortableItem
                  key={field.id}
                  textField={field}
                  control={control}
                  index={optionIndex}
                  onRemove={() => remove(optionIndex)}
                  partIndex={partIndex}
                  pageIndex={pageIndex}
                  questionIndex={questionIndex}
                  optionIndex={optionIndex}
                />
              )
            })}
            {/* {fields.map((field, optionIndex) => {
              return (
                <RhfSortableItem
                  key={field.id}
                  textField={field}
                  control={control}
                  index={optionIndex}
                  onRemove={() => remove(optionIndex)}
                  partIndex={partIndex}
                  pageIndex={pageIndex}
                  questionIndex={questionIndex}
                  optionIndex={optionIndex}
                />
              )
            })} */}
            {/* <Button type="button" onClick={() => append({ answer: '' })}>
              ADD
            </Button> */}
          </div>
        </SortableContext>
      </DndContext>
      {/* <Controller
        control={control}
        name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) =>
                onChange(handleDragEnd(event, value, onChange))
              }
            >
              <SortableContext
                items={question.options || []}
                strategy={horizontalListSortingStrategy}
              >
                <div className="flex justify-evenly">
                  {initialOptions.map((option) => (
                    <SortableItem key={option.id} {...option} />
                  ))}
                  {value
                    ? JSON.parse(value).map((option: InitialOptionsProps) => (
                        <SortableItem key={option.id} {...option} />
                      ))
                    : initialOptions.map((option) => (
                        <SortableItem key={option.id} {...option} />
                      ))}
                </div>
              </SortableContext>
            </DndContext>
            {error && <FormMessage>{error.message}</FormMessage>}
          </div>
        )}
      /> */}
    </div>
  )
}
