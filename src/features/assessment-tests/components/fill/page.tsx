import { Card, CardContent } from '@/components/ui/card'
import { AlphabeticEnum } from '@/types/assessment-tests'
import { useSearchParams } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../../api/create-assessment-test'
import { FillAssessmentInputSchema } from '../../api/fill-assessment-test'
import { questionTypesSwitch } from './question-types'

type User = {
  id: number
  name: string
  image_url: string
}

export default function PageComponent({
  partIndex,
  pageIndex,
  page,
}: {
  partIndex: number
  pageIndex: number
  page: CreateAssessmentInputSchema['parts'][number]['pages'][number]
}) {
  const searchParams = useSearchParams()

  const pageNumberUrl = Number(searchParams.get('page')) || 0

  const { control, register } = useFormContext<FillAssessmentInputSchema>()

  return (
    <div className="space-y-8">
      {pageIndex === 0 && (
        <p className="h2 text-center text-secondary">
          PART {AlphabeticEnum[partIndex]}
        </p>
      )}

      <Card className="px-4 py-6">
        <CardContent className="space-y-12">
          {page?.questions &&
            page?.questions.length > 0 &&
            page.questions.map((question, questionIndex) => (
              <div key={questionIndex}>
                {questionTypesSwitch({
                  question,
                  partIndex,
                  pageIndex,
                  questionIndex,
                })}
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
