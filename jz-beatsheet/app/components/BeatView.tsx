import { useBeatSheet } from "../context/BeatSheetContext"
import { DraggableItemTypes } from "./SheetView"
import { useDrag, useDrop } from "react-dnd"

interface Props {
  beat: Beat
  moveBeat: (id: string, newIndex: number) => void
  findBeat: (id: string, sheet:BeatSheet) => { index: number }
  className: string
}

interface DragItem {
  draggedBeat: Beat
  originalIndex: number
}

const BeatView: React.FC<Props> = ({ beat, moveBeat, findBeat, className }) => {
  const {sheet} = useBeatSheet()
  const originalIndex = findBeat(`${beat.id}`, sheet).index; 

  const [{isDragging}, drag] = useDrag(() => ({
    type: DraggableItemTypes.Beat,
    item: {draggedBeat: beat, originalIndex},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }), end: (item, monitor) => {
      const { draggedBeat, originalIndex } = item
      const didDrop = monitor.didDrop()
      if (!didDrop) {
        // moveBeat(`${draggedBeat.id}`, originalIndex)
      }
    }
  }), [beat, originalIndex, moveBeat])


  const [, drop] = useDrop(
    () => ({
      accept: DraggableItemTypes.Act,
      hover(item: DragItem) {
        console.log()
        if (item.draggedBeat !== beat) {
          const { index: overIndex } = findBeat(`${beat.id}`, sheet)
          // moveBeat(`${item.draggedBeat.id}`, overIndex)
        }
      },
    }),
  )

  const removeBeat = (beat: Beat) => {
    // TODO
  }

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`aspect-4/3 w-44 mb-2 px-2 pt-2 pb-4 rounded ${isDragging ? 'opacity-0' : 'opacity-100'} bg-stone-100 shadow-sm overflow-scroll ${className}`}
    >
      <div className="flex flex-row justify-between ">
        <h3 className="font-medium">{beat?.name}</h3>
        <button
          className="text-xl w-8 h-8 -mr-1 -mt-1 text-neutral-300 hover:bg-red-200 hover:text-red-700 transition-colors rounded-md"
          aria-name="Delete"
          onClick={() => {removeBeat(beat)}}>
          ×
        </button>
      </div>
      <p className="text-sm leading-snug text-stone-500">{beat.content}</p>
    </div>
  )
}

export default BeatView