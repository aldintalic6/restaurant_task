import React, { useState, useEffect } from 'react';

function Hello() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5001')
          .then((response) => response.text())
          .then((data) => setMessage(data))
          .catch((error) => console.error('Error fetching data:', error));
      }, []);

    return (
    <div>
      <h1>{message}</h1>
    </div>
    );
}

export default Hello;