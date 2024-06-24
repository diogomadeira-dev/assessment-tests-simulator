import Editor from '@/components/editor'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { CreateAssessmentInputSchema } from '@/features/assessment-tests/api/create-assessment-test'
import { useTranslations } from 'next-intl'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { QuestionsTypeDialog } from './questionsTypeDialog'

type QuestionProps = {
  partIndex: number
  pageIndex: number
}

type questionTypesSwitchProps = {
  questionIndex: number
}

const Children = ({
  questionIndex,
  partIndex,
  pageIndex,
}: {
  questionIndex: number
  partIndex: number
  pageIndex: number
}) => {
  const { control } = useFormContext<CreateAssessmentInputSchema>()

  const {
    fields: options,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.options`,
  })

  return (
    <fieldset>
      <legend>Children</legend>
      {options.map((option, optionIndex) => (
        <section
          key={option.id}
          style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}
        >
          <FormField
            control={control}
            name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.options.${optionIndex}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number</FormLabel>
                <FormControl>
                  <Input placeholder="Option" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="button" onClick={() => removeOption(optionIndex)}>
            Remove option
          </button>
        </section>
      ))}
      <button
        type="button"
        onClick={() =>
          appendOption({
            id: uuidv4(),
            name: '',
          })
        }
      >
        Append option
      </button>
    </fieldset>
  )
}

export const QuestionSection = ({ partIndex, pageIndex }: QuestionProps) => {
  const t = useTranslations()

  const { control, watch, setValue, getValues } =
    useFormContext<CreateAssessmentInputSchema>()

  const {
    fields: pages,
    append: appendPage,
    remove: removePage,
  } = useFieldArray({
    control,
    name: `parts.${partIndex}.pages.${pageIndex}.questions`,
  })

  const questionTypesSwitch = ({ questionIndex }: questionTypesSwitchProps) => {
    switch (
      watch().parts[partIndex].pages[pageIndex].questions[questionIndex].type
    ) {
      case 'SHORT_TEXT':
        return (
          <div className="w-full">
            <Controller
              control={control}
              name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.label`}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Editor onChange={onChange} error={error} editable />
              )}
            />
          </div>
        )
      case 'LONG_TEXT':
        return (
          <FormField
            control={control}
            name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.label`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Long text</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escreve aqui..."
                    className="resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case 'RADIO_GROUP':
        return (
          <>
            {/* <FormField
              control={control}
              name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.options`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Option" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Children
              partIndex={partIndex}
              pageIndex={pageIndex}
              questionIndex={questionIndex}
            />

            {/* {pages[pageIndex].questions[questionIndex].options.map((field, index) => (
          <fieldset key={field.id}>
            <legend>Field {index}</legend>
            <input {...register(`rounds.${index}.name`)} />
            <Children fieldIndex={index} />
            <section
              style={{
                marginTop: 16,
                display: "flex",
                alignItems: "center",
                gap: 16
              }}
            >
              <button type="button" onClick={() => removeField(index)}>
                Remove
              </button>
              <button
                type="button"
                onClick={() => appendField({ name: "", scrim: [] })}
              >
                Append Field
              </button>
            </section>
          </fieldset>
        ))} */}
          </>
        )
      // case "TYPE":
      //   return (

      //   )
      default:
        return null
    }
  }

  return (
    <fieldset className="space-y-20">
      {pages.map((child, questionIndex, { length }) => (
        <section key={child.id} className="space-y-20">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold">New Question</h3>
              <Button
                type="button"
                variant="ghost"
                onClick={() => removePage(questionIndex)}
              >
                Remove Question
              </Button>
            </div>

            <div className="space-y-4">
              <FormField
                control={control}
                name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.number`}
                render={({ field }) => (
                  <FormItem className="w-20">
                    <FormLabel>Number</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: 1.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                {questionTypesSwitch({ questionIndex })}
              </div>
            </div>
          </div>
          {questionIndex !== length - 1 && <Separator />}
        </section>
      ))}

      <QuestionsTypeDialog appendPage={appendPage} />
    </fieldset>
  )
}
