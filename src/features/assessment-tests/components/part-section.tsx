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
        <div key={partIndex}>
          <p>PART {part.partNumber}</p>

          <div className="mb-8 min-h-40 w-60 bg-neutral-200">
            <PageSection part={part} partIndex={partIndex} />
          </div>

          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              // const pages = form
              //   .watch()
              //   .pages?.filter((page) => page.part === part.partNumber)
              // console.log('🚀 ~ pages:', pages)

              // pages.flatMap((page) => console.log('page', page.pageNumber))

              // pages.forEach((page) => pageFieldArray.remove(page.pageNumber))

              // partFieldArray.remove(partIndex)

              const pages = form
                .watch()
                .pages?.filter((page) => page.part === part.partNumber)

              const pageIndices = pages.map((page) =>
                form
                  .getValues('pages')
                  .findIndex((p) => p.pageNumber === page.pageNumber),
              )

              pageIndices
                .sort((a, b) => b - a) // Sort indices in descending order
                .forEach((index) => pageFieldArray.remove(index))

              partFieldArray.remove(partIndex)

              // TODO: ao eliminar pages, ele elimina a part
              // mas nao esta a atualizar os index das pages
            }}
          >
            Delete part {partIndex}
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
