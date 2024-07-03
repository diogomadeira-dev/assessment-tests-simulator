import { ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

type QuestionTypeCard = {
  title: string
  description: string
  action: () => void
  children: ReactNode
}

export const QuestionTypeCard = ({
  title,
  description,
  action,
  children,
}: QuestionTypeCard) => {
  return (
    <Card
      className="my-8 h-64 cursor-pointer shadow-lg duration-300 hover:-translate-y-1"
      onClick={action}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
