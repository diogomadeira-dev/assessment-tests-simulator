'use client'

import { dataFaker } from '@/app/(authenticated)/assessment-tests/[id]/page'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Tabs } from '@/components/ui/tabs'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FillAssessmentInput,
  FillAssessmentInputSchema,
} from '../../api/fill-assessment-test'
import PageComponent from './page'
import StartComponent from './start'

export default function FillAssessmentTestForm({ id }: { id: number }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') || 0

  const [value, setValue] = useState(1)

  const maxPages = 9

  const form = useForm<FillAssessmentInputSchema>({
    resolver: zodResolver(FillAssessmentInput),
  })

  const onSubmit = async (data: FillAssessmentInputSchema) => {
    console.log('🚀 ~ onSubmit ~ data:', data)
  }

  const getData = () => {
    let pageCount = 0
    const data = dataFaker.parts.flatMap((part, partIndex) =>
      part.pages.map((page, pageIndex) => {
        pageCount++
        return {
          partIndex,
          pageNumber: pageCount,
          questions: page.questions.map((question, questionIndex) => question),
        }
      }),
    )

    return data
  }

  return (
    <Form {...form}>
      <div className="flex h-screen">
        <div className="container">
          <div className="flex justify-between py-12">
            <p className="text-sm text-muted-foreground">
              Prova Modelo 1 | Matemática e Estudo do meio 2º Ano de
              escolaridade
            </p>
            {value !== 0 && (
              <p className="text-sm text-muted-foreground">
                {value}/{maxPages}
              </p>
            )}
          </div>

          <Tabs value={page.toString()}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* <pre>{JSON.stringify(getData(), null, 2)}</pre> */}

              <StartComponent />
              <PageComponent getData={getData} />

              <div className="flex flex-row-reverse justify-between py-10">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    router.push(pathname + '?page=' + (Number(page) + 1))
                  }
                >
                  Seguinte
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    router.push(pathname + '?page=' + (Number(page) - 1))
                  }
                >
                  Voltar
                </Button>
              </div>
            </form>
          </Tabs>
        </div>
      </div>
    </Form>
  )
}
