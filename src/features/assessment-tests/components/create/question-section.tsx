import Editor from '@/components/editor'
import { getPosts } from '@/components/editor/toolbar'
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
import { CreateAssessmentInputSchema } from '@/features/assessment-tests/api/create-assessment-test'
import { delay } from '@/utils/delay'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { QuestionsTypeDialog } from './questionsTypeDialog'

type QuestionProps = {
  partIndex: number
  pageIndex: number
}

type questionTypesSwitchProps = {
  question: CreateAssessmentInputSchema['parts'][number]['pages'][number]['questions'][number]
  questionIndex: number
}

// ! TODO: REPEATED
const handleUpload = async (file: File) => {
  if (file) {
    const blob = new Blob([file], { type: file.type })

    const formData = new FormData()
    formData.append('image', blob, file.name)

    try {
      const data = await getPosts(formData)
      return data
    } catch (error) {
      console.log('🚀 ~ handleUpload ~ error:', error)
    }
  }
}

const handleFileChange = async ({
  e,
  field,
  setValue,
}: {
  e: React.ChangeEvent<HTMLInputElement>
  field: string
  setValue: any
}) => {
  if (e.target.files) {
    const file: File = e.target.files[0]
    const fileUploaded = await handleUpload(file)

    await delay(100)

    console.log('🚀 ~ field:', field)

    if (fileUploaded.fileType === 'image') {
      setValue(field, 'http://' + fileUploaded.image_url)
    }
  }
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
  const imageFileInputRef = useRef<HTMLInputElement | null>(null)

  const { control, setValue } = useFormContext<CreateAssessmentInputSchema>()

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
      {/* <legend>Children</legend> */}
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
                {/* <FormLabel>Number</FormLabel> */}
                <FormControl>
                  <Input placeholder="Option" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <Button
            type="button"
            onClick={() => imageFileInputRef.current?.click()}
          >
            Upload image
          </Button> */}

          <input
            onChange={(event) =>
              handleFileChange({
                e: event,
                field: `parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.options.${optionIndex}.image_url`,
                setValue,
              })
            }
            multiple={false}
            // ref={imageFileInputRef}
            type="file"
            accept="image/*"
            // hidden
          />
          <Button type="button" onClick={() => removeOption(optionIndex)}>
            Remove option
          </Button>
        </section>
      ))}
      <Button
        type="button"
        onClick={() =>
          appendOption({
            id: uuidv4(),
            name: '',
            image_url: '',
          })
        }
      >
        Append option
      </Button>
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

  const questionTypesSwitch = ({
    question,
    questionIndex,
  }: questionTypesSwitchProps) => {
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
                <Editor
                  content={question.label}
                  onChange={onChange}
                  error={error}
                  editable
                />
              )}
            />
          </div>
        )
      case 'LONG_TEXT':
        return (
          <div className="w-full">
            <Controller
              control={control}
              name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.label`}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Editor
                  content={question.label}
                  onChange={onChange}
                  error={error}
                  editable
                />
              )}
            />
          </div>
        )
      case 'RADIO_GROUP':
        return (
          <div className="w-full">
            <Controller
              control={control}
              name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.label`}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Editor
                  content={question.label}
                  onChange={onChange}
                  error={error}
                  editable
                />
              )}
            />
            <Children
              partIndex={partIndex}
              pageIndex={pageIndex}
              questionIndex={questionIndex}
            />
          </div>
        )
      case 'RADIO_GROUP_HORIZONTAL':
        return (
          <div className="w-full">
            <Controller
              control={control}
              name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.label`}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Editor
                  content={question.label}
                  onChange={onChange}
                  error={error}
                  editable
                />
              )}
            />
            <Children
              partIndex={partIndex}
              pageIndex={pageIndex}
              questionIndex={questionIndex}
            />
          </div>
        )
      case 'MULTI_CHECKBOX':
        return (
          <div className="w-full">
            <Controller
              control={control}
              name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.label`}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Editor
                  content={question.label}
                  onChange={onChange}
                  error={error}
                  editable
                />
              )}
            />
            <Children
              partIndex={partIndex}
              pageIndex={pageIndex}
              questionIndex={questionIndex}
            />
          </div>
        )
      case 'SORTABLE':
        return (
          <div className="w-full">
            <Controller
              control={control}
              name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.label`}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Editor
                  content={question.label}
                  onChange={onChange}
                  error={error}
                  editable
                />
              )}
            />
            <Children
              partIndex={partIndex}
              pageIndex={pageIndex}
              questionIndex={questionIndex}
            />
          </div>
        )
      case 'FREE_TEXT':
        return (
          <div className="w-full">
            <Controller
              control={control}
              name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.label`}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Editor
                  content={question.label}
                  onChange={onChange}
                  error={error}
                  editable
                />
              )}
            />
          </div>
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
      {pages.map((question, questionIndex, { length }) => (
        <section key={question.id} className="space-y-20">
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
                {questionTypesSwitch({ question, questionIndex })}
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
