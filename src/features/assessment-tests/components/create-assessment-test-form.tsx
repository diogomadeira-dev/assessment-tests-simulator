'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  CreateAssessmentInput,
  CreateAssessmentInputSchema,
} from '../api/create-assessment-test'
import { PartSection } from './part-section'

export const CreateAssessmentForm = () => {
  const form = useForm<CreateAssessmentInputSchema>({
    resolver: zodResolver(CreateAssessmentInput),
    defaultValues: {
      // parts: [
      //   {
      //     partNumber: 0,
      //   },
      // ],
      // pages: [
      //   {
      //     pageNumber: 0,
      //     part: 0,
      //   },
      // ],
      // questions: [
      //   {
      //     type: 'text',
      //     label: 'Question 0',
      //     pageNumber: 0,
      //     part: 0,
      //   },
      // ],
      // parts: [
      //   {
      //     name: 'A',
      //     pages: [
      //       {
      //         pageNumber: 1,
      //         part: 'A',
      //       },
      //     ],
      //   },
      // ],
      // parts: [
      //   {
      //     name: 'A',
      //     pages: [
      //       {
      //         pageNumber: 1,
      //         questions: [
      //           {
      //             questionNumber: 1,
      //             type: 'multiple_choice',
      //             label: 'question multiple choice 1',
      //             options: [
      //               {
      //                 id: 'a',
      //                 label: 'cat',
      //               },
      //               {
      //                 id: 'b',
      //                 label: 'dog',
      //               },
      //             ],
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     name: 'B',
      //     pages: [
      //       {
      //         pageNumber: 1,
      //         questions: [
      //           {
      //             questionNumber: 2,
      //             type: 'multiple_choice',
      //             label: 'question multiple choice 2',
      //             options: [
      //               {
      //                 id: 'a',
      //                 label: 'cat',
      //               },
      //               {
      //                 id: 'b',
      //                 label: 'dog',
      //               },
      //             ],
      //           },
      //         ],
      //       },
      //       {
      //         pageNumber: 2,
      //         questions: [
      //           {
      //             questionNumber: 3,
      //             type: 'multiple_choice',
      //             label: 'question multiple choice 3',
      //             options: [
      //               {
      //                 id: 'a',
      //                 label: 'cat',
      //               },
      //               {
      //                 id: 'b',
      //                 label: 'dog',
      //               },
      //             ],
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
    },
  })

  // const partFieldArray = useFieldArray({
  //   control: form.control,
  //   name: 'parts',
  // })

  const onSubmit = (values: CreateAssessmentInputSchema) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <pre>{JSON.stringify(form.watch(), null, 4)}</pre>

        <PartSection />

        {/* {partFieldArray.fields.map((part, partIndex) => (
          <PartSection key={partIndex} part={part} partIndex={partIndex} />
          // <div key={partIndex}>
          //   <p>PART {part.partNumber}</p>
          // </div>
          // <React.Fragment key={partIndex}>
          //   <FormField
          //     control={form.control}
          //     name={`parts.${partIndex}.partNumber`}
          //     render={({ field }) => (
          //       <FormItem>
          //         <FormLabel>{part.partNumber}</FormLabel>
          //         <FormControl>
          //           <Input placeholder="" {...field} />
          //         </FormControl>
          //         <FormMessage />
          //       </FormItem>
          //     )}
          //   />
          // </React.Fragment>

          // <PartSection
          //   key={partIndex}
          //   partFieldArray={partFieldArray}
          //   part={part}
          //   partIndex={partIndex}
          // />
        ))} */}

        {/* <section>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              // const newQuestionNumber = form.watch('questionNumber') + 1

              // const partIndex = form.watch().parts.length

              // const previousPartLenght =
              //   partIndex > 0
              //     ? form.watch().parts[partIndex - 1].pages.length
              //     : 0

              // partFieldArray.append({
              //   name: nextChar(partFieldArray.fields.at(-1)?.name),
              //   pages: [
              //     {
              //       pageNumber:
              //         partIndex > 0
              //           ? previousPartLenght + (length + 1)
              //           : length + 1,
              //       part: nextChar(partFieldArray.fields.at(-1)?.name),
              //       // questions: [],
              //     },
              //   ],
              // })

              // // Set new question number
              // form.setValue('questionNumber', newQuestionNumber)

              partFieldArray.append({
                partNumber:
                  partFieldArray.fields.length > 0
                    ? partFieldArray.fields.at(-1)?.partNumber + 1
                    : 0,
              })
            }}
          >
            append new part
          </Button>
        </section> */}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
