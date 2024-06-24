import { Button } from '@/components/ui/button'
import { CreateAssessmentInputSchema } from '@/features/assessment-tests/api/create-assessment-test'
import { AlphabeticEnum } from '@/types/assessment-tests'
import { useTranslations } from 'next-intl'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { PageSection } from './page-section'

export const PartSection = () => {
  const t = useTranslations()

  const form = useFormContext<CreateAssessmentInputSchema>()

  const { control, watch, reset } = form

  const {
    fields,
    append: appendPart,
    remove: removePart,
  } = useFieldArray({
    control,
    name: 'parts',
  })

  return (
    <div className="space-y-16">
      {fields.map((field, partIndex) => (
        <fieldset key={field.id}>
          {watch().parts.length > 1 && (
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl font-black">
                {`${t('assessment-test.part')} ${AlphabeticEnum[partIndex]}`}
              </h2>
              <Button
                type="button"
                variant="ghost"
                onClick={() => removePart(partIndex)}
              >
                Remove Part
              </Button>
            </div>
          )}

          <PageSection partIndex={partIndex} />
        </fieldset>
      ))}

      <Button
        type="button"
        onClick={() =>
          appendPart({
            id: uuidv4(),
            pages: [],
          })
        }
      >
        Append Part
      </Button>
    </div>
  )
}
