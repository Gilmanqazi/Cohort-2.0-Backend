import React, { useState } from 'react';
import axios from "axios"


const App = () => {

 
  const [notes, setNotes] = useState([

    axios.get ("http://localhost:3000/api/notes")
    .then(({data})=>{
 setNotes(data.notes)
    })
  //   {
  //   img:"https://plus.unsplash.com/premium_photo-1765465308415-c955cfde6ef7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
  //   title:"Gilman",
  //   desc:"Lorem ipsum dolor sit amet consectetur adipisicing."
  // },
  // {
  //   img:"https://plus.unsplash.com/premium_photo-1765465308415-c955cfde6ef7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
  //   title:"Gilman",
  //   desc:"Lorem ipsum dolor sit amet consectetur adipisicing."
  // },
  // {
  //   img:"https://plus.unsplash.com/premium_photo-1765465308415-c955cfde6ef7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
  //   title:"Gilman",
  //   desc:"Lorem ipsum dolor sit amet consectetur adipisicing."
  // },
  // {
  //   img:"https://plus.unsplash.com/premium_photo-1765465308415-c955cfde6ef7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
  //   title:"Gilman",
  //   desc:"Lorem ipsum dolor sit amet consectetur adipisicing."
  // },
  // {
  //   img:"https://plus.unsplash.com/premium_photo-1765465308415-c955cfde6ef7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
  //   title:"Gilman",
  //   desc:"Lorem ipsum dolor sit amet consectetur adipisicing."
  // },
  // {
  //   img:"https://plus.unsplash.com/premium_photo-1765465308415-c955cfde6ef7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
  //   title:"Gilman",
  //   desc:"Lorem ipsum dolor sit amet consectetur adipisicing."
  // },
  // {
  //   img:"https://plus.unsplash.com/premium_photo-1765465308415-c955cfde6ef7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
  //   title:"Gilman",
  //   desc:"Lorem ipsum dolor sit amet consectetur adipisicing."
  // },
  // {
  //   img:"https://plus.unsplash.com/premium_photo-1765465308415-c955cfde6ef7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
  //   title:"Gilman",
  //   desc:"Lorem ipsum dolor sit amet consectetur adipisicing."
  // },
])
  return (
    <div>
      <div className="notes">
        {notes.map((elem, idx)=>{
         return<div key={idx} className="note">
         <img src={elem.img} alt="" />
         <h1>{elem.title}</h1>
         <p>{elem.desc}</p>
       </div>
        })}
     
      </div>
    </div>
  );
};

export default App;