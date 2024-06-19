import { getValues } from '@/lib/enum'
import { z } from 'zod'

export const QuestionType = {
  SHORT_TEXT: 'SHORT_TEXT',
  LONG_TEXT: 'LONG_TEXT',
} as const

export type QuestionTypeEnum = (typeof QuestionType)[keyof typeof QuestionType]

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
                type: z.enum(getValues(QuestionType)),
              })
              .refine(
                (data) => {
                  if (data.type === QuestionType.SHORT_TEXT) {
                    return data.text.length > 0
                  }
                  return true
                },
                {
                  message: 'Text is required for SHORT_TEXT type',
                  path: ['text'],
                },
              )
              .refine(
                (data) => {
                  if (data.type === QuestionType.LONG_TEXT) {
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
