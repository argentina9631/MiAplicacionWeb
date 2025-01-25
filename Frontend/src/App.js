// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from './components/LoginForm';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await axios.get(
                    'https://app-e1cc2c91-dfc6-49c5-8a1c-6a1907e248e3.cleverapps.io/api/users/auth/verify',
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (response.data) setIsAuthenticated(true);
            } catch (error) {
                localStorage.removeItem('token');
            }
        };

        verifyToken();
    }, []);

    if (!isAuthenticated) {
        return <LoginForm />;
    }

    return <h1>Bienvenido a la aplicación</h1>;
};

export default App;

