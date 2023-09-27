'use client'
import { useEffect } from "react"
import { useBeatSheet } from "../context/BeatSheetContext"

const SheetView: React.FC = () => {
  let { sheet, setSheet } = useBeatSheet()

  useEffect(() => {
    console.log("newsheet")
    
  }, [sheet])

  return (
    <div className="w-full h-full bg-stone-500 p-4">
      {sheet.name && <h1>{sheet.name}</h1>}
      {sheet.acts.map((act, index) => {
        return (
          <div className="bg-gray-100 mb-2">
            <h2>{act.name}</h2>
          </div>
        )
      })}
    </div>
  )
}

export default SheetView