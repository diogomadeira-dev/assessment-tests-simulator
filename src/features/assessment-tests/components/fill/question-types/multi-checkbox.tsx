import Editor from '@/components/editor'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FillAssessmentInputSchema } from '@/features/assessment-tests/api/fill-assessment-test'
import {
  AlphabeticEnum,
  questionTypesSwitchProps,
} from '@/types/assessment-tests'
import { useFormContext } from 'react-hook-form'

export const MultiCheckboxType = (props: questionTypesSwitchProps) => {
  const { question, partIndex, pageIndex, questionIndex } = props
  const { control } = useFormContext<FillAssessmentInputSchema>()

  return (
    <FormField
      control={control}
      name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <Editor
              key={`editor-${partIndex}-${pageIndex}-${questionIndex}`}
              content={question.label}
            />
          </div>
          {question?.options && question?.options?.length > 0 ? (
            question.options.map((option, optionIndex) => (
              <FormField
                // ! TODO: REPLACE FOR QUESTION ID
                key={`optionIndex-${optionIndex}`}
                control={control}
                name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`}
                render={({ field }) => {
                  return (
                    <FormItem
                      // ! TODO: REPLACE FOR QUESTION ID
                      key={`optionIndex-${optionIndex}`}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={
                            field.value
                              ? JSON.parse(field.value)?.includes(option.id)
                              : null
                          }
                          onCheckedChange={(checked) => {
                            let currentValue = []

                            try {
                              const parsedValue = JSON.parse(field.value)
                              if (Array.isArray(parsedValue)) {
                                currentValue = parsedValue
                              }
                            } catch (e) {
                              // If parsing fails, currentValue remains an empty array
                            }
                            console.log('currentValue', currentValue)

                            return checked
                              ? field.onChange(
                                  JSON.stringify([...currentValue, option.id]),
                                )
                              : field.onChange(
                                  JSON.stringify(
                                    JSON.parse(field.value)?.filter(
                                      (value: string) => value !== option.id,
                                    ),
                                  ),
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="flex gap-2 font-normal">
                        <p className="font-semibold">
                          {AlphabeticEnum[optionIndex]}.
                        </p>
                        {option.name}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))
          ) : (
            <p>No options</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
