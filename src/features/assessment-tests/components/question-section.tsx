import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CreateAssessmentInputSchema } from '@/features/assessment-tests/api/create-assessment-test'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { QuestionsTypeDialog } from './questionsTypeDialog'

interface QuestionProps {
  partIndex: number
  pageIndex: number
}

export const QuestionSection = ({ partIndex, pageIndex }: QuestionProps) => {
  const { control } = useFormContext<CreateAssessmentInputSchema>()
  const {
    fields: pages,
    append: appendPage,
    remove: removePage,
  } = useFieldArray({
    control,
    name: `parts.${partIndex}.pages.${pageIndex}.questions`,
  })

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

          <FormField
            control={control}
            name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.text`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question text</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
