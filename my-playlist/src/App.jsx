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
          <p>{track.title} — {track.artist} — {track.album}</p>
          <button onClick={()=>deleteTrack(track.id)}>Delete Track</button>
        </div>
      ))}
    </div>
  );
}

export default App;
