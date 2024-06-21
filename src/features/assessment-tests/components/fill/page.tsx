import Editor from '@/components/editor'
import { Card, CardContent } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { useSearchParams } from 'next/navigation'

export default function PageComponent({ getData }: { getData: any }) {
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page')) || 0

  const data = getData()[page - 1]

  return (
    <TabsContent value={page > 0 ? page.toString() : ''}>
      <Card>
        <CardContent className="space-y-2">
          <p>página {page}</p>

          {/* {data?.questions.length > 0 && (
            <Editor
              key={`editor-${data}-${data.questions[0].question.label}`}
              content={data.questions[0].question.label}
            />
          )} */}

          {data?.questions.length > 0 &&
            data.questions.map((question, questionIndex) => (
              <div key={`editor-${data}-${questionIndex}`}>
                <p>question.type - {question.question.type}</p>
                <Editor
                  key={`editor-${data}-${question.question.label}-${questionIndex}`}
                  content={question.question.label}
                />
              </div>
            ))}

          {/* {JSON.stringify(data.questions[0].question, null, 2)} */}
        </CardContent>
      </Card>
    </TabsContent>
  )
}
