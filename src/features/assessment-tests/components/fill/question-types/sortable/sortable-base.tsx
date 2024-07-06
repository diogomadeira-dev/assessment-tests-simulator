import { FillAssessmentInputSchema } from '@/features/assessment-tests/api/fill-assessment-test'
import { GripHorizontal } from 'lucide-react'
import Image from 'next/image'
import { Controller, useFormContext } from 'react-hook-form'
import { SortableItemProps } from './sortable-item'

export const SortableBase = ({
  partIndex,
  pageIndex,
  questionIndex,
  optionIndex,
}: SortableItemProps) => {
  const { control } = useFormContext<FillAssessmentInputSchema>()

  return (
    <div className="flex flex-col items-center justify-between space-y-6 px-12 py-6">
      <div>
        <Controller
          name={`parts.${partIndex}.pages.${pageIndex}.questions.${questionIndex}.option.${optionIndex}`}
          control={control}
          render={({ field }) => {
            return (
              <div>
                {field.value?.image_url && (
                  <Image
                    src={field.value.image_url}
                    width={100}
                    height={100}
                    alt={field.value?.name}
                  />
                )}
                {field.value?.name && (
                  <h3 className="text-lg font-semibold">{field.value.name}</h3>
                )}
              </div>
            )
          }}
        />
      </div>
      <GripHorizontal className="h-6 w-6 text-neutral-500" />
    </div>
  )
}
