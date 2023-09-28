import { DraggableItemTypes } from "./SheetView"
import { useDrag, useDrop } from "react-dnd"

interface Props {
  beat: Beat
  moveBeat: (id: string, newIndex: number) => void
  findBeat: (id: string) => { index: number }
  className: string
}



interface DragItem {
  draggedBeat: Beat
  originalIndex: number
}

const BeatView: React.FC<Props> = ({ beat, moveBeat, findBeat, className }) => {
  const originalIndex = findBeat(`${beat.id}`).index; 

  const [{isDragging}, drag] = useDrag(() => ({
    type: DraggableItemTypes.Beat,
    item: {draggedBeat: beat, originalIndex},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }), end: (item, monitor) => {
      const { draggedBeat, originalIndex } = item
      const didDrop = monitor.didDrop()
      if (!didDrop) {
        moveBeat(`${draggedBeat.id}`, originalIndex)
      }
    }
  }), [beat, originalIndex, moveBeat])


  const [, drop] = useDrop(
    () => ({
      accept: DraggableItemTypes.Act,
      hover(item: DragItem) {
        console.log()
        if (item.draggedBeat !== beat) {
          const { index: overIndex } = findBeat(`${beat.id}`)
          moveBeat(`${item.draggedBeat.id}`, overIndex)
        }
      },
    }),
  )

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`bg-white aspect-4/3 w-44 mb-2 ${isDragging ? 'opacity-20' : 'opacity-100'} ${className}`}
    >
      <h3>{`${beat?.id}` + beat?.name}</h3>
      <p className="text-sm leading-snug">{beat.content}</p>
    </div>
  )
}

export default BeatView