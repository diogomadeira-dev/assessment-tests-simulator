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

  const pageFieldArray = useFieldArray({
    control: form.control,
    name: 'pages',
  })

  return (
    <div>
      {partFieldArray.fields.map((part, partIndex) => (
        <div key={part.partNumber}>
          <p>PART {part.partNumber}</p>

          <div className="mb-8 min-h-40 w-60 bg-neutral-200">
            <PageSection part={part} partIndex={partIndex} />
          </div>

          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              const filteredPageIndex: number[] = []
              form.watch().pages.forEach((page, pageIndex: number) => {
                if (page.part === part.partNumber)
                  filteredPageIndex.push(pageIndex)
              })

              console.log('filteredPageIndex', filteredPageIndex)

              pageFieldArray.remove(filteredPageIndex)

              partFieldArray.remove(part.partNumber)
            }}
          >
            Delete part {part.partNumber}
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          partFieldArray.append({
            partNumber:
              partFieldArray.fields.length > 0
                ? partFieldArray.fields.at(-1)?.partNumber + 1
                : 0,
          })
        }}
      >
        append new part
      </Button>
    </div>
  )
}
