import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { QuestionType } from '@/types/assessment-tests'

export function QuestionsTypeDialog({
  appendPage,
}: {
  appendPage: (questions: {
    number: string
    text: string
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
        <div className="flex items-center space-x-2">
          <DialogClose asChild>
            <Card
              className="cursor-pointer"
              onClick={() =>
                appendPage({ number: '', text: '', type: 'SHORT_TEXT' })
              }
            >
              <CardHeader>
                <CardTitle>Short Text</CardTitle>
                <CardDescription>Text input</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </DialogClose>
          <DialogClose asChild>
            <Card
              className="cursor-pointer"
              onClick={() =>
                appendPage({ number: '', text: '', type: 'LONG_TEXT' })
              }
            >
              <CardHeader>
                <CardTitle>Long Text</CardTitle>
                <CardDescription>Text input</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
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
