import { z } from 'zod'

export const CreateAssessmentInput = z.object({
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
