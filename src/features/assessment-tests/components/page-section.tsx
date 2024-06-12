import { Button } from '@/components/ui/button'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../api/create-assessment-test'

export const PageSection = ({
  part,
  partIndex,
}: {
  part: CreateAssessmentInputSchema['parts'][number]
  partIndex: number
}) => {
  const form = useFormContext<CreateAssessmentInputSchema>()

  const pageFieldArray = useFieldArray({
    control: form.control,
    name: 'pages',
  })

  const pages = pageFieldArray.fields.filter(
    (page) => page.part === part.partNumber,
  )

  return (
    <div key={partIndex}>
      {pages.map((page, pageIndex) => (
        <div key={pageIndex} className="min-h-30 w-30 m-8 bg-neutral-600">
          <p>
            PAGE {page.pageNumber} - {part.partNumber}
          </p>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          pageFieldArray.append({
            part: part.partNumber,
            pageNumber:
              pageFieldArray.fields.length > 0
                ? pageFieldArray.fields.at(-1)?.pageNumber + 1
                : 0,
          })
        }}
      >
        append new part
      </Button>
    </div>
  )
}
