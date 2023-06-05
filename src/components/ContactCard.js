import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContactContext } from './ContactContext';
import user from '../images/user.png';

const ContactCard = (props) => {
    const { setSelectedContact } = useContext(ContactContext);
    const { id, name, email } = props.contact;

    const handleClick = () => {
        setSelectedContact(props.contact);
    };

    return (
        <div className="item">
            <img className="ui avatar image" src={user} alt="user" />
            <div className="content">
                <Link
                    to={{ pathname: `/contact/${id}` }}
                    onClick={handleClick}
                >
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>
            </div>
            <i className='trash alternate outline icon'
                style={{color:"red", marginTop:"7px", marginLeft:"20px"}}
                onClick={() => props.clickHandler(id)}>
            </i>

            <Link 
                to={ {pathname: "/edit"}}
                onClick={handleClick}>
                <i className='edit alternate outline icon'
                    style={{color:"blue", marginTop:"7px"}}>
                </i>
            </Link>
        </div>
    );
};

export default ContactCard;