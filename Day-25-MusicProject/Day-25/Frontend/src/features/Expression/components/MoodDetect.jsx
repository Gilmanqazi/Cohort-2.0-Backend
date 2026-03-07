import React from 'react'
import { useSong } from '../../home/hooks/useSong'
import FaceExpression from '../../Expression/components/FaceExpression'


const MoodDetect = () => {

  const {handleGetSong} = useSong()

  return (
    <div>
      
<FaceExpression onClick={(expression)=>{handleGetSong({mood:expression})} } />
    </div>
  )
}

export default MoodDetect