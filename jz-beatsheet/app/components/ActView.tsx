import { useBeatSheet } from "../context/BeatSheetContext"
import BeatView from "./BeatView"
import { DraggableItemTypes } from "./SheetView"
import { useDrag, useDrop } from "react-dnd"

interface Props {
  act: Act
  moveAct: (id: string, newIndex: number) => void
  findAct: (id: string, sheet: BeatSheet) => {index: number}
}



interface DragItem {
  draggedAct: Act
  originalIndex: number
}

const ActView: React.FC<Props> = ({ act, moveAct, findAct }) => {
  const {sheet, setSheet} = useBeatSheet()
  const originalIndex = findAct(`${act.id}`, sheet).index; 

  const [{isDragging}, drag] = useDrag(() => ({
    type: DraggableItemTypes.Act,
    item: {draggedAct: act, originalIndex},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }), end: (item, monitor) => {
      const { draggedAct, originalIndex } = item
      const didDrop = monitor.didDrop()
      if (!didDrop) {
        moveAct(`${draggedAct.id}`, originalIndex)
      }
    }
  }), [act, originalIndex, moveAct])


  const [, drop] = useDrop(
    () => ({
      accept: DraggableItemTypes.Act,
      hover(item: DragItem) {
        console.log()
        if (item.draggedAct !== act) {
          const { index: overIndex } = findAct(`${act.id}`, sheet)
          moveAct(`${item.draggedAct.id}`, overIndex)
        }
      },
    }),
  )
  
  const removeAct = (act: Act) => {
      let newActs = [...sheet.acts]
      newActs.splice(newActs.indexOf(act), 1)
      setSheet({...sheet, acts: newActs})
  }

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`mb-6 cursor-all-scroll w-fit ${isDragging ? 'opacity-0' : 'opacity-100'} bg-neutral-200 text-stone-600 rounded-lg shadow-sm`}
    >
      <div className="flex justify-between p-2 pb-3">
        <h2 className="text-2xl font-medium tracking-tight">
          <span className="mr-1 cursor-all-scroll opacity-40 hover:opacity-75 active:opacity-100" aria-description="Grip handle">⠿</span> 
          {act?.name}
        </h2>
        <button
          className="text-2xl w-h-8 text-neutral-400 hover:bg-red-200 hover:text-red-700 transition-colors rounded-md"
          role="delete"
          onClick={() => { removeAct(act) }}>
          ×
        </button>
      </div>
      <div className="flex lg:flex-row px-2">
        {act?.beats?.map((beat, index) =>
          <BeatView
            beat={beat}
            key={beat.id}
            moveBeat={moveAct}
            findBeat={findAct}
            className='mr-2 last:mr-0'
        />)}
      </div>
      
    </div>
  )
}

export default ActView