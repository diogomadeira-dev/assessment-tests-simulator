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
import { AlphabeticEnum } from '@/types/assessment-tests'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../../api/create-assessment-test'
import { FillAssessmentInputSchema } from '../../api/fill-assessment-test'

type questionTypesSwitchProps = {
  question: CreateAssessmentInputSchema['parts'][number]['pages'][number]['questions'][number]
  partIndex: number
  pageIndex: number
  questionIndex: number
}

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
                      {question.options.map((question, questionIndex) => (
                        <FormItem
                          key={`questionIndex-${questionIndex}`}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={question.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {question.name}
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
                      className="flex flex-row space-y-1"
                    >
                      {question.options.map((question, questionIndex) => (
                        <FormItem
                          key={`questionIndex-${questionIndex}`}
                          className="flex flex-col items-center justify-center"
                        >
                          <Image
                            src={question.image_url}
                            width={100}
                            height={100}
                            alt={question.name}
                          />
                          <FormLabel className="font-normal">
                            {question.name}
                          </FormLabel>
                          <FormControl>
                            <RadioGroupItem value={question.id} />
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
                            key={`questionIndex-${questionIndex}`}
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
                            <FormLabel className="font-normal">
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
