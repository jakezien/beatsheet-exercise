'use client'
import { useEffect, useState } from "react"
import { useBeatSheet } from "../context/BeatSheetContext"
import { useMarkdownService } from "../services/useMarkdownService"

const TextEditor: React.FC = () => {
  let { sheet, setSheet } = useBeatSheet()
  const { actToMarkdown, beatToMarkdown } = useMarkdownService()
  const [text, setText] = useState("")


  function markdownForSheet(sheet: BeatSheet) {
    var newText = ""

    for (let i in sheet.acts) {
      let act = sheet.acts[i]
      newText += actToMarkdown(act)
    }

    return newText
  }    

  
  useEffect(() => {
    let newText = markdownForSheet(sheet)
    setText(newText)
  }, [sheet])

  return (<>
    <form className="w-full h-screen">
      <div className="w-full h-full">
        <textarea
          spellCheck="false"
          className="w-full h-full"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
    </form>
    
  </>)
}

export default TextEditor