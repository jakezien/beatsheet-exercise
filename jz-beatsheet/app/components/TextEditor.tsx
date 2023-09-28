'use client'
import { useEffect, useState, useCallback, PropsWithChildren  } from "react"
import { useBeatSheet } from "../context/BeatSheetContext"
import { useMarkdownService } from "../context/useMarkdownService"

interface Props {
  className?: string
}

const TextEditor: React.FC<Props> = ({className}) => {
  let { sheet, setSheet, updateSheetWithMarkdown } = useBeatSheet()
  const { actToMarkdown, beatToMarkdown } = useMarkdownService()
  const [text, setText] = useState("")

  const markdownForSheet = useCallback((sheet: BeatSheet) => {
    return sheet.acts.map(actToMarkdown).join('');
  }, [actToMarkdown]);

  useEffect(() => {
    let newMarkdown = markdownForSheet(sheet)
    console.log(`useeffect ${newMarkdown.length}`)
    setText(markdownForSheet(sheet));
  }, [sheet, markdownForSheet]);

  const handleChange = useCallback((event:  React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    updateSheetWithMarkdown(newText)
  }, [setText, updateSheetWithMarkdown]);


  return (<>
    <form className={`w-full h-screen ${className}`}>
      <div className="w-full h-full">
        <textarea
          spellCheck="false"
          className="w-full h-full p-4 bg-stone-100"
          value={text}
          onChange={handleChange}
        />
      </div>
    </form>
    
  </>)
}

export default TextEditor