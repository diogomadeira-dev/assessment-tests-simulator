import { Button } from '@/components/ui/button'
import { DeleteIcon, Plus } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../api/create-assessment-test'
import { updateIndexes } from './part-section'

export const QuestionSection = () => {
  const form = useFormContext<CreateAssessmentInputSchema>()

  const { selectedPart, selectedPage } = form.watch()

  const questionFieldArray = useFieldArray({
    control: form.control,
    name: `parts.${selectedPart}.pages.${selectedPage}.questions` as 'parts.0.pages.0.questions',
  })

  const questions = form.watch(
    `parts.${selectedPart}.pages.${selectedPage}.questions`,
  )

  return (
    <div>
      {questions &&
        questions.length > 0 &&
        questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <p>question: {question.type}</p>

            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => {
                questionFieldArray.remove(questionIndex)

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
            questionFieldArray.append({
              label: '',
              type: 'text',
            })
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
