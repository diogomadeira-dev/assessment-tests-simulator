import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AlphabeticEnum } from '@/types/assessment-tests'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../api/create-assessment-test'
import { PageSection } from './page-section'

// ! TODO: MOVE THIS TO ANOTHER PLACE
export const updateIndexes = (form: any) => {
  let partCount = -1
  let pageCount = -1
  if (form.watch().parts && form.watch().parts.length > 0) {
    const updatedIndexes = form.watch().parts.map((partElement, partIndex) => {
      partCount++
      // console.log('🚀 ~ updatedIndexes ~ partCount:', partCount, partElement)
      return {
        ...partElement,
        name: partCount,
        pages: partElement.pages.map((pageElement, pageIndex) => {
          pageCount++
          return {
            ...pageElement,
            number: pageCount,
          }
        }),
      }
    })

    form.setValue('parts', updatedIndexes)
  }
}

export const PartSection = () => {
  const t = useTranslations()

  const form = useFormContext<CreateAssessmentInputSchema>()

  const partFieldArray = useFieldArray({
    control: form.control,
    name: 'parts',
  })

  return (
    <ScrollArea className="h-screen w-[200px] rounded-md border p-4">
      {partFieldArray.fields.map((part, partIndex) => (
        <div key={part.id}>
          <div className="flex items-center justify-center gap-2 pb-4">
            <p className="h-fit font-black">
              {`${t('assessment-test.part')} ${AlphabeticEnum[form.watch().selectedPart]}`}
            </p>

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
          </div>

          <div>
            <PageSection part={part} partIndex={partIndex} />
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            // ! repeated
            const totalPages = form.watch().parts.reduce((acc, part) => {
              return acc + part.pages.length
            }, 0)

            partFieldArray.append({
              name: form.watch().parts.length + 1,
              pages: [
                {
                  number: totalPages + 1,
                  questions: [],
                },
              ],
            })

            updateIndexes(form)
          }}
        >
          {t('labels.add')} {t('assessment-test.part')}{' '}
          {AlphabeticEnum[form.watch().parts.length]}
        </Button>
      </div>
    </ScrollArea>
  )
}
