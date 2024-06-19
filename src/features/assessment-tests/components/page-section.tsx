import { Button } from '@/components/ui/button'
import { CreateAssessmentInputSchema } from '@/features/assessment-tests/api/create-assessment-test'
import { AlphabeticEnum } from '@/types/assessment-tests'
import { useTranslations } from 'next-intl'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { QuestionSection } from './question-section'

interface PageProps {
  partIndex: number
}

export const PageSection = ({ partIndex }: PageProps) => {
  const t = useTranslations()

  const { control, watch } = useFormContext<CreateAssessmentInputSchema>()

  const {
    fields: pageFields,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray<CreateAssessmentInputSchema>({
    control,
    name: `parts.${partIndex}.pages`,
  })

  return (
    <fieldset className="flex flex-col justify-center">
      {/* <legend>Page</legend> */}
      {pageFields.map((child, pageIndex) => (
        <section key={child.id} className="mb-10 rounded-2xl border p-10">
          <div className="flex items-center justify-center gap-2">
            <p>ffweewf - {pageIndex}</p>
            <h3 className="text-xl font-extrabold">
              {`${t('assessment-test.page')} ${partIndex}`}
            </h3>
            <Button
              type="button"
              variant="ghost"
              onClick={() => removeChild(pageIndex)}
            >
              Remove Page
            </Button>
          </div>

          {/* <FormField
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
            /> */}
          <QuestionSection partIndex={partIndex} pageIndex={pageIndex} />
        </section>
      ))}
      <Button
        type="button"
        variant="outline"
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
        {`Append Page to ${t('assessment-test.part')} ${AlphabeticEnum[partIndex]}`}
      </Button>
    </fieldset>
  )
}
