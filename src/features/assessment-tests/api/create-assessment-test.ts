import { getValues } from '@/lib/enum'
import { QuestionTypeEnum } from '@/types/assessment-tests'
import { z } from 'zod'

export type QuestionTypeEnum =
  (typeof QuestionTypeEnum)[keyof typeof QuestionTypeEnum]

const stringValidate = z.union([
  z.coerce.number().gte(1, 'Este campo não foi preenchido'),
  z.string().trim().min(1).max(50),
])

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
                text: z.string().optional(),
                array: z.array(z.string()),
                type: z.enum(getValues(QuestionTypeEnum)),
              })
              .superRefine((data, ctx) => {
                if (
                  data.type === QuestionTypeEnum.SHORT_TEXT &&
                  (!data.text || data.text.length < 1)
                ) {
                  ctx.addIssue({
                    code: 'custom',
                    message:
                      'Text must be at least 2 characters long for SHORT_TEXT type',
                    path: ['text'],
                  })
                }
                if (
                  data.type === QuestionTypeEnum.RADIO_GROUP &&
                  (!data.array || data.array.length !== 1)
                ) {
                  ctx.addIssue({
                    code: 'custom',
                    message:
                      'There must be exactly one choice for SINGLE_CHOICE type',
                    path: ['choices'],
                  })
                }
              }),

            // // * SHORT_TEXT *
            // .refine(
            //   (data) => {
            //     if (data.type === QuestionTypeEnum.SHORT_TEXT) {
            //       return data.text.length > 0
            //     }
            //     return true
            //   },
            //   {
            //     message: 'Text is required for SHORT_TEXT type',
            //     path: ['text'],
            //   },
            // )
            // // * LONG_TEXT *
            // .refine(
            //   (data) => {
            //     if (data.type === QuestionTypeEnum.LONG_TEXT) {
            //       return data.text.length > 0
            //     }
            //     return true
            //   },
            //   {
            //     message: 'Text is required for LONG_TEXT type',
            //     path: ['text'],
            //   },
            // ),
          ),
        }),
      ),
    }),
  ),
})

export type CreateAssessmentInputSchema = z.infer<typeof CreateAssessmentInput>
