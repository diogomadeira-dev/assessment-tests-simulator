'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  CreateAssessmentInput,
  CreateAssessmentInputSchema,
} from '../api/create-assessment-test'
import { PartSection } from './part-section'
import { QuestionSection } from './question-section'

export const CreateAssessmentForm = () => {
  const form = useForm<CreateAssessmentInputSchema>({
    resolver: zodResolver(CreateAssessmentInput),
    defaultValues: {
      selectedPage: 0,
      selectedPart: 0,
    },
  })

  const onSubmit = (values: CreateAssessmentInputSchema) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex">
          <PartSection />

          <div>
            <QuestionSection />

            <Button type="submit">Submit</Button>

            <pre>{JSON.stringify(form.watch(), null, 4)}</pre>
          </div>
        </div>
      </form>
    </Form>
  )
}
