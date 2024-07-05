import { QuestionTypeEnum } from '@/types/assessment-tests'
import { z } from 'zod'

export type QuestionTypeEnum =
  (typeof QuestionTypeEnum)[keyof typeof QuestionTypeEnum]

const stringValidate = z.string().trim().min(1)

export const FillAssessmentInput = z.object({
  parts: z.array(
    z.object({
      pages: z.array(
        z.object({
          questions: z.array(
            z.object({
              answer: stringValidate,
              option: z.array(
                z.object({
                  id: z.string(),
                  name: z.string().optional(),
                  image_url: z.string().optional(),
                }),
              ),
            }),
          ),
        }),
      ),
    }),
  ),
})

export type FillAssessmentInputSchema = z.infer<typeof FillAssessmentInput>
