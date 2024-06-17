import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateAssessmentInputSchema } from '../api/create-assessment-test'
import { PageSection } from './page-section'

export const PartSection = () => {
  const t = useTranslations()

  const form = useFormContext<CreateAssessmentInputSchema>()

  const { control } = form

  const {
    fields,
    append: appendField,
    remove: removeField,
  } = useFieldArray({
    control,
    name: 'parts',
  })

  return (
    <div>
      {fields.map((field, partIndex) => (
        <fieldset key={field.id}>
          <legend>Part {partIndex}</legend>

          <FormField
            control={control}
            name={`parts.${partIndex}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parte Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PageSection partIndex={partIndex} />
          <section
            style={{
              marginTop: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <Button type="button" onClick={() => removeField(partIndex)}>
              Remove Part
            </Button>
            <Button
              type="button"
              onClick={() => appendField({ name: '', pages: [] })}
            >
              Append Part
            </Button>
          </section>
        </fieldset>
      ))}
    </div>
  )
}
