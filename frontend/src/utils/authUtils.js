import axios from 'axios';

export const verificarToken = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }

  try {
    const response = await axios.get('https://app-e1cc2c91-dfc6-49c5-8a1c-6a1907e248e3.cleverapps.io/api/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.message === 'Token válido';
  } catch (err) {
    console.error('Error al verificar el token:', err);
    return false;
  }
};
