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
    name: `parts.${partIndex}.pages` as 'parts.0.pages',
  })

  // const pages = form
  //   .watch()
  //   .pages.filter((page) => page.part === part.partNumber)

  return (
    <div key={partIndex}>
      {form.watch().parts[partIndex].pages.map((page, pageIndex) => (
        <div key={pageIndex} className="min-h-30 w-30 m-8 bg-neutral-600">
          <p>
            PAGE {page.number}
            {/* - {part.partNumber} */}
          </p>
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
        new page
      </Button>
    </div>
  )
}
