import { z } from 'zod'

const stringValidate = z.string().trim().min(1).max(50)

const QuestionTypeEnum = z.enum(['SHORT_TEXT', 'LONG_TEXT'])

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
                type: QuestionTypeEnum,
              })
              .refine(
                (data) => {
                  if (data.type === QuestionTypeEnum.Enum.SHORT_TEXT) {
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
                  if (data.type === QuestionTypeEnum.Enum.LONG_TEXT) {
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
