import { CreateAssessmentInputSchema } from '@/features/assessment-tests/api/create-assessment-test'
import { UseFormReturn } from 'react-hook-form'

export const updateIndexes = (
  form: UseFormReturn<CreateAssessmentInputSchema>,
) => {
  let partCount = -1
  let pageCount = -1
  if (form.watch().parts && form.watch().parts.length > 0) {
    const updatedIndexes = form.watch().parts.map((partElement) => {
      partCount++
      return {
        ...partElement,
        name: partCount,
        pages: partElement.pages.map((pageElement) => {
          pageCount++
          return {
            ...pageElement,
            number: pageCount,
          }
        }),
      }
    })

    form.setValue('parts', updatedIndexes)
  }
}
