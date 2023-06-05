import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContactContext } from './ContactContext';
import user from '../images/user.avif';

const ContactDetail = () => {
    const { selectedContact } = useContext(ContactContext);

    return (
        <div className="main">
            <div className="ui card container">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{selectedContact.name}</div>
                    <div className="description">{selectedContact.email}</div>
                </div>
            </div>
            <div className="center-div">
                <Link to="/">
                    <button className="ui button blue center">Back to Contact List</button>
                </Link>
            </div>
        </div>
    );
};

export default ContactDetail;
