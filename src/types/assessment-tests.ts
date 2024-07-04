export enum AlphabeticEnum {
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
}

export const QuestionTypeEnum = {
  SHORT_TEXT: 'SHORT_TEXT',
  LONG_TEXT: 'LONG_TEXT',
  RADIO_GROUP: 'RADIO_GROUP', // * Single choice
  RADIO_GROUP_HORIZONTAL: 'RADIO_GROUP_HORIZONTAL', // * Single choice horizontal
  MULTI_CHECKBOX: 'MULTI_CHECKBOX', // * Multiple choice
  SORTABLE: 'SORTABLE',
  FREE_TEXT: 'FREE_TEXT',
} as const

export type QuestionType =
  (typeof QuestionTypeEnum)[keyof typeof QuestionTypeEnum]
