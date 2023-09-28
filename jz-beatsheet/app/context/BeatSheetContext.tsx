'use client'
import React, { PropsWithChildren, useContext } from 'react';
import useBeatSheetService from '../services/useBeatSheetService';

interface BeatSheetContextType {
  sheet: BeatSheet;
  // setSheet: React.Dispatch<React.SetStateAction<BeatSheet | undefined>>;
  doSet: (sheet:BeatSheet)=>void
}

const defaultContextValue: BeatSheetContextType = {
  sheet: { name: "", id: 0, acts: [] },
  // setSheet: () => { },
  doSet: () => {}
}

const BeatSheetContext = React.createContext<BeatSheetContextType>(defaultContextValue)

export const BeatSheetProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { sheet, doSet } = useBeatSheetService()

  return (
    <BeatSheetContext.Provider value={{ sheet: sheet ?? defaultContextValue.sheet, doSet }}>
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