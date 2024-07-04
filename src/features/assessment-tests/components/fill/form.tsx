'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { AlphabeticEnum } from '@/types/assessment-tests'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, CircleAlert } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FillAssessmentInput,
  FillAssessmentInputSchema,
} from '../../api/fill-assessment-test'
import assessmentTestOne from './../../../../../temp/test-one.json'
import PageComponent from './page'
import StartComponent from './start'

export default function FillAssessmentTestForm({ id }: { id: number }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageNumberUrl = searchParams.get('page') || '0'

  const [tabPage, setTabPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  const form = useForm<FillAssessmentInputSchema>({
    resolver: zodResolver(FillAssessmentInput),
    defaultValues: {
      parts: [
        {
          pages: [
            {
              questions: [
                {
                  answer: 'a1a05199-01fc-49b9-b5b4-07bf4fdacc09',
                },
                {
                  answer: '1db3d887-a1a9-4e35-81c4-3fdd7bb18d90',
                },
                {
                  answer: '18b4151e-4d7f-4bca-a5f3-9eca5d550f9f',
                },
                {
                  answer: '44e27dc1-0805-4915-8078-eaacc3aeab8a',
                },
                {
                  answer:
                    '["4d051c0b-dd08-48b3-8e32-31b40822ac0a","17f03faa-9db6-49c8-be13-104f734fd867","d1540280-db40-4fa3-a7af-dd881522e020"]',
                },
              ],
            },
          ],
        },
      ],
    },
  })

  const assessmentTestData = assessmentTestOne

  const onSubmit = async (data: FillAssessmentInputSchema) => {
    console.log('🚀 ~ onSubmit ~ data:', data)
  }

  useEffect(() => {
    setTabPage(Number(pageNumberUrl))

    let pageCounter = 0
    assessmentTestData.parts.forEach((part, partIndex) =>
      part.pages.forEach((page, pageIndex) => {
        pageCounter++
        page.questions.forEach((question, questionIndex) => {
          form.register(
            `parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`,
            {
              value: '',
            },
          )
        })
      }),
    )

    setPageCount(pageCounter)
  }, [assessmentTestData])

  useEffect(() => {
    router.push(pathname + '?page=' + tabPage)
  }, [tabPage])

  return (
    <Form {...form}>
      <div className="flex h-screen">
        <div className="container">
          {/* errors: {JSON.stringify(form.formState.errors)} */}
          <div className="flex justify-between py-2">
            <p className="text-sm text-muted-foreground">
              {assessmentTestData.name} | {assessmentTestData.subject}{' '}
              {assessmentTestData.year}
            </p>
            <p className="text-sm text-muted-foreground">
              {pageNumberUrl}/{pageCount}
            </p>
          </div>
          <Tabs value={pageNumberUrl.toString()}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* <pre>{JSON.stringify(assessmentTestData, null, 2)}</pre> */}

              <Tabs
                defaultValue={pageNumberUrl.toString()}
                value={tabPage.toString()}
                onValueChange={(value) => setTabPage(Number(value))}
              >
                <div className="flex justify-between py-8">
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => setTabPage((oldState) => oldState - 1)}
                      disabled={Number(pageNumberUrl) === 0}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>

                    <TabsList className="items-end">
                      <TabsTrigger value="0" className="font-extrabold">
                        Start
                      </TabsTrigger>
                      {assessmentTestData.parts.map((part, partIndex) => {
                        return (
                          <div key={`partIndex-${partIndex}`}>
                            <div className="flex items-end gap-1">
                              {/* <div>
                                {partIndex > 0 && (
                                  <TabsTrigger
                                    value={part.id}
                                    className="font-extrabold"
                                  >
                                    Stop
                                  </TabsTrigger>
                                )}
                              </div> */}
                              <div>
                                <div className="flex flex-col items-center pb-2">
                                  <p className="text-sm">
                                    Part {AlphabeticEnum[partIndex]}
                                  </p>
                                  <Separator className="border border-secondary" />
                                </div>

                                <div className="flex flex-row gap-1">
                                  {part.pages.map((page, pageIndex) => (
                                    <TabsTrigger
                                      key={`pageIndex-${pageIndex}`}
                                      value={page.number.toString()}
                                      className={cn({
                                        'border border-warning':
                                          form.formState.errors?.parts?.[
                                            partIndex
                                          ]?.pages?.[pageIndex],
                                      })}
                                    >
                                      {/* // TODO: ADD THIS DYNAMIC WARNING TO TAB TRIGGER COMPONENT */}
                                      {form.formState.errors?.parts?.[partIndex]
                                        ?.pages?.[pageIndex] && (
                                        <CircleAlert className="mr-1 h-4 w-4 text-warning" />
                                      )}
                                      {/* {pageNumberUrl === page.number && 'Page '}{' '} */}
                                      {page.number.toString()}
                                    </TabsTrigger>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </TabsList>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => setTabPage((oldState) => oldState + 1)}
                      disabled={Number(pageNumberUrl) >= pageCount}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button variant="secondary" type="submit">
                    Submit
                  </Button>
                </div>

                {/* ! TODO: THIS COMPONENT IS RENDERED EVERYTIME */}
                {tabPage === 0 && <StartComponent />}

                {assessmentTestData.parts.map((part, partIndex) => (
                  <div key={partIndex}>
                    <TabsContent
                      key={`page-${tabPage}`}
                      value={tabPage.toString()}
                    >
                      {/* {partIndex > 0 && (
                        <TabsContent value={part.id}>
                          <BreakComponent partIndex={partIndex} />
                        </TabsContent>
                      )} */}

                      {part.pages.map((page, pageIndex) => (
                        <div key={pageIndex}>
                          {/* ! TODO: ANIMATION NOT WORK ON EXIT */}
                          {/* <AnimatePresence mode="wait">
                            <motion.div
                              key={`pageIndex-${pageIndex}`}
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -10, opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="space-y-8"
                            > */}
                          <TabsContent
                            key={`${page.number}`}
                            value={`${page.number}`}
                          >
                            <PageComponent
                              partIndex={partIndex}
                              pageIndex={pageIndex}
                              page={page}
                            />
                          </TabsContent>
                          {/* </motion.div>
                          </AnimatePresence> */}
                        </div>
                      ))}
                    </TabsContent>
                  </div>
                ))}
              </Tabs>

              <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
            </form>
          </Tabs>
        </div>
      </div>
    </Form>
  )
}
