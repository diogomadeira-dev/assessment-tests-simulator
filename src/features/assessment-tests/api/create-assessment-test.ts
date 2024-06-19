import { z } from 'zod'

const stringValidate = z.string().trim().min(1).max(50)

export const CreateAssessmentInput = z.object({
  name: stringValidate,
  subject: stringValidate,
  year: stringValidate,
  parts: z.array(
    z.object({
      // name: z.string(),
      pages: z.array(
        z.object({
          // number: z.string(),
          questions: z.array(
            z.object({
              number: z.string(),
              text: z.string().trim().min(2).max(50),
            }),
          ),
        }),
      ),
    }),
  ),
})

export type CreateAssessmentInputSchema = z.infer<typeof CreateAssessmentInput>
