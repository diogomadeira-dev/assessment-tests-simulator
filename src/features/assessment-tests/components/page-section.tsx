import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DeleteIcon, Plus } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../api/create-assessment-test'
import { updateIndexes } from './part-section'

export const PageSection = ({
  part,
  partIndex,
  selectedPart,
  setSelectedPart,
  selectedPage,
  setSelectedPage,
}: {
  part: CreateAssessmentInputSchema['parts'][number]
  partIndex: number
  selectedPart: number
  setSelectedPart: Dispatch<SetStateAction<number>>
  selectedPage: number
  setSelectedPage: Dispatch<SetStateAction<number>>
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
      {pageFieldArray.fields.map((page, pageIndex) => (
        <div key={page.id}>
          <div
            className={cn('h-44 w-full bg-neutral-100', {
              'bg-blue-300': selectedPage === page.number,
            })}
            // TODO: REVAMP TO USE SHADCN CARD CLICABLE
            onClick={() => {
              setSelectedPage(page.number)
              setSelectedPart(part.name)
            }}
          >
            <p>PAGE {page.number}</p>
          </div>

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

      <div className="w-full bg-neutral-100">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            // ! repeated
            const totalPages = form.watch().parts.reduce((acc, part) => {
              return acc + part.pages.length
            }, 0)
            console.log('🚀 ~ totalPages:', totalPages)

            pageFieldArray.append({
              number: totalPages + 1,
              questions: [],
            })

            updateIndexes(form)

            // // ! repeated
            // let count = 0
            // if (form.watch().parts && form.watch().parts.length > 0) {
            //   const test = form.watch().parts.map((partElement) => ({
            //     name: partElement.name,
            //     pages: partElement.pages.map((pageElement) => {
            //       count++
            //       return {
            //         number: count,
            //         questions: [],
            //       }
            //     }),
            //   }))
            //   console.log('🚀 ~ PartSection ~ test:', test)

            //   form.setValue('parts', test)
            // }
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
