'use client'
import React, { PropsWithChildren, useContext } from 'react';
import useBeatSheetService from '../services/useBeatSheetService';

interface BeatSheetContextType {
  sheet: BeatSheet;
  setSheet: React.Dispatch<React.SetStateAction<BeatSheet | undefined>>;
}

const defaultContextValue: BeatSheetContextType = {
  sheet: { name: "", id: 0, acts: [] },
  setSheet: () => {} // default no-op function
}

const BeatSheetContext = React.createContext<BeatSheetContextType>(defaultContextValue)

export const BeatSheetProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { sheet, setSheet } = useBeatSheetService()

  return (
    <BeatSheetContext.Provider value={{ sheet: sheet ?? defaultContextValue.sheet, setSheet }}>
      {children}
    </BeatSheetContext.Provider>
  )
}

export const useBeatSheet = () => {
  const context = useContext(BeatSheetContext)
  if (!context) {
    throw new Error('useBeatSheet must be used within a BeatSheetProvider.');
  }
  return context;
};