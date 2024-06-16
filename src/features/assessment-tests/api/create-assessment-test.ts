import { z } from 'zod'

export const CreateAssessmentInput = z.object({
  parts: z.array(
    z.object({
      number: z.number(),
      pages: z.array(
        z.object({
          number: z.number(),
          questions: z.array(
            z.object({
              number: z.number(),
              text: z.string().trim().min(2).max(50),
            }),
          ),
        }),
      ),
    }),
  ),
})

export type CreateAssessmentInputSchema = z.infer<typeof CreateAssessmentInput>
