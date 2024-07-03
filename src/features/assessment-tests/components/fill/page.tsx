import Editor from '@/components/editor'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { AlphabeticEnum } from '@/types/assessment-tests'
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
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../../api/create-assessment-test'
import { FillAssessmentInputSchema } from '../../api/fill-assessment-test'
import UserItem from './sortable-item'

type questionTypesSwitchProps = {
  question: CreateAssessmentInputSchema['parts'][number]['pages'][number]['questions'][number]
  partIndex: number
  pageIndex: number
  questionIndex: number
}

type User = {
  id: number
  name: string
  image_url: string
}
const dummyData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice@example.com',
  },
]

export default function PageComponent({
  partIndex,
  pageIndex,
  page,
}: {
  partIndex: number
  pageIndex: number
  page: CreateAssessmentInputSchema['parts'][number]['pages'][number]
}) {
  const searchParams = useSearchParams()

  const pageNumberUrl = Number(searchParams.get('page')) || 0

  const { control, register } = useFormContext<FillAssessmentInputSchema>()

  const questionTypesSwitch = ({
    question,
    partIndex,
    pageIndex,
    questionIndex,
  }: questionTypesSwitchProps) => {
    switch (question.type) {
      case 'SHORT_TEXT':
        return (
          <FormField
            control={control}
            name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`}
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <Editor
                  key={`editor-${partIndex}-${pageIndex}-${questionIndex}`}
                  content={question.label}
                />
                <FormControl>
                  <Input placeholder="Write here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case 'LONG_TEXT':
        return (
          <FormField
            control={control}
            name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`}
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <Editor
                  key={`editor-${partIndex}-${pageIndex}-${questionIndex}`}
                  content={question.label}
                />
                <FormControl>
                  <Textarea
                    placeholder="Write here..."
                    className="resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case 'RADIO_GROUP':
        return (
          <>
            <FormField
              control={control}
              name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <Editor
                    key={`editor-${partIndex}-${pageIndex}-${questionIndex}`}
                    content={question.label}
                  />
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {question.options.map((option, optionIndex) => (
                        <FormItem
                          key={`optionIndex-${optionIndex}`}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={option.id} />
                          </FormControl>
                          <FormLabel className="flex gap-2 font-normal">
                            <p className="font-semibold">
                              {AlphabeticEnum[optionIndex]}.
                            </p>
                            {option.name}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )
      case 'RADIO_GROUP_HORIZONTAL':
        return (
          <>
            <FormField
              control={control}
              name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <Editor
                    key={`editor-${partIndex}-${pageIndex}-${questionIndex}`}
                    content={question.label}
                  />
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-y-3"
                    >
                      {question.options.map((option, optionIndex) => (
                        <FormItem
                          key={`optionIndex-${optionIndex}`}
                          className="flex flex-col items-center justify-center space-y-6"
                        >
                          <Image
                            src={option.image_url}
                            width={100}
                            height={100}
                            alt={option.name}
                          />
                          <FormLabel className="flex gap-2 font-normal">
                            <p className="font-semibold">
                              {AlphabeticEnum[optionIndex]}.
                            </p>
                            {option.name}
                          </FormLabel>
                          <FormControl>
                            <RadioGroupItem value={option.id} />
                          </FormControl>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )
      case 'MULTI_CHECKBOX':
        return (
          <>
            <FormField
              control={control}
              name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`}
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <Editor
                      key={`editor-${partIndex}-${pageIndex}-${questionIndex}`}
                      content={question.label}
                    />
                  </div>
                  {question.options.map((option, optionIndex) => (
                    <FormField
                      // ! TODO: REPLACE FOR QUESTION ID
                      key={`optionIndex-${optionIndex}`}
                      control={control}
                      name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`}
                      render={({ field }) => {
                        return (
                          <FormItem
                            // ! TODO: REPLACE FOR QUESTION ID
                            key={`optionIndex-${optionIndex}`}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={
                                  field.value
                                    ? JSON.parse(field.value)?.includes(
                                        option.id,
                                      )
                                    : null
                                }
                                onCheckedChange={(checked) => {
                                  let currentValue = []

                                  try {
                                    const parsedValue = JSON.parse(field.value)
                                    if (Array.isArray(parsedValue)) {
                                      currentValue = parsedValue
                                    }
                                  } catch (e) {
                                    // If parsing fails, currentValue remains an empty array
                                  }
                                  console.log('currentValue', currentValue)

                                  return checked
                                    ? field.onChange(
                                        JSON.stringify([
                                          ...currentValue,
                                          option.id,
                                        ]),
                                      )
                                    : field.onChange(
                                        JSON.stringify(
                                          JSON.parse(field.value)?.filter(
                                            (value: string) =>
                                              value !== option.id,
                                          ),
                                        ),
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="flex gap-2 font-normal">
                              <p className="font-semibold">
                                {AlphabeticEnum[optionIndex]}.
                              </p>
                              {option.name}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )
      case 'SORTABLE': {
        const [userList, setUserList] = useState<User[]>(dummyData)
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
      // case "TYPE":
      //   return (

      //   )
      default:
        return null
    }
  }

  console.log('🚀 ~ StartComponent ~ page:', page)

  return (
    <div className="space-y-8">
      {pageIndex === 0 && (
        <p className="h2 text-center text-secondary">
          PART {AlphabeticEnum[partIndex]}
        </p>
      )}

      <Card className="px-4 py-6">
        <CardContent className="space-y-12">
          {page?.questions &&
            page?.questions.length > 0 &&
            page.questions.map((question, questionIndex) => (
              <div key={questionIndex}>
                {questionTypesSwitch({
                  question,
                  partIndex,
                  pageIndex,
                  questionIndex,
                })}
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
