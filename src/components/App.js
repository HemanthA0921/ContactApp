import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import api from '../api/contacts';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContactProvider } from './ContactContext';
import EditContact  from "./EditContact";
import DeleteContact from './DeleteContact';


function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Retrieve Contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  const addContactHandler = async (contact) => {
    // console.log(contact);
    const request = {
      id: uuid(),
      ...contact
    }
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? {...response.data} : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== ""){
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }
    else {
      setSearchResults(contacts);
    }
  };
  

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <ContactProvider>
      <div className="ui container">
        <Router>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <ContactList 
                  contacts={searchTerm.length <= 0 ?  contacts : searchResults} 
                  getContactId={removeContactHandler} 
                  term={searchTerm}
                  searchKeyword={searchHandler} 
                />}
            />
            <Route
              path="/add"
              element={<AddContact addContactHandler={addContactHandler} />}
            />
            <Route
              path="/contact/:id"
              element={<ContactDetail />}
            />
            <Route 
              path="/contact/:id/delete" 
              element={<DeleteContact />} 
            />
            <Route
              path="/edit"
              element={<EditContact updateContactHandler={updateContactHandler} />}
            />
          </Routes>
        </Router>
      </div>
    </ContactProvider>
  );
}

export default App;
