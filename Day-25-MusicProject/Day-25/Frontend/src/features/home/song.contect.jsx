import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {

  const [songs, setSongs] = useState([])

  const [loading, setloading] = useState(false)

  return (
    <SongContext.Provider value={{ loading, setloading, songs, setSongs }}>
      {children}
    </SongContext.Provider>
  )
}