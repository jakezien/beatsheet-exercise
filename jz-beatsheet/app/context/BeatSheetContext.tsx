'use client'
import React, { PropsWithChildren, useContext } from 'react';
import useBeatSheetService from '../services/useBeatSheetService';

const defaultSheet:BeatSheet = { name: "", id: 0, acts: [] }
const BeatSheetContext = React.createContext(defaultSheet)

export const BeatSheetProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { sheet, setSheet } = useBeatSheetService()

  return (
    <BeatSheetContext.Provider value={sheet ?? defaultSheet}>
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