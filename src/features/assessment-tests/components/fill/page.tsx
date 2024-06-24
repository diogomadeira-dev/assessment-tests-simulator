import Editor from '@/components/editor'
import { Card, CardContent } from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
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
      // case "TYPE":
      //   return (

      //   )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardContent className="space-y-2">
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
  )
}
