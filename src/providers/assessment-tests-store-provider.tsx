'use client'

import { createContext, useContext, useRef, type ReactNode } from 'react'
import { useStore } from 'zustand'

import {
  AssessmentTestsStore,
  createAssessmentTestsStore,
  initAssessmentTestsStore,
} from '@/stores/assessment-tests-store'

export type AssessmentTestsStoreApi = ReturnType<
  typeof createAssessmentTestsStore
>

export const AssessmentTestsStoreContext = createContext<
  AssessmentTestsStoreApi | undefined
>(undefined)

export interface AssessmentTestsStoreProviderProps {
  children: ReactNode
}

export const AssessmentTestsStoreProvider = ({
  children,
}: AssessmentTestsStoreProviderProps) => {
  const storeRef = useRef<AssessmentTestsStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createAssessmentTestsStore(initAssessmentTestsStore())
  }

  return (
    <AssessmentTestsStoreContext.Provider value={storeRef.current}>
      {children}
    </AssessmentTestsStoreContext.Provider>
  )
}

export const useAssessmentTestsStore = <T,>(
  selector: (store: AssessmentTestsStore) => T,
): T => {
  const assessmentTestsStoreContext = useContext(AssessmentTestsStoreContext)

  if (!assessmentTestsStoreContext) {
    throw new Error(
      `useAssessmentTestsStore must be used within AssessmentTestsStoreProvider`,
    )
  }

  return useStore(assessmentTestsStoreContext, selector)
}
