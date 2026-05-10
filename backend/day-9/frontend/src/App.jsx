import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  // STORE ALL DATABASE DATA
  const [data, setData] = useState([]);

  // STORE EDIT ID
  const [editId, setEditId] = useState(null);

  // STORE INPUT DATA
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
  });

  // =========================
  // GET ALL DATA
  // =========================

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/notes"
      );

      setData(response.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // CREATE DATA
  // =========================

  const createData = async () => {
    try {
      await axios.post(
        "http://localhost:3000/notes/create",
        {
          name: formData.name,
          email: formData.email,
          city: formData.city,
        }
      );

      // RELOAD DATA
      fetchData();

      // CLEAR INPUTS
      setFormData({
        name: "",
        email: "",
        city: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // UPDATE DATA
  // =========================

  const updateData = async () => {
    try {
      await axios.patch(
        "http://localhost:3000/notes/update",
        {
          id: editId,
          name: formData.name,
          email: formData.email,
          city: formData.city,
        }
      );

      // RELOAD DATA
      fetchData();

      // CLOSE EDIT MODE
      setEditId(null);

      // CLEAR INPUTS
      setFormData({
        name: "",
        email: "",
        city: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // DELETE DATA
  // =========================

  const deleteData = async (id) => {
    try {
      await axios.delete(
        "http://localhost:3000/notes/delete",
        {
          data: { id },
        }
      );

      // RELOAD DATA
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // PAGE LOAD
  // =========================

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      {/* FORM SECTION */}

      <div className="formContainer">
        <input
          type="text"
          placeholder="Enter Name"
          value={formData.name}
          onChange={(e) => {
            setFormData({
              ...formData,
              name: e.target.value,
            });
          }}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={(e) => {
            setFormData({
              ...formData,
              email: e.target.value,
            });
          }}
        />

        <input
          type="text"
          placeholder="Enter City"
          value={formData.city}
          onChange={(e) => {
            setFormData({
              ...formData,
              city: e.target.value,
            });
          }}
        />

        <button
          onClick={() => {
            if (editId) {
              updateData();
            } else {
              createData();
            }
          }}
        >
          {editId ? "Update Note" : "Create Note"}
        </button>
      </div>

      {/* CARD SECTION */}

      <div className="cardContainer">
        {data.map((value) => (
          <div key={value._id} className="card">
            <h1>{value.name}</h1>

            <h2>{value.email}</h2>

            <h3>{value.city}</h3>

            {/* BUTTON SECTION */}

            <div className="buttonContainer">
              <button
                className="editBtn"
                onClick={() => {
                  setEditId(value._id);

                  setFormData({
                    name: value.name,
                    email: value.email,
                    city: value.city,
                  });
                }}
              >
                Edit
              </button>

              <button
                className="deleteBtn"
                onClick={() => {
                  deleteData(value._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;