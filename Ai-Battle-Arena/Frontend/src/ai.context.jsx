import { createContext, useState } from "react";

export const AIContext = createContext()

export const AIProvider = ({children})=>{
  const [problem, setProblem] = useState("")
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])


  return (
    <AIContext.Provider value={{problem,setProblem,loading,setLoading,history,setHistory}}>
      {children}
    </AIContext.Provider>
  )
}
