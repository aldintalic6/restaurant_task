import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUserData = () => {
        fetch('http://localhost:5001/user', {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                setUser(data);
            } else {
                setUser(null);
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            setUser(null);
        });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser, fetchUserData}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);