"use client"
import { FaCircleChevronLeft,FaCircleChevronRight  } from "react-icons/fa6";
import { useContext, createContext, useState, useEffect } from "react"

const SidebarContext = createContext()

export default function Sidebar({ onHandleChange, children }) {
  const [expanded, setExpanded] = useState(false)

  const [selectedItem, setSelectedItem] = useState("Statistics");
  const selectItem = (item) => {
    setSelectedItem(item);
  };

  useEffect(()=>{
    onHandleChange(selectedItem)
  },[selectedItem])
  
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-end items-center">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <FaCircleChevronLeft size={20}/> : <FaCircleChevronRight  size={20}/>}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded , selectedItem, selectItem}}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text }) {
  const { expanded,selectedItem, selectItem } = useContext(SidebarContext)
  const handleClick = () => {
    selectItem(text); 
  };

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          selectedItem === text
            ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-800"
            : "hover:bg-blue-50 text-gray-600"
        }
    `}
    onClick={handleClick}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-blue-100 text-blue-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}