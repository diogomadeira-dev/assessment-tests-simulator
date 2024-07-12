import Editor from '@/components/editor'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FillAssessmentInputSchema } from '@/features/assessment-tests/api/fill-assessment-test'
import { questionTypesSwitchProps } from '@/types/assessment-tests'
import { useFormContext } from 'react-hook-form'

export const ShortTextType = (props: questionTypesSwitchProps) => {
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
            <Input placeholder="Write here..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
