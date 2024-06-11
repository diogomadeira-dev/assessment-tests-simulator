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

  return (
    <div>
      {partFieldArray.fields.map((part, partIndex) => (
        <div key={partIndex}>
          <p>PART {part.partNumber}</p>

          <div className="mb-8 min-h-40 w-60 bg-neutral-200">
            <PageSection part={part} />
          </div>

          <Button
            type="button"
            variant="destructive"
            onClick={() => partFieldArray.remove(partIndex)}
          >
            Delete part
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
