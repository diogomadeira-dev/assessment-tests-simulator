import { z } from 'zod'

export const CreateAssessmentInput = z.object({
  parts: z.array(
    z.object({
      partNumber: z.number(),
    }),
  ),
  pages: z.array(
    z.object({
      pageNumber: z.number(),
      part: z.number(),
    }),
  ),
  questions: z.array(
    z.object({
      type: z.enum(['text']),
      label: z.string().min(2).max(50),
      pageNumber: z.number(),
      part: z.number(),
    }),
  ),

  // questionNumber: z.number(),
  // parts: z.array(
  //   z.object({
  //     name: z.string().min(1).max(5),
  //     pages: z.array(
  //       z.object({
  //         pageNumber: z.number(),
  //         part: z.string().min(1).max(5),
  //         // questions: z.array(
  //         //   z.object({
  //         //     questionNumber: z.number(),
  //         //     type: z.enum(['multiple_choice']),
  //         //     label: z.string().min(2).max(50),
  //         //     // options: z.array(
  //         //     //   z.object({
  //         //     //     id: z.string().min(2).max(50),
  //         //     //     label: z.string().min(2).max(50),
  //         //     //   }),
  //         //     // ),
  //         //   }),
  //         // ),
  //       }),
  //     ),
  //   }),
  // ),
})

export type CreateAssessmentInputSchema = z.infer<typeof CreateAssessmentInput>
