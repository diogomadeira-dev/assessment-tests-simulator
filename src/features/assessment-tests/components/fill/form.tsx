'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Tabs } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import { FormSchema, OptionalFormSchema } from './schema'
// import ScreenFive from './screens/screenFive'
// import ScreenFour from './screens/screenFour'
// import ScreenNine from './screens/screenNine'
// import ScreenOne from './screens/screenOne'
// import ScreenSix from './screens/screenSix'
// import ScreenThree from './screens/screenThree'
// import ScreenTwo from './screens/screenTwo'

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog'
// import ScreenEight from './screens/screenEight'
// import ScreenFinal from './screens/screenFinal'
// import ScreenSeven from './screens/screenSeven'

export default function ProvaModeloMatematicaEstudodoMeio2Ano() {
  const [value, setValue] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const [isOptional, setIsOptional] = useState(true)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const maxPages = 9

  const form = useForm<z.infer<typeof FormSchema>>({
    // resolver: zodResolver(isOptional ? OptionalFormSchema : FormSchema),
    resolver: zodResolver(OptionalFormSchema),
    defaultValues: {
      email: '',
      pergunta_5: [],
      pergunta_7: [],
      pergunta_9_3: [],
      pergunta_19: [],
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // console.log('test', JSON.stringify(data, null, 2))
    setLoading(false)
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('message', JSON.stringify(data, null, 2))

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email`, {
        cache: 'no-store',
        method: 'post',
        body: formData,
      })
      setLoading(false)
      setSuccess(true)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }

    // if(!isOptional) setShowAlert(true)
  }

  function formatText(input) {
    // Replace double quotes with empty string
    input = input.replace(/"/g, '')

    // Replace underscores with spaces and capitalize the first letter of each word
    return input
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (match) => match.toUpperCase())
  }

  // console.log('form.formState.errors', form.formState.errors)

  useEffect(() => {
    setSuccess(false)
  }, [])

  return (
    <Form {...form}>
      {/* <AlertDialog open={showAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tens a certeza que pretendes terminar a prova?
            </AlertDialogTitle>
            {Object.keys(form.formState.errors).length > 0 ? (
              <AlertDialogDescription>
                Tens perguntas que ainda não foram respondidas. Pretendes
                terminar a prova mesmo assim?
              </AlertDialogDescription>
            ) : (
              <AlertDialogDescription>
                Se decidires terminar não vais poder voltar atrás.
              </AlertDialogDescription>
            )}
            {form?.formState?.errors &&
            Object.keys(form.formState.errors) > 5 ? (
              Object.keys(form.formState.errors).map(
                (fieldName: any) =>
                  form.formState.errors[fieldName] && (
                    <>
                      <Separator />
                      <FormMessage>
                        {formatText(JSON.stringify(fieldName))}
                      </FormMessage>
                    </>
                  ),
              )
            ) : (
              <>

    
              </>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowAlert(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setIsOptional(!isOptional)
                setShowAlert(false)
                setValue(0)
              }}
            >
              Terminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

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

          <Tabs value={value.toString()}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* <ScreenOne setValue={setValue} />
              <ScreenTwo form={form} />
              <ScreenThree form={form} />
              <ScreenFour form={form} />
              <ScreenFive form={form} />
              <ScreenSix form={form} />
              <ScreenSeven form={form} />
              <ScreenEight form={form} />
              <ScreenNine form={form} /> */}

              {/* <ScreenFinal form={form} success={success} setSuccess={setSuccess} /> */}

              <div className="flex flex-row-reverse justify-between py-10">
                {value < maxPages ? (
                  value !== 1 &&
                  value !== 0 && (
                    <Button
                      variant="secondary"
                      onClick={() => setValue((oldState) => oldState + 1)}
                    >
                      Seguinte
                    </Button>
                  )
                ) : (
                  <Button
                    type="button"
                    //  type="submit"
                    onClick={() => {
                      // if (!isOptional) {
                      setShowAlert(true)
                      setSuccess(false)

                      // } else {
                      //  setValue(-1)
                      // }
                    }}
                  >
                    Terminar
                  </Button>
                )}
                {value > 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setValue((oldState) => oldState - 1)}
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
