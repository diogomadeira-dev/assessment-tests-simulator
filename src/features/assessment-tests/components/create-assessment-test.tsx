'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import {
  CreateAssessmentInput,
  CreateAssessmentInputSchema,
} from '../api/create-assessment-test'

export const CreateAssessmentForm = () => {
  const form = useForm<CreateAssessmentInputSchema>({
    resolver: zodResolver(CreateAssessmentInput),
    defaultValues: {
      parts: [
        {
          name: 'A',
          pages: [
            {
              pageNumber: 1,
              questions: [
                {
                  questionNumber: 1,
                  type: 'multiple_choice',
                  label: 'question multiple choice 1',
                  options: [
                    {
                      id: 'a',
                      label: 'cat',
                    },
                    {
                      id: 'b',
                      label: 'dog',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'B',
          pages: [
            {
              pageNumber: 1,
              questions: [
                {
                  questionNumber: 1,
                  type: 'multiple_choice',
                  label: 'question multiple choice 2',
                  options: [
                    {
                      id: 'a',
                      label: 'cat',
                    },
                    {
                      id: 'b',
                      label: 'dog',
                    },
                  ],
                },
              ],
            },
            {
              pageNumber: 2,
              questions: [
                {
                  questionNumber: 1,
                  type: 'multiple_choice',
                  label: 'question multiple choice 3',
                  options: [
                    {
                      id: 'a',
                      label: 'cat',
                    },
                    {
                      id: 'b',
                      label: 'dog',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  })

  const { fields, remove } = useFieldArray({
    control: form.control,
    name: 'parts',
  })

  const onSubmit = (values: CreateAssessmentInputSchema) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ul>
          {fields.map((item, index) => {
            return (
              <li key={item.id}>
                <FormField
                  control={form.control}
                  name={`parts.${index}.pages.${index}.questions.${index}.label`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </li>
            )
          })}
        </ul>

        {/* <section>
          <button
            type="button"
            onClick={() => {
              append({ username: '' })
            }}
          >
            append
          </button>
        </section> */}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
