import React from "react";

interface Props {
  className?: string,
  showPreview: boolean,
  setShowPreview: (newVal: boolean) => void
}

const Header: React.FC<Props> = ({ className, showPreview, setShowPreview }) => {
  return (
    <header className={`${className ?? ""} flex flex-row justify-between p-2 `}>
      <p className={`p-2 text-lg text-stone-700 font-bold`}>SheetBeat</p>
      <button
        className="hover:bg-stone-100 active:bg-stone-200 p-2 rounded transition-colors"
        onClick={() => {
        setShowPreview(!showPreview)
      }}  >
        {showPreview ? "Hide preview" : "Show preview"}
      </button>
    </header>
  )
}

export default Header