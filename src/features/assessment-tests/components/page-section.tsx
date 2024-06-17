import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../api/create-assessment-test'
import { QuestionSection } from './question-section'

interface PageProps {
  partIndex: number
}

export const PageSection = ({ partIndex }: PageProps) => {
  const { control } = useFormContext<CreateAssessmentInputSchema>()
  const {
    fields: children,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray<CreateAssessmentInputSchema>({
    name: `parts.${partIndex}.pages`,
  })

  return (
    <fieldset>
      <legend>Page</legend>
      {children.map((child, pageIndex) => (
        <section
          key={child.id}
          style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}
        >
          {/* <Input {...register(`parts.${partIndex}.page.${pageIndex}.name`)} /> */}

          <FormField
            control={control}
            name={`parts.${partIndex}.pages.${pageIndex}.number`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <QuestionSection partIndex={partIndex} pageIndex={pageIndex} />
          <Button type="button" onClick={() => removeChild(pageIndex)}>
            Remove Page
          </Button>
        </section>
      ))}
      <Button
        type="button"
        onClick={() =>
          appendChild({
            number: '',
            questions: [
              {
                number: '',
                text: '',
              },
            ],
          })
        }
      >
        Append Page
      </Button>
    </fieldset>
  )
}
