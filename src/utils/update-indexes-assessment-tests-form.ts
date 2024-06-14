import { CreateAssessmentInputSchema } from '@/features/assessment-tests/api/create-assessment-test'
import { UseFormReturn } from 'react-hook-form'

export const updateIndexes = (
  form: UseFormReturn<CreateAssessmentInputSchema>,
) => {
  let partCount = -1
  let pageCount = -1
  let questionCount = -1

  if (form.watch().parts && form.watch().parts.length > 0) {
    const updatedIndexes = form.watch().parts.map((partElement) => {
      partCount++
      return {
        // ...partElement,
        number: partCount,
        pages: partElement.pages.map((pageElement) => {
          pageCount++
          console.log(
            '🚀 ~ pages:partElement.pages.map ~ pageCount:',
            pageCount,
            pageElement,
          )

          return {
            // ...pageElement,
            number: pageCount,
            questions: pageElement.questions.map((questionElement) => {
              questionCount++
              return {
                ...questionElement,
                number: questionCount,
              }
            }),
          }
        }),
      }
    })

    form.setValue('parts', updatedIndexes)
  }
}
