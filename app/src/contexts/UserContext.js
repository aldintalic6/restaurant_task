import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    console.log(user);

    useEffect(() => {
        fetch('http://localhost:5001/user', {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                setUser(data)
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });

    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);