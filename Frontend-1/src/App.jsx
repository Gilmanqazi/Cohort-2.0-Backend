import React, { useEffect, useState } from 'react';
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState({ _id: null, img: "", desc: "", title: "", });

  function fetchData() {
    axios.get("http://localhost:3000/api/notes")
      .then(({ data }) => 
        { 
          setNotes(data.notes); 
        });
  }

  function deleteHandler (noteId){
    axios.delete(`http://localhost:3000/api/notes/`+noteId)
    .then(()=>{
      fetchData()
    })
        }

  useEffect(() => {
     fetchData(); 
    }, []);

  // (POST)
  function submitHandler(e) {
    e.preventDefault();
    const { img, title, desc } = e.target.elements;
    axios.post("http://localhost:3000/api/notes", {
      img: img.value,
      title: title.value,
      desc: desc.value
    }).then(() => {
      fetchData();
      e.target.reset(); //form khali
    });
  }

  // 2. Purana Note Update Karne Ke Liye (PATCH)
  function finalUpdateHandler(e) {
    e.preventDefault();
    axios.patch(`http://localhost:3000/api/notes/${selectedNote._id}`, selectedNote)
      .then(() => {
        setIsModelOpen(false); 
        fetchData(); 
      });
console.log({...selectedNote, img: e.target.value})

  }

  return (
    <div className="container">
      <form onSubmit={submitHandler} className='inp'>
        <h2>Add New Note</h2>
        <input name="img" type="text" placeholder='Image URL' />
        <input name="title" type="text" placeholder='Title' />
        <input name="desc" type="text" placeholder='Description' />
        <button type="submit">Submit</button>
      </form>

     
      <div className='notes'>
        {notes.map((elem) => (
          <div key={elem._id} className='note'>
            <img src={elem.img} alt={elem.title} />
            <h1>{elem.title}</h1>
            <p>{elem.desc}</p>
            <div className='btns'>
              <button onClick={() => 
                deleteHandler(elem._id)}
                >Delete</button>
              <button onClick={() => {
                setSelectedNote(elem); // State mein data dala
                setIsModelOpen(true);  // Modal kholo
              }}>Edit</button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Update Modal (Popup) --- */}
      {isModelOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Update Note</h2>
            <form className='update-inp' onSubmit={finalUpdateHandler}>
              <input 
                value={selectedNote.img} 
                onChange={(e) => setSelectedNote({...selectedNote, img: e.target.value})} 
                placeholder="Image URL" 
              />
              <input 
                value={selectedNote.title} 
                onChange={(e) => setSelectedNote({...selectedNote, title: e.target.value})} 
                placeholder="Title" 
              />
              <textarea 
                value={selectedNote.desc} 
                onChange={(e) => setSelectedNote({...selectedNote, desc: e.target.value})} 
                placeholder="Description" 
              />
              <div className="modal-btns">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setIsModelOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;