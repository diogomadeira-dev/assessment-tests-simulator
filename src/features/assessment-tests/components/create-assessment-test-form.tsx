'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { AlphabeticEnum } from '@/types/assessment-tests'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileSearch2 } from 'lucide-react'
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

  const { selectedPart, selectedPage, parts } = form.watch()

  const onSubmit = (values: CreateAssessmentInputSchema) => {
    console.log(values)
  }

  const selectedPageIndex = parts[selectedPart].pages.findIndex(
    (page) => page.number === selectedPage,
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
        <div className="flex h-full">
          <PartSection />

          <div className="w-full p-8">
            {form.watch().parts[selectedPart].pages[selectedPageIndex]
              ?.number === selectedPage ? (
              <div>
                <div className="flex justify-between">
                  <p className="h-fit font-black text-neutral-600">
                    {`${t('assessment-test.part')} ${AlphabeticEnum[selectedPart]}`}{' '}
                    - {`${t('assessment-test.page')} ${selectedPage + 1}`}
                  </p>

                  <Button type="submit">Submit</Button>
                </div>

                <QuestionSection />
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-8">
                <FileSearch2 className="h-36 w-36 text-neutral-300" />
                <p className="text-lg text-neutral-600">
                  {t('assessment-test.selectPage')}
                </p>
              </div>
            )}

            {/* <pre>{JSON.stringify(form.watch(), null, 4)}</pre> */}
          </div>
        </div>
      </form>
    </Form>
  )
}
