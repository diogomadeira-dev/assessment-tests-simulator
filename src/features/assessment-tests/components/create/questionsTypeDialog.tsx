import { QuestionTypeCard } from '@/components/question-type-card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { QuestionType } from '@/types/assessment-tests'

export function QuestionsTypeDialog({
  appendPage,
}: {
  appendPage: (questions: {
    number: string
    label: string
    type: QuestionType
  }) => void
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          // onClick={() => appendChild({ number: '', text: '' })}
        >
          Append Question
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Questions Type</DialogTitle>
          <DialogDescription>
            Escolhe um tipo de pergunta para adicionar à página
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <DialogClose asChild>
            <div>
              <QuestionTypeCard
                title="Caixa de texto"
                description="Caixa de texto simples"
                action={() =>
                  appendPage({
                    number: '',
                    label: '',
                    type: 'SHORT_TEXT',
                  })
                }
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </QuestionTypeCard>
            </div>
          </DialogClose>
          <DialogClose asChild>
            <div>
              <QuestionTypeCard
                title="Caixa de texto grande"
                description="Caixa de texto grande"
                action={() =>
                  appendPage({
                    number: '',
                    label: '',
                    type: 'LONG_TEXT',
                  })
                }
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </QuestionTypeCard>
            </div>
          </DialogClose>
          <DialogClose asChild>
            <div>
              <QuestionTypeCard
                title="Escolha única"
                description="Escolha única"
                action={() =>
                  appendPage({
                    number: '',
                    label: '',
                    type: 'RADIO_GROUP',
                  })
                }
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </QuestionTypeCard>
            </div>
          </DialogClose>
          <DialogClose asChild>
            <div>
              <QuestionTypeCard
                title="Escolha única Horizontal"
                description="Escolha única"
                action={() =>
                  appendPage({
                    number: '',
                    label: '',
                    type: 'RADIO_GROUP_HORIZONTAL',
                  })
                }
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </QuestionTypeCard>
            </div>
          </DialogClose>
          <DialogClose asChild>
            <div>
              <QuestionTypeCard
                title="Escolha múltipla"
                description="Escolha múltipla"
                action={() =>
                  appendPage({
                    number: '',
                    label: '',
                    type: 'MULTI_CHECKBOX',
                  })
                }
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </QuestionTypeCard>
            </div>
          </DialogClose>

          <DialogClose asChild>
            <QuestionTypeCard
              title="Ligação de pares"
              description="Ligação de pares"
              action={() =>
                appendPage({
                  number: '',
                  label: '',
                  type: 'RADIO_GROUP',
                })
              }
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </QuestionTypeCard>
          </DialogClose>
          <DialogClose asChild>
            <QuestionTypeCard
              title="Ordenar campos"
              description="Ordenar campos"
              action={() =>
                appendPage({
                  number: '',
                  label: '',
                  type: 'RADIO_GROUP',
                })
              }
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </QuestionTypeCard>
          </DialogClose>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
