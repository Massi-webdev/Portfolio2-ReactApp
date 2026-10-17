import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

// Form and Controlled Inputs ==================================================
function App() {
  const [musics, setMusics] = useState([]);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");

  const [editingId, setEditingId] = useState(null);               //remembers which track user is editing
  const [newTitle, setNewTitle] = useState("");                   //remembers what the user typed

  // Function to update the list and handle the submission =====================
  function handleSubmit(event) {
    event.preventDefault();

    const newTrack = {
      id: crypto.randomUUID(),                        //unique track id
      title,
      artist, 
      album
    };

    setMusics(prev => [...prev, newTrack]);

    setTitle("");
    setArtist("");
    setAlbum("");
  }

  // Function to delete a track from the playlist ==============================
  function deleteTrack(id){
    setMusics(prev => prev.filter(track=> track.id !== id));
  }


  //function to save edited track information ==================================
  function saveEdit(){
    setMusics(prev =>
      prev.map(track =>
        track.id === editingId
        ? {...track, title:newTitle}
        : track
      )
    );

    setEditingId(null);
  }

  //function to Cancel the current Edit ==================================
  function cancelEdit(){
    setEditingId(null);
  }


  //Build the page ==============================================================
  return (
    <div>
      <h1>My Music Playlist</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder="Song title"
          required
        />

        <input
          value={artist}
          onChange={event => setArtist(event.target.value)}
          placeholder="Artist"
          required
        />

        <input
          value={album}
          onChange={event => setAlbum(event.target.value)}
          placeholder="Album"
          required
        />

        <button type="submit">Add Track</button>
      </form>

      <h2>My Tracks</h2>

      {musics.map(track => (
        <div key={track.id}>

          {editingId === track.id ? (
            <div>

              <input 
                value={newTitle} 
                onChange={event=>setNewTitle(event.target.value)}
              />

              <button onClick={()=>saveEdit()}>
                Save
              </button>

              <button onClick={()=>cancelEdit()}>Cancel</button>

            </div>
          ) : (
            <p>Title: {track.title}</p>
          )}
          <p>Artist: {track.artist} — Album: {track.album}</p>

          {editingId !== track.id &&
           <button onClick={()=>{
              setEditingId(track.id);
              setNewTitle(track.title);
            }}>
              Edit
            </button>  
          }

          <button onClick={()=>deleteTrack(track.id)}>Delete</button>

        </div>
      ))}      
    </div>
  );
}

export default App;
