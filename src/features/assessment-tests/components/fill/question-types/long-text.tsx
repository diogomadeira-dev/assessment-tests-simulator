import Editor from '@/components/editor'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { FillAssessmentInputSchema } from '@/features/assessment-tests/api/fill-assessment-test'
import { questionTypesSwitchProps } from '@/types/assessment-tests'
import { useFormContext } from 'react-hook-form'

export const LongTextType = (props: questionTypesSwitchProps) => {
  const { question, partIndex, pageIndex, questionIndex } = props
  const { control } = useFormContext<FillAssessmentInputSchema>()

  return (
    <FormField
      control={control}
      name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`}
      defaultValue=""
      render={({ field }) => (
        <FormItem>
          <Editor
            key={`editor-${partIndex}-${pageIndex}-${questionIndex}`}
            content={question.label}
          />
          <FormControl>
            <Textarea
              placeholder="Write here..."
              className="resize-y"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
