import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../api/create-assessment-test'

export const QuestionSection = ({
  selectedPart = 0,
  selectedPage = 0,
}: {
  selectedPart: number
  selectedPage: number
}) => {
  const form = useFormContext<CreateAssessmentInputSchema>()

  const questionFieldArray = useFieldArray({
    control: form.control,
    name: `parts.${selectedPart}.pages.${selectedPage}.questions`,
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
