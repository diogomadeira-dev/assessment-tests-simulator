'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { nextChar } from '@/utils/common'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import {
  CreateAssessmentInput,
  CreateAssessmentInputSchema,
} from '../api/create-assessment-test'
import { PartSection } from './part-section'

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

  const partFieldArray = useFieldArray({
    control: form.control,
    name: 'parts',
  })

  const onSubmit = (values: CreateAssessmentInputSchema) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {JSON.stringify(form.formState.errors, null, 2)}

        {partFieldArray.fields.map((part, partIndex) => (
          <PartSection
            key={partIndex}
            partFieldArray={partFieldArray}
            part={part}
            partIndex={partIndex}
          />
        ))}

        <section>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              partFieldArray.append({
                name: nextChar(partFieldArray.fields.at(-1)?.name),
                pages: [
                  {
                    pageNumber: 1,
                    questions: [],
                  },
                ],
              })
            }}
          >
            append new part
          </Button>
        </section>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
