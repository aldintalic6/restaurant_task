import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import './UserInfo.css';

import { useUser } from "../../contexts/UserContext";

const UserInfo = () => {
    const { user, loading } = useUser();
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState('testname');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
        }
    }, [user]);

    const clickToEdit = () => {
        setEdit(true);
    };

    const clickToSave = () => {
        setEdit(false);
    };

    const clickToCancel = () => {
        setEdit(false);
    };

    return (
        <div className="userInfoMainContainer">
            <div className="userContainer">
                <img src="/images/avatar2.jpeg" alt="useravatar" className="image"></img>
                {edit ? (
                    <div className="buttonsContainer">
                        <button className="saveButton" onClick={clickToSave}>Save</button>
                        <button className="cancelButton" onClick={clickToCancel}>Cancel</button>
                    </div>
                ) : (
                    <i className="fas fa-edit icon" onClick={clickToEdit}></i>
                )
                }
                <div className="informationContainer">
                    <p className="textContainer">Name</p>
                    {edit ? (
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            className="input"
                        />
                    ) : (
                        <p className="answerContainer">{name}</p>)
                    }
                </div>
                <div className="informationContainer">
                    <p className="textContainer">Username</p>
                    {edit ? (
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                            className="input"
                        />
                    ) : (
                        <p className="answerContainer">{username}</p>)
                    }
                </div>
                <div className="informationContainer">
                    <p className="textContainer">Email</p>
                    {edit ? (
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            className="input"
                        />
                    ) : (
                        <p className="answerContainer">{email}</p>)
                    }
                </div>
            </div>
        </div>
    );
};

export default UserInfo;