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

    }
  }))


  const [, drop] = useDrop(
    () => ({
      accept: DraggableItemTypes.Act,
      hover({ draggedAct: draggedAct }: DragItem) {
        console.log()
        if (draggedAct !== act) {
          const { index: overIndex } = findAct(`${act.id}`)
          moveAct(`${draggedAct.id}`, overIndex)
        }
      },
    }),
  )

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`bg-gray-100 mb-2 ${isDragging ? 'opacity-20' : 'opacity-100'}`}
    >
      <h2>{act?.name}</h2>
    </div>
  )
}

export default ActView