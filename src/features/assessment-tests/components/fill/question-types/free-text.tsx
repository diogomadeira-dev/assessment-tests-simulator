import Editor from '@/components/editor'
import { FillAssessmentInputSchema } from '@/features/assessment-tests/api/fill-assessment-test'
import { questionTypesSwitchProps } from '@/types/assessment-tests'
import { Controller, useFormContext } from 'react-hook-form'

export const FreeTextType = (props: questionTypesSwitchProps) => {
  const { question, partIndex, pageIndex, questionIndex } = props
  const { control } = useFormContext<FillAssessmentInputSchema>()

  return (
    <div className="w-full space-y-4">
      <Editor
        key={`editor-${partIndex}-${pageIndex}-${questionIndex}`}
        content={question.label}
      />
      <Controller
        control={control}
        name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <Editor onChange={onChange} error={error} editable />
        )}
      />
    </div>
  )
}
