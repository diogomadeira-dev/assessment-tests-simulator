'use client'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  CreateAssessmentInput,
  CreateAssessmentInputSchema,
} from '@/features/assessment-tests/api/create-assessment-test'
import { zodResolver } from '@hookform/resolvers/zod'
// import { CreateAssessmentForm } from '@/features/assessment-tests/components/create-assessment-test-form'

// const CreateAssessmentTest = () => {
//   return (
//     <>
//       <CreateAssessmentForm />
//     </>
//   )
// }

// export default CreateAssessmentTest

import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form'

interface PageProps {
  partIndex: number
}

interface QuestionProps {
  partIndex: number
  pageIndex: number
}

const Question = ({ partIndex, pageIndex }: QuestionProps) => {
  const { control } = useFormContext<CreateAssessmentInputSchema>()
  const {
    fields: children,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray({
    name: `parts.${partIndex}.pages.${pageIndex}.questions`,
  })

  return (
    <fieldset>
      <legend>Question</legend>
      {children.map((child, questionIndex) => (
        <section
          key={child.id}
          style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}
        >
          <FormField
            control={control}
            name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.number`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.text`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question text</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="button" onClick={() => removeChild(questionIndex)}>
            Remove Question
          </Button>
        </section>
      ))}
      <Button type="button" onClick={() => appendChild({})}>
        Append Question
      </Button>
    </fieldset>
  )
}

const Page = ({ partIndex }: PageProps) => {
  const { control } = useFormContext<CreateAssessmentInputSchema>()
  const {
    fields: children,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray<CreateAssessmentInputSchema>({
    name: `parts.${partIndex}.pages`,
  })

  return (
    <fieldset>
      <legend>Page</legend>
      {children.map((child, pageIndex) => (
        <section
          key={child.id}
          style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}
        >
          {/* <Input {...register(`parts.${partIndex}.page.${pageIndex}.name`)} /> */}

          <FormField
            control={control}
            name={`parts.${partIndex}.pages.${pageIndex}.number`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Question partIndex={partIndex} pageIndex={pageIndex} />
          <Button type="button" onClick={() => removeChild(pageIndex)}>
            Remove Page
          </Button>
        </section>
      ))}
      <Button
        type="button"
        onClick={() =>
          appendChild({
            number: '',
            questions: [
              {
                number: '',
                text: '',
              },
            ],
          })
        }
      >
        Append Page
      </Button>
    </fieldset>
  )
}

const onSubmit = (data: CreateAssessmentInputSchema) => console.log(data)

export default function App() {
  const form = useForm<CreateAssessmentInputSchema>({
    resolver: zodResolver(CreateAssessmentInput),
    defaultValues: {
      parts: [
        {
          name: '',
          pages: [
            {
              number: '',
              questions: [
                {
                  number: '',
                  text: '',
                },
              ],
            },
          ],
        },
      ],
    },
  })

  const { control, handleSubmit } = form

  const {
    fields,
    append: appendField,
    remove: removeField,
  } = useFieldArray({
    control,
    name: 'parts',
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {JSON.stringify(form.formState.errors, null, 2)}
        <pre>{JSON.stringify(form.watch(), null, 4)}</pre>
        {fields.map((field, partIndex) => (
          <fieldset key={field.id}>
            <legend>Part {partIndex}</legend>

            <FormField
              control={control}
              name={`parts.${partIndex}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parte Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Page partIndex={partIndex} />
            <section
              style={{
                marginTop: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <Button type="button" onClick={() => removeField(partIndex)}>
                Remove Part
              </Button>
              <Button
                type="button"
                onClick={() => appendField({ name: '', pages: [] })}
              >
                Append Part
              </Button>
            </section>
          </fieldset>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  )
}
