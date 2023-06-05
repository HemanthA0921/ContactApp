import React, { useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ContactContext } from './ContactContext';

const ContactDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { contacts, setSelectedContact, removeContactHandler } = useContext(ContactContext);

    useEffect(() => {
        const selectedContact = contacts.find((contact) => contact.id === id);
        setSelectedContact(selectedContact);
    }, [contacts, id, setSelectedContact]);

    const handleDelete = () => {
        removeContactHandler(id);
        navigate('/');
    };

    return (
        <div className="main">
            <div className="ui card container">
                {/* Render contact details */}
            </div>
            <div className="center-div">
                <button onClick={handleDelete}>Delete</button>
            </div>
            <Link to="/">Back to Contact List</Link>
        </div>
    );
};

export default ContactDetail;
