import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DeleteIcon, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../api/create-assessment-test'
import { updateIndexes } from './part-section'

export const QuestionSection = () => {
  const t = useTranslations()

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
    <div className="space-y-8">
      {questions &&
        questions.length > 0 &&
        questions.map((question, questionIndex) => (
          <div key={questionIndex} className="flex items-end gap-4">
            <FormField
              control={form.control}
              name={`parts.${selectedPart}.pages.${selectedPage}.questions.${questionIndex}.text`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Write your question</FormLabel>
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
            questionFieldArray.append({
              text: '',
            })
          }}
        >
          <Plus className="h-5 w-5" />
          {`${t('labels.add')} ${t('assessment-test.question')}`}
        </Button>
      </div>
    </div>
  )
}
