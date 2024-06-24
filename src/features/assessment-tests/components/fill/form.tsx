'use client'

import { dataFaker } from '@/app/(authenticated)/assessment-tests/[id]/page'
import Editor from '@/components/editor'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CircleAlert } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../../api/create-assessment-test'
import {
  FillAssessmentInput,
  FillAssessmentInputSchema,
} from '../../api/fill-assessment-test'
import StartComponent from './start'

type questionTypesSwitchProps = {
  question: CreateAssessmentInputSchema['parts'][number]['pages'][number]['questions'][number]
  partIndex: number
  pageIndex: number
  questionIndex: number
}

export default function FillAssessmentTestForm({ id }: { id: number }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageNumberUrl = Number(searchParams.get('page')) || 0

  const [tabPage, setTabPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  const form = useForm<FillAssessmentInputSchema>({
    resolver: zodResolver(FillAssessmentInput),
  })

  const onSubmit = async (data: FillAssessmentInputSchema) => {
    console.log('🚀 ~ onSubmit ~ data:', data)
  }

  useEffect(() => {
    setTabPage(pageNumberUrl)

    let pageCounter = 0
    dataFaker.parts.forEach((part, partIndex) =>
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
  }, [dataFaker])

  useEffect(() => {
    router.push(pathname + '?page=' + tabPage)
  }, [tabPage])

  const questionTypesSwitch = ({
    question,
    partIndex,
    pageIndex,
    questionIndex,
  }: questionTypesSwitchProps) => {
    switch (question.type) {
      case 'SHORT_TEXT':
        return (
          <FormField
            control={form.control}
            name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`}
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <Editor
                  key={`editor-${partIndex}-${pageIndex}-${questionIndex}`}
                  content={question.label}
                />
                <FormControl>
                  <Input placeholder="Write here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case 'RADIO_GROUP':
        return (
          <>
            <FormField
              control={form.control}
              name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.answer`}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Notify me about...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {question.options.map((question, questionIndex) => (
                        <FormItem
                          key={`questionIndex-${questionIndex}`}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={question.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {question.name}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )
      // case "TYPE":
      //   return (

      //   )
      default:
        return null
    }
  }

  return (
    <Form {...form}>
      <div className="flex h-screen">
        <div className="container">
          {/* errors: {JSON.stringify(form.formState.errors)} */}
          <div className="flex justify-between py-12">
            <p className="text-sm text-muted-foreground">
              Prova Modelo 1 | Matemática e Estudo do meio 2º Ano de
              escolaridade
            </p>
            <p className="text-sm text-muted-foreground">
              {pageNumberUrl}/{pageCount}
            </p>
          </div>
          <Tabs value={pageNumberUrl.toString()}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* <pre>{JSON.stringify(dataFaker, null, 2)}</pre> */}

              <Tabs
                defaultValue={pageNumberUrl.toString()}
                value={tabPage.toString()}
                onValueChange={(value) => setTabPage(Number(value))}
              >
                <div className="flex justify-between pb-8">
                  <div className="flex gap-4">
                    {pageNumberUrl > 0 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        onClick={() => setTabPage((oldState) => oldState - 1)}
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                    )}
                    <TabsList>
                      <TabsTrigger
                        key={`pageIndex-${0}`}
                        value="0"
                        className="bg-secondary text-secondary-foreground"
                      >
                        Start
                      </TabsTrigger>
                      {dataFaker.parts.map((part, partIndex) =>
                        part.pages.map((page, pageIndex) => (
                          <TabsTrigger
                            key={`pageIndex-${pageIndex}`}
                            value={page.number.toString()}
                            className={cn({
                              'border border-red-500':
                                form.formState.errors?.parts?.[partIndex]
                                  ?.pages?.[pageIndex],
                            })}
                          >
                            {/* // TODO: ADD THIS DYNAMIC WARNING TO TAB TRIGGER COMPONENT */}
                            {form.formState.errors?.parts?.[partIndex]?.pages?.[
                              pageIndex
                            ] && (
                              <CircleAlert className="mr-1 h-4 w-4 text-destructive" />
                            )}
                            {pageNumberUrl === page.number && 'Page '}{' '}
                            {page.number.toString()}
                          </TabsTrigger>
                        )),
                      )}
                    </TabsList>
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      onClick={() => setTabPage((oldState) => oldState + 1)}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button type="submit">Submit</Button>
                </div>

                {/* ! TODO: THIS COMPONENT IS RENDERED EVERYTIME */}
                <StartComponent />

                {dataFaker.parts.map((part, partIndex) => (
                  <div key={partIndex}>
                    {part.pages.map((page, pageIndex) => (
                      <div key={pageIndex}>
                        <TabsContent value={page.number.toString()}>
                          <AnimatePresence mode="wait">
                            {/* ! TODO: ANIMATION NOT WORK ON EXIT */}
                            <motion.div
                              key={`pageIndex-${pageIndex}`}
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -10, opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="space-y-8"
                            >
                              {page?.questions &&
                                page?.questions.length > 0 &&
                                page.questions.map(
                                  (question, questionIndex) => (
                                    <div key={questionIndex}>
                                      {questionTypesSwitch({
                                        question,
                                        partIndex,
                                        pageIndex,
                                        questionIndex,
                                      })}
                                    </div>
                                  ),
                                )}
                            </motion.div>
                          </AnimatePresence>
                        </TabsContent>
                      </div>
                    ))}
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
