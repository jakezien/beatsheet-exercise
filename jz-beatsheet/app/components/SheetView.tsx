'use client'
import { useEffect, useCallback } from "react"
import { useBeatSheet } from "../context/BeatSheetContext"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import ActView from "./ActView"

const SheetView: React.FC = () => {
  const { sheet, setSheet } = useBeatSheet()


  useEffect(() => {
    console.log('SheetView rendered!', sheet);
  }, [sheet]);

  const findAct = (id: string, currentSheet: BeatSheet) => {
    const act = currentSheet.acts.find((a) => `${a.id}` === id);
    return {
      act,
      index: act ? currentSheet.acts.indexOf(act) : -1,
    };
  }

  
  const moveAct = (id: string, newIndex: number) => {
    const { act, index: oldIndex } = findAct(id, sheet);
    console.log(`Sheet in MoveAct: ${sheet.acts}`)
    if (act && oldIndex !== -1) {
      let newActs = [...sheet.acts];
      console.log( newActs )
      newActs.splice(oldIndex, 1);
      newActs.splice(newIndex, 0, act);      
      setSheet({ ...sheet, acts: newActs });
    } else {
      console.error(`Act with id ${id} not found`);
    }
  }
    


  return (
    <div className="w-full h-full bg-neutral-300 p-4">
      <DndProvider backend={HTML5Backend}>

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