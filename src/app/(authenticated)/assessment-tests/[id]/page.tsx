import Editor from '@/components/editor'

const data = {
  id: 1,
  parts: [
    {
      pages: [
        {
          questions: [
            {
              number: '',
              type: 'SHORT_TEXT',
              label:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"ewfwewef"}]}]}',
            },
          ],
        },
        {
          number: '',
          questions: [
            {
              number: '',
              type: 'SHORT_TEXT',
              label:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"fewfewfewf"}]}]}',
            },
            {
              number: '',
              type: 'SHORT_TEXT',
              label:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"teste 1"}]}]}',
            },
          ],
        },
      ],
    },
  ],
}

const AssessmentTestId = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <div>My Post: {params.id}</div>
      {data.parts.map((part, partIndex) => (
        <div key={`partIndex-${partIndex}`}>
          <p>page: {partIndex}</p>
          {part.pages.map((page, pageIndex) => (
            <div key={`pageIndex-${pageIndex}`}>
              <p>page number: {page.number}</p>
              {page.questions.map((question, questionIndex) => (
                <div key={`questionIndex-${questionIndex}`}>
                  <p>question: {questionIndex}</p>
                  <Editor content={question.label} />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default AssessmentTestId
