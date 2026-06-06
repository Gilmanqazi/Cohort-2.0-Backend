import React from 'react'

const page = async({params}) => {

  let {id} = await params

 
  return (
    <div>
      <h1>Home Ki Id Hai - {id}</h1>
    </div>
  )
}

export default page
