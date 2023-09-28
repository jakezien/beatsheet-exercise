import BeatView from "./BeatView"
import { DraggableItemTypes } from "./SheetView"
import { useDrag, useDrop } from "react-dnd"

interface Props {
  act: Act
  moveAct: (id: string, newIndex: number) => void
  findAct: (id: string) => {index: number}
}



interface DragItem {
  draggedAct: Act
  originalIndex: number
}

const ActView: React.FC<Props> = ({ act, moveAct, findAct }) => {
  const originalIndex = findAct(`${act.id}`).index; 

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
          const { index: overIndex } = findAct(`${act.id}`)
          moveAct(`${item.draggedAct.id}`, overIndex)
        }
      },
    }),
  )

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`bg-gray-100 mb-2 ${isDragging ? 'opacity-20' : 'opacity-100'}`}
    >
      <h2>{`${act?.id}` + act?.name}</h2>
      <div className="flex lg:flex-row">
        {act?.beats?.map((beat, index) =>
          <BeatView
            beat={beat}
            key={beat.id}
            moveBeat={moveAct}
            findBeat={findAct}
            className='mr-2'
        />)}
      </div>
    </div>
  )
}

export default ActView