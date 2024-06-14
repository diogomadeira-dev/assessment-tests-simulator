import { createStore } from 'zustand/vanilla'

export type CounterState = {
  selectedPart: number
  selectedPage: number
}

export type CounterActions = {
  setSelectedPart: (number: number) => void
  setSelectedPage: (number: number) => void
}

export type CounterStore = CounterState & CounterActions

export const initCounterStore = (): CounterState => {
  return { selectedPart: 0, selectedPage: 0 }
}

export const defaultInitState: CounterState = {
  selectedPart: 0,
  selectedPage: 0,
}

export const createCounterStore = (
  initState: CounterState = defaultInitState,
) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    setSelectedPart: (number) => set(() => ({ selectedPart: number })),
    setSelectedPage: (number) => set(() => ({ selectedPage: number })),
  }))
}
