import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import './UserInfo.css';

import { useUser } from "../../contexts/UserContext";

const UserInfo = () => {
    const { user } = useUser();
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState('testname');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
            setImage(user.image);
        }
    }, [user]);

    const clickToEdit = () => {
        setEdit(true);
    };

    const clickToSave = () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        if (image instanceof File) {
            formData.append('image', image);
        }

        fetch(`http://localhost:5001/user/${user.id}`, {
            method: 'PUT',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                setEdit(false);
            })
            .catch(error => console.error('Error updating user details:', error));
    };

    const clickToCancel = () => {
        setEdit(false);
        setUsername(user.username);
        setEmail(user.email);
        setImage(user.image);
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="userInfoMainContainer">
            <div className="userContainer">
                {edit ? (
                    <div className="fileContainer">
                        <input
                            className="fileStyle"
                            type="file"
                            onChange={handleFileChange}
                            id="fileInput"
                        />
                        <label htmlFor="fileInput" className="customFileLabel">
                            <i className="fas fa-upload"></i> {/* Add the icon here */}
                        </label>
                        <p>Click to upload new image</p>
                    </div>
                ) : (
                    <img src={`/images/${image}`} alt={name} className="image"></img>
                )}
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