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

  const { control } = useFormContext<CreateAssessmentInputSchema>()

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
      {pageFields.map((child, pageIndex) => (
        <section key={child.id} className="mb-10 rounded-2xl border p-10">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-xl font-extrabold">
              {`${t('assessment-test.page')} ${pageIndex + 1}`}
            </h3>
            <Button
              type="button"
              variant="ghost"
              onClick={() => removeChild(pageIndex)}
            >
              Remove Page
            </Button>
          </div>

          <QuestionSection partIndex={partIndex} pageIndex={pageIndex} />
        </section>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          appendChild({
            number: '',
            questions: [],
          })
        }
      >
        {`Append Page to ${t('assessment-test.part')} ${AlphabeticEnum[partIndex]}`}
      </Button>
    </fieldset>
  )
}
