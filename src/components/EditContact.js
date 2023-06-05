import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContactContext } from './ContactContext';

function EditContact({ updateContactHandler }) {
  const navigate = useNavigate();
  const { selectedContact } = useContext(ContactContext);

  const id = selectedContact?.id || "";
  const name = selectedContact?.name || "";
  const email = selectedContact?.email || "";

  const [contactId, setContactId] = useState(id);
  const [contactName, setContactName] = useState(name);
  const [contactEmail, setContactEmail] = useState(email);

  const update = (e) => {
    e.preventDefault();
    if (contactName === "" || contactEmail === "") {
      alert("All the fields are mandatory");
      return;
    }
    updateContactHandler({ id: contactId, name: contactName, email: contactEmail });
    setContactName("");
    setContactEmail("");
    navigate("/");
  };

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>
        <button className="ui button blue">Edit</button>
      </form>
    </div>
  );
}

export default EditContact;
