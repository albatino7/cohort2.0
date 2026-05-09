import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // STORE ALL NOTES
  const [note, setNotes] = useState([]);

  // STORE CURRENT EDITING ID
  const [editId, setEditId] = useState(null);

  // STORE EDIT INPUT DATA
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    city: "",
  });

  // GET ALL NOTES
  const callingNotes = async () => {
    try {
      const data = await axios.get("http://localhost:3000/note");

      setNotes(data.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE NOTE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, city } = e.target.elements;

    try {
      await axios.post("http://localhost:3000/note/create", {
        name: name.value,
        email: email.value,
        city: city.value,
      });

      // RELOAD NOTES
      callingNotes();

      // RESET FORM
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE NOTE
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3000/note/delete", {
        data: { id },
      });

      // RELOAD NOTES
      callingNotes();
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE NOTE
  const handleUpdate = async () => {
    try {
      await axios.patch("http://localhost:3000/note/update", {
        id: editId,
        name: editData.name,
        email: editData.email,
        city: editData.city,
      });

      // RELOAD NOTES
      callingNotes();

      // CLOSE EDIT MODE
      setEditId(null);

      // CLEAR EDIT DATA
      setEditData({
        name: "",
        email: "",
        city: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // PAGE LOAD
  useEffect(() => {
    callingNotes();
  }, []);

  return (
    <div className="container">
      {/* FORM */}
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" placeholder="Name" />

        <input type="email" name="email" placeholder="Email" />

        <input type="text" name="city" placeholder="City" />

        <button type="submit">Submit</button>
      </form>

      {/* CARD SECTION */}
      <div className="cardContainer">
        {note?.map((value) => {
          return (
            <div key={value._id} className="main">
              {editId === value._id ? (
                <>
                  {/* EDIT MODE */}

                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        name: e.target.value,
                      })
                    }
                  />

                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        email: e.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Enter City"
                    value={editData.city}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        city: e.target.value,
                      })
                    }
                  />

                  {/* BUTTON GROUP */}

                  <div className="buttonGroup">
                    <button className="confirmBtn" onClick={handleUpdate}>
                      Confirm
                    </button>

                    <button
                      className="cancelBtn"
                      onClick={() => {
                        setEditId(null);

                        setEditData({
                          name: "",
                          email: "",
                          city: "",
                        });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* NORMAL MODE */}

                  <div className="name">{value.name}</div>

                  <div className="email">{value.email}</div>

                  <div className="city">{value.city}</div>

                  {/* BUTTON GROUP */}

                  <div className="buttonGroup">
                    <button
                      className="deleteBtn"
                      onClick={() => {
                        handleDelete(value._id);
                      }}
                    >
                      Delete
                    </button>

                    <button
                      className="editBtn"
                      onClick={() => {
                        // OPEN EDIT MODE
                        setEditId(value._id);

                        // SET CURRENT VALUES
                        setEditData({
                          name: value.name,
                          email: value.email,
                          city: value.city,
                        });
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
