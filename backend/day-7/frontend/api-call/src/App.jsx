import { useState, useEffect } from "react";

import axios from "axios";

import "./App.css";

function App() {
  const [note, setnote] = useState([]);

  useEffect(() => {
    const dataHandling = async () => {
      const note = await axios.get("http://localhost:3000/note");
      console.log(note);

      setnote(note.data.note);
      console.log(note.data.note);
    };

    dataHandling();
  }, []);

  return (
    <div className="container">
      {note.map((value) => (
        <div className="card" key={value._id}>
          <div className="name">{value.name}</div>

          <div className="email">{value.email}</div>

          <div className="city">{value.city}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
