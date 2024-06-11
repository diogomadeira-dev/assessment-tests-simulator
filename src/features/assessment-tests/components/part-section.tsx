import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import {
  UseFieldArrayReturn,
  useFieldArray,
  useFormContext,
} from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../api/create-assessment-test'

export const PartSection = ({
  partFieldArray,
  part,
  partIndex,
}: {
  partFieldArray: UseFieldArrayReturn
  part: any
  partIndex: number
}) => {
  const form = useFormContext<CreateAssessmentInputSchema>()

  const pageFieldArray = useFieldArray({
    control: form.control,
    name: `parts[${partIndex}].pages` as `parts.0.pages`,
  })

  const partsLenght = form.watch().parts.length

  // partsLenght.forEach((part) => {
  //   console.log(form.watch().parts[partIndex - 1].pages)
  // })

  // console.log('testeee', pagesLenght)

  useEffect(() => {
    for (let i = 0; i < partsLenght; i++) {
      console.log('testeee', form.watch().parts[i].pages)
    }
  }, [])

  return (
    <div key={part.id}>
      <h2 className="font-extrabold">{part.name}</h2>

      {pageFieldArray.fields.map((page, pageIndex, { length }) => (
        // PASSAR ISTO PARA PAGE SECTION
        <div key={pageIndex} className="mb-8 min-h-24 w-full bg-red-200">
          <p>page number: {pageIndex}</p>

          {/* {page.questions.map((question, questionIndex) => (
            <div key={question.questionNumber}>
              <FormField
                control={form.control}
                name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.label`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {question.questionNumber} - Question label
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))} */}

          {/* <Button
            type="button"
            variant="destructive"
            onClick={() => pageFieldArray.remove()}
          >
            Delete page
          </Button> */}

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              // const newQuestionNumber = form.watch('questionNumber') + 1

              const previousPartLenght =
                partIndex > 0
                  ? form.watch().parts[partIndex - 1].pages.length
                  : 0

              // console.log('previousPartLenght', previousPartLenght)

              // add new page section
              pageFieldArray.append({
                pageNumber:
                  partIndex > 0
                    ? previousPartLenght + (length + 1)
                    : length + 1,
                part: part.name,
                // questions: [],
              })

              // Set new question number
              // form.setValue('questionNumber', newQuestionNumber)
            }}
          >
            append new page
          </Button>
        </div>
      ))}

      {partFieldArray.fields.length > 0 &&
        partFieldArray.fields.length - 1 === partIndex && (
          <Button
            type="button"
            variant="destructive"
            onClick={() => partFieldArray.remove(partIndex)}
          >
            Delete part
          </Button>
        )}
    </div>
  )
}
