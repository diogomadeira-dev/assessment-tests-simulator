import { Button } from '@/components/ui/button'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../api/create-assessment-test'
import { PageSection } from './page-section'

export const PartSection = () => {
  const form = useFormContext<CreateAssessmentInputSchema>()

  const partFieldArray = useFieldArray({
    control: form.control,
    name: 'parts',
  })

  const updateIndexes = () => {
    let pageCount = 0
    if (form.watch().parts && form.watch().parts.length > 0) {
      const updatedIndexes = form
        .watch()
        .parts.map((partElement, partIndex) => {
          return {
            name: partIndex,
            pages: partElement.pages.map((pageElement, pageIndex) => {
              console.log('🚀 ~ pageCount', pageCount)
              pageCount++
              return {
                number: pageCount,
              }
            }),
          }
        })

      form.setValue('parts', updatedIndexes)
    }
  }

  return (
    <div>
      {partFieldArray.fields.map((part, partIndex) => (
        <div key={part.name}>
          <p>PART {part.name}</p>

          <div className="mb-8 min-h-40 w-60 bg-neutral-200">
            <PageSection part={part} partIndex={partIndex} />
          </div>

          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              partFieldArray.remove(partIndex)

              updateIndexes()
            }}
          >
            Delete part {part.name}
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          // ! repeated
          const totalPages = form.watch().parts.reduce((acc, part) => {
            return acc + part.pages.length
          }, 0)

          const partsArray = []

          // form.watch().parts.forEach((partElement) => {
          //   console.log('partElement', partElement)

          //   partElement.pages.forEach((pageElement) => {
          //     console.log('pageElement', pageElement)
          //   })
          // })

          partFieldArray.append({
            name: form.watch().parts.length + 1,
            pages: [
              {
                number: totalPages + 1,
              },
            ],
            // partNumber:
            //   partFieldArray.fields.length > 0
            //     ? partFieldArray.fields.at(-1)?.partNumber + 1
            //     : 0,
          })

          updateIndexes()
        }}
      >
        append new part
      </Button>
    </div>
  )
}
