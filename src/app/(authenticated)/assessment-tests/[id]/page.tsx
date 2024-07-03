import FillAssessmentTestForm from '@/features/assessment-tests/components/fill/form'

export const dataFaker = {
  id: 1,
  name: 'Prova Modelo 1',
  subject: 'Matemática e Estudo do meio',
  year: '2º Ano de escolaridade',
  parts: [
    {
      id: 'e0d6cebb-599e-47a1-a16f-49f5fcc54bc7',
      pages: [
        {
          number: 1,
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
          number: 2,
          questions: [
            {
              number: '',
              type: 'SHORT_TEXT',
              label:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Question 3 - "},{"type":"text","text":"Pagina 2 - Parte A"}]}]}',
            },
            {
              number: '',
              type: 'RADIO_GROUP',
              options: [
                {
                  id: 'e0d6cebb-599e-47a1-a16f-49f5fcc74bc1',
                  name: 'option 1',
                },
                {
                  id: '90a1fd3d-c12c-445b-a1e9-bb1bd7d47e24',
                  name: 'option 2',
                },
                {
                  id: 'b1dae93b-f532-40ac-b2c8-bdfaa61e26d0',
                  name: 'option 3',
                },
              ],
              label:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Question 4 - "},{"type":"text","text":"Pagina 2 - Parte A"}]}]}',
            },
          ],
        },
      ],
    },
    {
      id: 'e0d6cebb-599e-47a1-a16f-49f5hcc54bj9',
      pages: [
        {
          number: 3,
          questions: [
            {
              number: '',
              type: 'SHORT_TEXT',
              label:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Question 5 - "},{"type":"text","text":"Pagina 1 - Parte B"}]}]}',
            },
            {
              number: '',
              type: 'SHORT_TEXT',
              label:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Question 6 - "},{"type":"text","text":"Pagina 1 - Parte B"}]}]}',
            },
          ],
        },
        {
          number: 4,
          questions: [
            {
              number: '',
              type: 'SHORT_TEXT',
              label:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Question 7 - "},{"type":"text","text":"Pagina 2 - Parte B"}]}]}',
            },
            {
              number: '',
              label:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Test "},{"type":"text","marks":[{"type":"bold"}],"text":"Radio group"}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Isto é uma descrição de exemplo"}]}]}',
              type: 'RADIO_GROUP',
              options: [
                {
                  id: '75325822-6d93-46cd-adad-93cc975ea8aa',
                  name: '11',
                },
                {
                  id: '50fb4632-b725-4254-8958-5e6a03df0056',
                  name: '22',
                },
                {
                  id: 'd3498490-3b7c-46c1-95c6-ad616aefe52b',
                  name: '33',
                },
              ],
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
