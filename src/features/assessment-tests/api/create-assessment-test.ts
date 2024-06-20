import { getValues } from '@/lib/enum'
import { QuestionTypeEnum } from '@/types/assessment-tests'
import { z } from 'zod'

export type QuestionTypeEnum =
  (typeof QuestionTypeEnum)[keyof typeof QuestionTypeEnum]

const stringValidate = z.string().trim().min(1).max(50)

export const CreateAssessmentInput = z.object({
  name: stringValidate,
  subject: stringValidate,
  year: stringValidate,
  parts: z.array(
    z.object({
      pages: z.array(
        z.object({
          questions: z.array(
            z
              .object({
                number: z.string(),
                text: z.string(),
                type: z.enum(getValues(QuestionTypeEnum)),
              })
              // * SHORT_TEXT *
              .refine(
                (data) => {
                  if (data.type === QuestionTypeEnum.SHORT_TEXT) {
                    return data.text.length > 0
                  }
                  return true
                },
                {
                  message: 'Text is required for SHORT_TEXT type',
                  path: ['text'],
                },
              )
              // * LONG_TEXT *
              .refine(
                (data) => {
                  if (data.type === QuestionTypeEnum.LONG_TEXT) {
                    return data.text.length > 0
                  }
                  return true
                },
                {
                  message: 'Text is required for LONG_TEXT type',
                  path: ['text'],
                },
              ),
          ),
        }),
      ),
    }),
  ),
})

export type CreateAssessmentInputSchema = z.infer<typeof CreateAssessmentInput>
