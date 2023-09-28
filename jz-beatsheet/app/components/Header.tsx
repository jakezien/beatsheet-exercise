import React from "react";

interface Props {
  className?: string
}

const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={`${className ?? ""} flex flex-row align items-center lg:flex-col lg:h-full p-3 lg:p-4 lg:items-start`}>
      <p className={`text-lg text-stone-700 font-bold`}>SheetBeat</p>
    </header>
  )
}

export default Header