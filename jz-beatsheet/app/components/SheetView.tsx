'use client'
import { useEffect, useCallback } from "react"
import { useBeatSheet } from "../context/BeatSheetContext"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import ActView from "./ActView"

const SheetView: React.FC = () => {
  const { sheet, doSet } = useBeatSheet()
  
  useEffect(() => {
    console.log("new sheet in sheetView", sheet)
  }, [sheet])

  const findAct = useCallback(
    (id: string) => {
      const act = sheet.acts.filter((a) => `${a.id}` === id)[0] 
      return {
        act,
        index: sheet.acts.indexOf(act),
      }
    },
    [sheet.acts],
  )

  const moveAct = useCallback(
    (id: string, newIndex: number) => {
      const { act, index: oldIndex } = findAct(id)
      
      if (act && oldIndex !== -1) { // Ensure act is found and oldIndex is valid
        let newActs = [...sheet.acts] 
        newActs.splice(oldIndex, 1) 
        newActs.splice(newIndex, 0, act) 
        newActs = newActs.map((act, index) => ({ ...act, id: index + 1 }));
        doSet({ ...sheet, acts: newActs }) 
      } else {
        console.error(`Act with id ${id} not found`)
      }
    },
    [sheet, doSet, findAct]
  )


  return (
    <div className="w-full h-full bg-stone-500 p-4">
      <DndProvider backend={HTML5Backend}>
        {sheet.name && <h1>{sheet.name}</h1>}
        {sheet.acts.map((act, i) =>
          <ActView
            key={act.id}
            act={act}
            moveAct={moveAct}
            findAct={findAct}
          />)}
      </DndProvider>
    </div>
  )
}

export const DraggableItemTypes = {
  Act: 'act',
  Beat: 'beat'
}

export default SheetView