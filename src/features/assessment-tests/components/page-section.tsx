import { Button } from '@/components/ui/button'
import { DeleteIcon, Plus } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../api/create-assessment-test'
import { updateIndexes } from './part-section'

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
    name: `parts.${partIndex}.pages` as 'parts.0.pages',
  })

  // const pages = form
  //   .watch()
  //   .pages.filter((page) => page.part === part.partNumber)

  return (
    <div key={partIndex} className="space-y-4">
      {form.watch().parts[partIndex].pages.map((page, pageIndex) => (
        <div key={pageIndex} className="h-44 w-full bg-neutral-100">
          <p>
            PAGE {page.number}
            {/* - {part.partNumber} */}
          </p>

          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => {
              pageFieldArray.remove(pageIndex)

              updateIndexes(form)
            }}
          >
            <DeleteIcon className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <div className="h-44 w-full bg-neutral-100">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            // ! repeated
            const totalPages = form.watch().parts.reduce((acc, part) => {
              return acc + part.pages.length
            }, 0)
            // console.log('🚀 ~ totalPages:', totalPages)

            pageFieldArray.append({
              number: totalPages + 1,
            })

            // ! repeated
            let count = 0
            if (form.watch().parts && form.watch().parts.length > 0) {
              const test = form.watch().parts.map((partElement) => ({
                name: partElement.name,
                pages: partElement.pages.map((pageElement) => {
                  count++
                  return {
                    number: count,
                  }
                }),
              }))
              console.log('🚀 ~ PartSection ~ test:', test)

              form.setValue('parts', test)
            }
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
