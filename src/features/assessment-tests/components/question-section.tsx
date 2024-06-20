import { Button } from '@/components/ui/button'
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
import { CreateAssessmentInputSchema } from '@/features/assessment-tests/api/create-assessment-test'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { QuestionsTypeDialog } from './questionsTypeDialog'

interface QuestionProps {
  partIndex: number
  pageIndex: number
}

export const QuestionSection = ({ partIndex, pageIndex }: QuestionProps) => {
  const { control, watch } = useFormContext<CreateAssessmentInputSchema>()
  const {
    fields: pages,
    append: appendPage,
    remove: removePage,
  } = useFieldArray({
    control,
    name: `parts.${partIndex}.pages.${pageIndex}.questions`,
  })

  const questionTypesSwitch = (questionIndex: number) => {
    switch (
      watch().parts[partIndex].pages[pageIndex].questions[questionIndex].type
    ) {
      case 'SHORT_TEXT':
        return (
          <FormField
            control={control}
            name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.text`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short text</FormLabel>
                <FormControl>
                  <Input {...field} />
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
            name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.text`}
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
            name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.array`}
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

  return (
    <fieldset className="space-y-4">
      {pages.map((child, questionIndex) => (
        <section key={child.id} className="flex items-end gap-2">
          <FormField
            control={control}
            name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.number`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {questionTypesSwitch(questionIndex)}

          <Button
            type="button"
            variant="destructive"
            onClick={() => removePage(questionIndex)}
          >
            Remove Question
          </Button>
        </section>
      ))}

      {/* <Button
        type="button"
        onClick={() => appendChild({ number: '', text: '' })}
      >
        Append Question
      </Button> */}
      <QuestionsTypeDialog appendPage={appendPage} />
    </fieldset>
  )
}
