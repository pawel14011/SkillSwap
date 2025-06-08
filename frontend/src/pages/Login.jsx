import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useNotify } from '../hooks/useNotify';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const auth = useAuth();
    const navigate = useNavigate();
    const notify = useNotify();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/login', formData);
            auth.login(data);
            notify.success('Zalogowano pomyślnie!');
            navigate('/profile');
        } catch (error) {
            notify.error(error.response?.data?.message || 'Błąd logowania');
        }
    };

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">Zaloguj się</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input type="email" name="email" onChange={handleChange} required className="w-full px-3 py-2 mt-1 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Hasło</label>
                        <input type="password" name="password" onChange={handleChange} required className="w-full px-3 py-2 mt-1 border rounded-md" />
                    </div>
                    <button type="submit" className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Zaloguj</button>
                </form>
                 <p className="text-sm text-center">
                    Nie masz konta? <Link to="/register" className="text-indigo-600 hover:underline">Zarejestruj się</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
