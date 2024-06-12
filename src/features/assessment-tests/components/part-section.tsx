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

  // useEffect(() => {
  //   let count = 0

  //   if (form.watch().parts && form.watch().parts.length > 0) {
  //     const test = form.watch().parts.map((partElement) => ({
  //       name: partElement.name,
  //       pages: partElement.pages.map((pageElement) => {
  //         count++
  //         return {
  //           number: count,
  //         }
  //       }),
  //     }))
  //     console.log('🚀 ~ PartSection ~ test:', test)

  //     form.setValue('parts', test)
  //   }
  // }, [form.watch()])

  return (
    <div>
      {partFieldArray.fields.map((part, partIndex) => (
        <div key={part.name}>
          <p>PART {part.name}</p>

          <div className="mb-8 min-h-40 w-60 bg-neutral-200">
            <PageSection part={part} partIndex={partIndex} />
          </div>

          {/* <Button
            type="button"
            variant="destructive"
            onClick={() => {
              const filteredPages = form
                .watch()
                .pages.map((page, pageIndex, pageArray) => {
                  const previousItem = pageArray[pageIndex - 1]

                  if (previousItem) {
                    console.log(
                      '🚀 ~ filteredPages ~ page:',
                      page.pageNumber,
                      previousItem.pageNumber,
                    )
                  }

                  return page
                })

              console.log('filteredPages', filteredPages)
            }}
          >
            Delete part {part.partNumber}
          </Button> */}
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
        append new part
      </Button>
    </div>
  )
}
