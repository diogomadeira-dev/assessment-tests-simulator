'use client'

import { dataFaker } from '@/app/(authenticated)/assessment-tests/[id]/page'
import Editor from '@/components/editor'
import { Button } from '@/components/ui/button'
import { Form, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs } from '@/components/ui/tabs'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FillAssessmentInput,
  FillAssessmentInputSchema,
} from '../../api/fill-assessment-test'

export default function FillAssessmentTestForm({ id }: { id: number }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page')) || 0

  const [values, setValues] = useState(null)

  const form = useForm<FillAssessmentInputSchema>({
    resolver: zodResolver(FillAssessmentInput),
  })

  const onSubmit = async (data: FillAssessmentInputSchema) => {
    console.log('🚀 ~ onSubmit ~ data:', data)
  }

  // const getData = () => {
  //   let pageCount = 0
  //   let questionCount = 0
  //   const data = []
  //   dataFaker.parts.forEach((part, partIndex) => {
  //     if (partIndex !== 0) {
  //       pageCount++
  //       data.push({
  //         breakPart: partIndex,
  //         pageNumber: pageCount,
  //       })
  //     }

  //     part.pages.forEach((page, pageIndex) => {
  //       pageCount++
  //       data.push({
  //         partIndex,
  //         pageNumber: pageCount,
  //         questions: page.questions.map((question, questionIndex) => {
  //           questionCount++
  //           return {
  //             questionCount,
  //             ...question,
  //           }
  //         }),
  //       })
  //     })
  //   })

  //   return {
  //     pageCount,
  //     data,
  //   }
  // }

  // const { data, pageCount } = getData()

  // useEffect(() => {
  //   // console.log('data', data)

  //   let pageCount = 0
  //   let questionCount = 0
  //   const data = []
  //   dataFaker.parts.forEach((part, partIndex) => {
  //     if (partIndex !== 0) {
  //       pageCount++
  //       data.push({
  //         breakPart: partIndex,
  //         pageNumber: pageCount,
  //       })
  //     }

  //     part.pages.forEach((page, pageIndex) => {
  //       pageCount++
  //       data.push({
  //         partIndex,
  //         pageNumber: pageCount,
  //         questions: page.questions.map((question, questionIndex) => {
  //           questionCount++
  //           form.setValue(`questions.${questionIndex}.answer`, '')
  //           console.log(`Registering: questions.${questionIndex}.answer`) // Debug log

  //           return {
  //             questionCount,
  //             ...question,
  //           }
  //         }),
  //       })
  //     })
  //   })

  //   setValues({
  //     pageCount,
  //     data,
  //   })
  // }, [dataFaker])

  useEffect(() => {
    console.log('form.formState.errors', form.formState.errors)
  }, [form.formState.errors])

  // if (!values) return 'loading...'

  return (
    <Form {...form}>
      <div className="flex h-screen">
        <div className="container">
          <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
          {/* errors: {JSON.stringify(form.formState.errors)} */}
          <div className="flex justify-between py-12">
            <p className="text-sm text-muted-foreground">
              Prova Modelo 1 | Matemática e Estudo do meio 2º Ano de
              escolaridade
            </p>
            {/* <p className="text-sm text-muted-foreground">
              {page}/{values.pageCount}
            </p> */}
          </div>
          <Tabs value={page.toString()}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* <pre>{JSON.stringify(dataFaker, null, 2)}</pre> */}

              {/* ! TODO: CAN I DE THIS WITH SWITCH??? */}
              {/* {page === 0 ? (
                <StartComponent />
              ) : (
                <PageComponent data={values} />
              )} */}

              {dataFaker.parts.map((part, partIndex) => (
                <div key={partIndex} className="bg-green-400">
                  <p>partIndex - {partIndex}</p>
                  {part.pages.map((page, pageIndex) => (
                    <div key={pageIndex} className="bg-red-400">
                      <p>pageIndex - {pageIndex}</p>
                      {page?.questions &&
                        page?.questions.length > 0 &&
                        page.questions.map((question, questionIndex) => (
                          <div key={questionIndex} className="bg-blue-400">
                            <p>pageIndex - {pageIndex}</p>

                            <FormItem>
                              <Editor
                                key={`editor-${question.label}-${questionIndex}`}
                                content={question.label}
                              />
                              <Input
                                {...form.register(
                                  `parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`,
                                  {
                                    value: '',
                                  },
                                )}
                              />
                              {form.formState.errors?.parts?.[partIndex]
                                ?.pages?.[pageIndex]?.questions?.[questionIndex]
                                ?.answer?.message && (
                                <FormMessage>
                                  {
                                    form.formState.errors?.parts?.[partIndex]
                                      ?.pages?.[pageIndex]?.questions?.[
                                      questionIndex
                                    ]?.answer?.message
                                  }
                                </FormMessage>
                              )}
                            </FormItem>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))}

              <Button type="submit" variant="secondary">
                Submit
              </Button>

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

                {page > 0 && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      router.push(pathname + '?page=' + (Number(page) - 1))
                    }
                  >
                    Voltar
                  </Button>
                )}
              </div>
            </form>
          </Tabs>
        </div>
      </div>
    </Form>
  )
}
