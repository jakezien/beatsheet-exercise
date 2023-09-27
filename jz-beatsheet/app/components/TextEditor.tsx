'use client'
import { useEffect, useState } from "react"
import { useBeatSheet } from "../context/BeatSheetContext"

const TextEditor: React.FC = () => {
  let sheet = useBeatSheet()
  const [text, setText] = useState(`${sheet.acts.length}`)

  useEffect(() => {setText(`${sheet.acts.length}`)}, [sheet])

  return (<>
    <form>
      <div>
        <textarea
          spellCheck="false"
          className=""
          value={text}
          rows={text.split('\n').length + 1}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      </form>
    
  </>)
}

export default TextEditor