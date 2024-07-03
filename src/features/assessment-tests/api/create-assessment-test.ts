import { getValues } from '@/lib/enum'
import { QuestionTypeEnum } from '@/types/assessment-tests'
import { z } from 'zod'

export type QuestionTypeEnum =
  (typeof QuestionTypeEnum)[keyof typeof QuestionTypeEnum]

// const stringValidate = z.union([
//   z.coerce.number().gte(1, 'Este campo não foi preenchido'),
//   z.string().trim().min(1).max(50),
// ])

const stringValidate = z.string().trim().min(1)

export const CreateAssessmentInput = z.object({
  name: stringValidate,
  subject: stringValidate,
  year: stringValidate,
  parts: z.array(
    z.object({
      pages: z.array(
        z.object({
          questions: z.array(
            z.object({
              number: z.string(),
              label: stringValidate,
              options: z
                .array(
                  z.object({
                    id: z.string(),
                    name: z.string(),
                    image_url: z.string().optional(),
                  }),
                )
                // TODO: optional need to depend on type field
                .optional(),
              type: z.enum(getValues(QuestionTypeEnum)),
            }),
            // .superRefine((data, ctx) => {
            //   // * SHORT_TEXT *
            //   if (
            //     data.type === QuestionTypeEnum.SHORT_TEXT &&
            //     (!data.text || data.text.length < 1)
            //   ) {
            //     ctx.addIssue({
            //       code: 'custom',
            //       message:
            //         'Text must be at least 2 characters long for SHORT_TEXT type',
            //       path: ['text'],
            //     })
            //   }
            //   // * LONG_TEXT *
            //   if (
            //     data.type === QuestionTypeEnum.LONG_TEXT &&
            //     (!data.text || data.text.length < 1)
            //   ) {
            //     ctx.addIssue({
            //       code: 'custom',
            //       message:
            //         'Text must be at least 2 characters long for LONG_TEXT type',
            //       path: ['text'],
            //     })
            //   }
            //   // * RADIO_GROUP *
            //   if (
            //     data.type === QuestionTypeEnum.RADIO_GROUP &&
            //     (!data.array || data.array.length !== 1)
            //   ) {
            //     ctx.addIssue({
            //       code: 'custom',
            //       message:
            //         'There must be exactly one choice for SINGLE_CHOICE type',
            //       path: ['array'],
            //     })
            //   }
            // }),
          ),
        }),
      ),
    }),
  ),
})

export type CreateAssessmentInputSchema = z.infer<typeof CreateAssessmentInput>
