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
import { TabsContent } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { AlphabeticEnum } from '@/types/assessment-tests'
import { useSearchParams } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { FillAssessmentInputSchema } from '../../api/fill-assessment-test'
import BreakComponent from './break'

export default function PageComponent({ data }: { data: any }) {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 0
  const pageData = data[page - 1]

  const { control } = useFormContext<FillAssessmentInputSchema>()

  const questionTypesSwitch = ({
    questionIndex,
    question,
  }: {
    questionIndex: number
    question: any
  }) => {
    switch (question.type) {
      case 'SHORT_TEXT':
        return (
          <FormField
            control={control}
            name={`questions.${questionIndex}.answer`}
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Short text</FormLabel> */}
                <Editor
                  key={`editor-${pageData}-${question.label}-${questionIndex}`}
                  content={question.label}
                />
                <FormControl>
                  <Input {...field} value={field.value || ''} />
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
            name={`questions.${questionIndex}.answer`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Long text</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escreve aqui..."
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
          <FormField
            control={control}
            name={`questions.${questionIndex}.answer`}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Notify me about...</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange([value])}
                    // defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="all" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        All new messages
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="mentions" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Direct messages and mentions
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="none" />
                      </FormControl>
                      <FormLabel className="font-normal">Nothing</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      // case "TYPE":
      //   return (
      //   )
      default:
        return null
    }
  }

  if (pageData?.breakPart) return <BreakComponent />

  return (
    <TabsContent value={page > 0 ? page.toString() : ''}>
      <Card>
        <CardContent className="space-y-2">
          <p>Part {AlphabeticEnum[pageData.partIndex]}</p>
          <p>Page {pageData.pageNumber}</p>

          {pageData?.questions.length > 0 &&
            pageData.questions.map((question, questionIndex) => (
              <div key={`editor-${pageData}-${questionIndex}`}>
                <p>question.type - {question.type}</p>
                {questionTypesSwitch({ questionIndex, question })}
              </div>
            ))}

          {/* {JSON.stringify(data, null, 2)} */}
        </CardContent>
      </Card>
    </TabsContent>
  )
}
