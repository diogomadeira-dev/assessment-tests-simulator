import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { updateIndexes } from '@/utils/updateIndexes-assessment-tests-form'
import { Plus, X } from 'lucide-react'
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

  return (
    <div key={partIndex} className="space-y-4">
      {pageFieldArray.fields.map((page, pageIndex) => (
        <div key={page.id} className="flex justify-center">
          <div
            className={cn('relative h-44 w-32 bg-neutral-100 px-3 py-2', {
              'bg-blue-300': form.watch('selectedPage') === page.number,
              'border-2 border-destructive':
                form.formState.errors?.parts?.[partIndex]?.pages?.[pageIndex],
            })}
            // TODO: REVAMP TO USE SHADCN CARD CLICABLE
            onClick={() => {
              form.setValue('selectedPage', page.number)
              form.setValue('selectedPart', part.name)
            }}
          >
            <p>PAGE {page.number}</p>

            {form.formState.errors?.parts?.[partIndex]?.pages?.[pageIndex] && (
              <p>error</p>
            )}

            <Button
              type="button"
              variant="destructive"
              size="badge"
              className="absolute right-1 top-2"
              onClick={() => {
                pageFieldArray.remove(pageIndex)

                updateIndexes(form)
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-center pb-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            // ! repeated
            const totalPages = form.watch().parts.reduce((acc, part) => {
              return acc + part.pages.length
            }, 0)

            pageFieldArray.append({
              number: totalPages + 1,
              questions: [],
            })

            updateIndexes(form)
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
