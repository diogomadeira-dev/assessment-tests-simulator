import FillAssessmentTestForm from '@/features/assessment-tests/components/fill/form'

export const dataFaker = {
  id: 1,
  name: 'Prova Modelo 1',
  subject: 'Matemática e Estudo do meio',
  year: '2º Ano de escolaridade',
  parts: [
    {
      pages: [
        {
          questions: [
            {
              number: '',
              type: 'SHORT_TEXT',
              label:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Question 1 - "},{"type":"text","text":"Pagina 1 - Parte A"}]}]}',
            },
            {
              number: '',
              type: 'SHORT_TEXT',
              label:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Question 2 - "},{"type":"text","text":"Pagina 1 - Parte A"}]}]}',
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
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Question 1 - "},{"type":"text","text":"Pagina 2 - Parte A"}]}]}',
            },
            {
              number: '',
              type: 'SHORT_TEXT',
              label:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Question 2 - "},{"type":"text","text":"Pagina 2 - Parte A"}]}]}',
            },
          ],
        },
      ],
    },
    {
      pages: [
        {
          number: '',
          questions: [
            {
              number: '',
              type: 'SHORT_TEXT',
              label:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Question 1 - "},{"type":"text","text":"Pagina 1 - Parte B"}]}]}',
            },
            {
              number: '',
              type: 'SHORT_TEXT',
              label:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Question 2 - "},{"type":"text","text":"Pagina 1 - Parte B"}]}]}',
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
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Question 1 - "},{"type":"text","text":"Pagina 2 - Parte B"}]}]}',
            },
          ],
        },
      ],
    },
  ],
}

const AssessmentTestId = ({ params }: { params: { id: number } }) => {
  return <FillAssessmentTestForm id={params.id} />
}

export default AssessmentTestId
