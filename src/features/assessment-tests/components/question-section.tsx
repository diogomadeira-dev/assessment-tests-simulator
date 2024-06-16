import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAssessmentTestsStore } from '@/providers/assessment-tests-store-provider'
import { updateIndexes } from '@/utils/update-indexes-assessment-tests-form'
import { DeleteIcon, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../api/create-assessment-test'

export const QuestionSection = () => {
  const t = useTranslations()

  const form = useFormContext<CreateAssessmentInputSchema>()

  const { selectedPage, selectedPart } = useAssessmentTestsStore(
    (state) => state,
  )

  const questionFieldArray = useFieldArray({
    control: form.control,
    name: `parts.${selectedPart}.pages.${selectedPage}.questions`,
  })

  console.log(
    '🚀 ~ QuestionSection ~ selectedPage:',
    selectedPage,
    selectedPart,
  )

  const questions = form.watch(
    `parts.${selectedPart}.pages.${selectedPage}.questions`,
  )

  return (
    <div className="space-y-8">
      {questions &&
        questions.length > 0 &&
        questions.map((question, questionIndex) => (
          <div key={question.number} className="flex items-end gap-4">
            <FormField
              control={form.control}
              name={`parts.${selectedPart}.pages.${selectedPage}.questions.${questionIndex}.text`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{question.number} Write your question</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

      <div className="w-full">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const totalQuestions = form
              .watch()
              .parts[selectedPart]?.pages.reduce((acc, page) => {
                return acc + page.questions.length
              }, 0)

            questionFieldArray.append({
              number: totalQuestions + 1,
              text: '',
            })

            updateIndexes(form)
          }}
        >
          <Plus className="h-5 w-5" />
          {`${t('labels.add')} ${t('assessment-test.question')}`}
        </Button>
      </div>
    </div>
  )
}
