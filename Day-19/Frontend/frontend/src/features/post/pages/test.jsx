import React from 'react'
import { Follow } from '../services/post.api'

const test = () => {
  return (
    <div>
      <button onClick={()=>{
        console.log("Clicked")
      }}>Gilmannnn</button>
      <Follow/>
    </div>
  )
}


export default test