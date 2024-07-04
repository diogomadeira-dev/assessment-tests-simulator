import { questionTypesSwitchProps } from '@/types/assessment-tests'
import { FreeTextType } from './free-text'
import { LongTextType } from './long-text'
import { MultiCheckboxType } from './multi-checkbox'
import { RadioGroupType } from './radio-group'
import { RadioGroupHorizontalType } from './radio-group-horizontal'
import { ShortTextType } from './short-text'
import { SortableType } from './sortable'

export const questionTypesSwitch = (props: questionTypesSwitchProps) => {
  switch (props.question.type) {
    case 'SHORT_TEXT':
      return <ShortTextType {...props} />
    case 'LONG_TEXT':
      return <LongTextType {...props} />
    case 'RADIO_GROUP':
      return <RadioGroupType {...props} />
    case 'RADIO_GROUP_HORIZONTAL':
      return <RadioGroupHorizontalType {...props} />
    case 'MULTI_CHECKBOX':
      return <MultiCheckboxType {...props} />
    case 'SORTABLE':
      return <SortableType {...props} />
    case 'FREE_TEXT':
      return <FreeTextType {...props} />
    default:
      return null
  }
}
