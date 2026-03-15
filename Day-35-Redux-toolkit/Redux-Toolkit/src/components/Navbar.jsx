import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changethemeToDark, changethemeToLight } from '../redux/slices/themeSlice'

const navbar = () => {

  const theme = useSelector((state)=>state.theme.value)

  const dispatch = useDispatch()

  return (
    <div>
      <h1>Current Theme is : {theme}</h1>
      <button style={{backgroundColor:"white"}} onClick={()=>{dispatch(changethemeToLight())}}>Change Theme To Light</button>
      <button onClick={()=>{dispatch(changethemeToDark())}}>Change Theme To Dark</button>

    </div>
  )
}

export default navbar