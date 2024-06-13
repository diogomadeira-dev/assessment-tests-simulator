'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CreateAssessmentInput,
  CreateAssessmentInputSchema,
} from '../api/create-assessment-test'
import { PartSection } from './part-section'
import { QuestionSection } from './question-section'

export const CreateAssessmentForm = () => {
  // ! TODO: REVAMP TO REDUX LOCAL STATE
  const [selectedPart, setSelectedPart] = useState(0)
  const [selectedPage, setSelectedPage] = useState(0)

  const form = useForm<CreateAssessmentInputSchema>({
    resolver: zodResolver(CreateAssessmentInput),
    defaultValues: {
      parts: [
        {
          name: 0,
          pages: [
            {
              number: 0,
              questions: [],
            },
          ],
        },
      ],
    },
  })

  const onSubmit = (values: CreateAssessmentInputSchema) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex">
          <PartSection
            selectedPart={selectedPart}
            setSelectedPart={setSelectedPart}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />

          <div>
            <QuestionSection
              selectedPart={selectedPart}
              selectedPage={selectedPage}
            />

            <Button type="submit">Submit</Button>

            <pre>{JSON.stringify(form.watch(), null, 4)}</pre>
          </div>
        </div>
      </form>
    </Form>
  )
}
