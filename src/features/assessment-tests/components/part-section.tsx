import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AlphabeticEnum } from '@/types/assessment-tests'
import { updateIndexes } from '@/utils/update-indexes-assessment-tests-form'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../api/create-assessment-test'
import { PageSection } from './page-section'

export const PartSection = () => {
  const t = useTranslations()

  const form = useFormContext<CreateAssessmentInputSchema>()

  const partFieldArray = useFieldArray({
    control: form.control,
    name: 'parts',
  })

  return (
    <ScrollArea className="h-full w-[200px] rounded-md border p-4">
      {partFieldArray.fields.map((part, partIndex) => (
        <div key={part.id}>
          <div className="flex items-center justify-center gap-2 pb-4">
            <p className="h-fit font-black">
              {`${t('assessment-test.part')} ${AlphabeticEnum[part.number]}`}
            </p>

            {form.watch().parts.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="badge"
                onClick={() => {
                  partFieldArray.remove(partIndex)

                  updateIndexes(form)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div>
            <PageSection part={part} partIndex={partIndex} />
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <Button
          type="button"
          onClick={() => {
            const totalPages = form.watch().parts.reduce((acc, part) => {
              return acc + part.pages.length
            }, 0)
            // console.log('🚀 ~ totalPages ~ totalPages:', totalPages)
            // console.log(
            //   '🚀 ~ PartSection ~ form.watch().parts.length:',
            //   form.watch().parts.length,
            // )

            partFieldArray.append({
              number: form.watch().parts.length,
              pages: [
                {
                  number: totalPages,
                  questions: [],
                },
              ],
            })

            updateIndexes(form)
          }}
        >
          {`${t('labels.add')} ${t('assessment-test.part')} ${AlphabeticEnum[form.watch().parts.length]}`}
        </Button>
      </div>
    </ScrollArea>
  )
}
