import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [note, setNotes] = useState([]);
  console.log(note);

  const callingNotes = async () => {
    const data = await axios.get("http://localhost:3000/note");
    setNotes(data.data.notes);
    console.log(data.data.notes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, city } = e.target.elements;
    axios
      .post("http://localhost:3000/note/create", {
        name: name.value,
        email: email.value,
        city: city.value,
      })
      .then((value) => {
        console.log(value);
        callingNotes();
      });
  };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete("http://localhost:3000/note/delete", { data: { id } })
      .then((value) => {
        callingNotes();
      });
  };

  useEffect(() => {
    callingNotes();
  }, []);

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <input type="text" name="name" placeholder="Name" />

          <input type="email" name="email" placeholder="Email" />

          <input type="text" name="city" placeholder="City" />

          <button type="submit">Submit</button>
        </form>

        <div className="cardContainer">
          {note.map((value) => {
            return (
              <div key={value._id} className="main">
                <div className="name">{value.name}</div>

                <div className="email">{value.email}</div>

                <div className="city">{value.city}</div>

                <button
                  onClick={() => {
                    handleDelete(value._id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
