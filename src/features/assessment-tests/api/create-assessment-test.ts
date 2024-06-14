import { z } from 'zod'

export const CreateAssessmentInput = z.object({
  selectedPage: z.number(),
  selectedPart: z.number(),
  parts: z.array(
    z.object({
      name: z.number(),
      pages: z.array(
        z.object({
          number: z.number(),
          questions: z.array(
            z.object({
              text: z.string().trim().min(2).max(50),
            }),
          ),
        }),
      ),
    }),
  ),
})

export type CreateAssessmentInputSchema = z.infer<typeof CreateAssessmentInput>
