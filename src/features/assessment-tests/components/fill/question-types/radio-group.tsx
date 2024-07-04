import Editor from '@/components/editor'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FillAssessmentInputSchema } from '@/features/assessment-tests/api/fill-assessment-test'
import {
  AlphabeticEnum,
  questionTypesSwitchProps,
} from '@/types/assessment-tests'
import { useFormContext } from 'react-hook-form'

export const RadioGroupType = (props: questionTypesSwitchProps) => {
  const { question, partIndex, pageIndex, questionIndex } = props

  const { control } = useFormContext<FillAssessmentInputSchema>()

  return (
    <FormField
      control={control}
      name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <Editor
            key={`editor-${partIndex}-${pageIndex}-${questionIndex}`}
            content={question.label}
          />
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {question?.options && question?.options?.length > 0 ? (
                question.options.map((option, optionIndex) => (
                  <FormItem
                    key={`optionIndex-${optionIndex}`}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={option.id} />
                    </FormControl>
                    <FormLabel className="flex gap-2 font-normal">
                      <p className="font-semibold">
                        {AlphabeticEnum[optionIndex]}.
                      </p>
                      {option.name}
                    </FormLabel>
                  </FormItem>
                ))
              ) : (
                <p>No options</p>
              )}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
