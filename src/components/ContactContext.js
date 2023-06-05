import React, { createContext, useState } from 'react';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [selectedContact, setSelectedContact] = useState(null);

    return (
        <ContactContext.Provider value={{ selectedContact, setSelectedContact }}>
            {children}
        </ContactContext.Provider>
    );
};