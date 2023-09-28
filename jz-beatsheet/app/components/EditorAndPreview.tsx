'use client'
import React, { useState } from "react";
import TextEditor from "./TextEditor";
import SheetView from "./SheetView";
import Header from "./Header";

interface Props {
  className?: string
}

const EditorAndPreview: React.FC<Props> = ({ className }) => {

  let [ showPreview, setShowPreview ] = useState(false)

  return (
    <div className={`${className}`}>
      <Header showPreview={showPreview} setShowPreview={setShowPreview} />
      <div className={`md:flex md:flex-row ${className}`}>
        <TextEditor className={` ${showPreview ? 'hidden' : 'block'} md:block md:w-1/3`} />
        <SheetView className={`  ${showPreview ? 'block' : 'hidden'} md:block md:w-2/3 md:max-h-screen overflow-scroll`}/>
      </div>
    </div>
  )
}

export default EditorAndPreview