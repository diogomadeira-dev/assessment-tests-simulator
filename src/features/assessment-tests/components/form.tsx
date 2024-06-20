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
import { PartSection } from '@/features/assessment-tests/components/part-section'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

const CreateAssessmentTestForm = () => {
  const t = useTranslations()

  const form = useForm<CreateAssessmentInputSchema>({
    resolver: zodResolver(CreateAssessmentInput),
    defaultValues: {
      parts: [
        {
          pages: [
            {
              questions: [],
            },
          ],
        },
      ],
    },
  })

  const { handleSubmit, control } = form

  const onSubmit = (data: CreateAssessmentInputSchema) => console.log(data)

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
        {/* {JSON.stringify(form.formState.errors, null, 2)} */}
        {/* <pre>{JSON.stringify(form.watch(), null, 4)}</pre> */}

        <div className="flex justify-between gap-4 rounded-2xl bg-neutral-100 p-10">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assessment test name</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Prova modelo 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assessment test subject</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Matemática" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assessment test year</FormLabel>
                <FormControl>
                  <Input placeholder="ex: 2º Ano de escolaridade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <PartSection />

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  )
}

export default CreateAssessmentTestForm
