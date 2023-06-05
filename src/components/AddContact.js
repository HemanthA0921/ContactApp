import React from "react";
import { useNavigate } from "react-router-dom";

function AddContact({ addContactHandler }) {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const add = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All the fields are mandatory");
      return;
    }
    addContactHandler({ name, email });
    setName("");
    setEmail("");
    navigate("/");
  };

  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="ui button blue">Add</button>
      </form>
    </div>
  );
}

export default AddContact;
