import { createStore } from 'zustand/vanilla'

export type AssessmentTestsState = {
  selectedPart: number
  selectedPage: number
}

export type AssessmentTestsActions = {
  setSelectedPart: (number: number) => void
  setSelectedPage: (number: number) => void
}

export type AssessmentTestsStore = AssessmentTestsState & AssessmentTestsActions

export const initAssessmentTestsStore = (): AssessmentTestsState => {
  return { selectedPart: 0, selectedPage: 0 }
}

export const defaultInitState: AssessmentTestsState = {
  selectedPart: 0,
  selectedPage: 0,
}

export const createAssessmentTestsStore = (
  initState: AssessmentTestsState = defaultInitState,
) => {
  return createStore<AssessmentTestsStore>()((set) => ({
    ...initState,
    setSelectedPart: (number) => set(() => ({ selectedPart: number })),
    setSelectedPage: (number) => set(() => ({ selectedPage: number })),
  }))
}
