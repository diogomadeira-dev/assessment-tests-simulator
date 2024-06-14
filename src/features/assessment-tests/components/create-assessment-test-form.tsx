'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { AlphabeticEnum } from '@/types/assessment-tests'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import {
  CreateAssessmentInput,
  CreateAssessmentInputSchema,
} from '../api/create-assessment-test'
import { PartSection } from './part-section'
import { QuestionSection } from './question-section'

export const CreateAssessmentForm = () => {
  const t = useTranslations()

  const form = useForm<CreateAssessmentInputSchema>({
    resolver: zodResolver(CreateAssessmentInput),
    defaultValues: {
      selectedPart: 0,
      selectedPage: 0,
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
          <PartSection />

          <div className="w-full p-8">
            <div className="flex justify-between">
              <p className="h-fit font-black text-neutral-600">
                {`${t('assessment-test.part')} ${AlphabeticEnum[form.watch().selectedPart]}`}{' '}
                -{' '}
                {`${t('assessment-test.page')} ${form.watch().selectedPage + 1}`}
              </p>

              <Button type="submit">Submit</Button>
            </div>

            <QuestionSection />

            <pre>{JSON.stringify(form.watch(), null, 4)}</pre>
          </div>
        </div>
      </form>
    </Form>
  )
}
