import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/contacts';

const DeleteContact = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    const deleteContact = async () => {
        await api.delete(`/contacts/${id}`);
        navigate('/');
    };

    const cancelDeletion = () => {
        navigate('/');
    };

    return (
        <div className='ui main'>
            <h2>Delete Contact</h2>
            <p>Are you sure you want to delete this contact?</p>
            <div>
                <button className="ui button red" onClick={deleteContact}>
                    Yes
                </button>
                <button className="ui button" onClick={cancelDeletion}>
                    No
                </button>
            </div>
        </div>
    );
};

export default DeleteContact;
