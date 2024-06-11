import { Button } from '@/components/ui/button'
import {
    UseFieldArrayReturn,
    useFieldArray,
    useFormContext,
} from 'react-hook-form'

export const PartSection = ({
  partFieldArray,
  part,
  partIndex,
}: {
  partFieldArray: UseFieldArrayReturn
  part: any
  partIndex: number
}) => {
  const form = useFormContext()

  const pageFieldArray = useFieldArray({
    control: form.control,
    name: `parts[${partIndex}].pages`,
  })

  return (
    <div key={part.id}>
      <h2 className="font-extrabold">{part.name}</h2>

      {pageFieldArray.fields.map((page, pageIndex) => (
        <div key={page.pageNumber}>
          <p>page number: {page.pageNumber}</p>

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

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              pageFieldArray.append({
                pageNumber: 10,
                questions: [],
              })
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
