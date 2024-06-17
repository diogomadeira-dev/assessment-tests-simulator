'use client'

import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
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

  const { handleSubmit } = form

  const onSubmit = (data: CreateAssessmentInputSchema) => console.log(data)

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {JSON.stringify(form.formState.errors, null, 2)}
        <pre>{JSON.stringify(form.watch(), null, 4)}</pre>

        <PartSection />

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  )
}
