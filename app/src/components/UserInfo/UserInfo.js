import React, { useEffect } from "react";
import { useState } from "react";

import styles from './UserInfo.module.css';

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
        <div className={styles.userInfoMainContainer}>
            <div className={styles.userContainer}>
                {edit ? (
                    <div className={styles.fileContainer}>
                        <input
                            className={styles.fileStyle}
                            type="file"
                            onChange={handleFileChange}
                            id="fileInput"
                        />
                        <label htmlFor="fileInput" className={styles.customFileLabel}>
                            <i className="fas fa-upload"></i> {/* Add the icon here */}
                        </label>
                        <p>Click to upload new image</p>
                    </div>
                ) : (
                    <img src={`/images/${image}`} alt={name} className={styles.image}></img>
                )}
                {edit ? (
                    <div className={styles.buttonsContainer}>
                        <button className={styles.saveButton} onClick={clickToSave}>Save</button>
                        <button className={styles.cancelButton} onClick={clickToCancel}>Cancel</button>
                    </div>
                ) : (
                    <i className={`fas fa-edit ${styles.icon}`} onClick={clickToEdit}></i>
                )
                }
                <div className={styles.informationContainer}>
                    <p className={styles.textContainer}>Name</p>
                    {edit ? (
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                        />
                    ) : (
                        <p className={styles.answerContainer}>{name}</p>)
                    }
                </div>
                <div className={styles.informationContainer}>
                    <p className={styles.textContainer}>Username</p>
                    {edit ? (
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                        />
                    ) : (
                        <p className={styles.answerContainer}>{username}</p>)
                    }
                </div>
                <div className={styles.informationContainer}>
                    <p className={styles.textContainer}>Email</p>
                    {edit ? (
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                        />
                    ) : (
                        <p className={styles.answerContainer}>{email}</p>)
                    }
                </div>
            </div>
        </div>
    );
};

export default UserInfo;