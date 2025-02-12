// frontend/src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import api from '../api';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.get('/api/users/verify', {
                headers: { Authorization: token }
            })
            .then(response => {
                setUser(response.data.user);
            })
            .catch(() => {
                localStorage.removeItem('token');
            })
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/api/users/login', { email, password });
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return { user, loading, login, logout };
};

export default useAuth;
