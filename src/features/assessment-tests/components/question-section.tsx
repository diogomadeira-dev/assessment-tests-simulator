import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../api/create-assessment-test'

interface QuestionProps {
  partIndex: number
  pageIndex: number
}

export const QuestionSection = ({ partIndex, pageIndex }: QuestionProps) => {
  const { control } = useFormContext<CreateAssessmentInputSchema>()
  const {
    fields: children,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray({
    name: `parts.${partIndex}.pages.${pageIndex}.questions`,
  })

  return (
    <fieldset>
      <legend>Question</legend>
      {children.map((child, questionIndex) => (
        <section
          key={child.id}
          style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}
        >
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

          <Button type="button" onClick={() => removeChild(questionIndex)}>
            Remove Question
          </Button>
        </section>
      ))}
      <Button type="button" onClick={() => appendChild({})}>
        Append Question
      </Button>
    </fieldset>
  )
}
