import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useNotify } from '../hooks/useNotify';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();
    const notify = useNotify();
    const { login } = useAuth();
    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = async e => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) return notify.error("Hasła nie są takie same!");
        try {
            const { data } = await api.post('/auth/register', {
                username: formData.username, email: formData.email, password: formData.password
            });
            login(data);
            notify.success('Rejestracja udana! Witaj na pokładzie!');
            navigate('/profile');
        } catch (error) {
            notify.error(error.response?.data?.message || 'Błąd rejestracji');
        }
    };
    return (
        <div className="flex items-center justify-center mt-10">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">Stwórz konto</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><label className="block text-sm font-medium">Nazwa użytkownika</label><input type="text" name="username" onChange={handleChange} required className="w-full px-3 py-2 mt-1 border rounded-md" /></div>
                    <div><label className="block text-sm font-medium">Email</label><input type="email" name="email" onChange={handleChange} required className="w-full px-3 py-2 mt-1 border rounded-md" /></div>
                    <div><label className="block text-sm font-medium">Hasło</label><input type="password" name="password" onChange={handleChange} required className="w-full px-3 py-2 mt-1 border rounded-md" /></div>
                    <div><label className="block text-sm font-medium">Potwierdź hasło</label><input type="password" name="confirmPassword" onChange={handleChange} required className="w-full px-3 py-2 mt-1 border rounded-md" /></div>
                    <button type="submit" className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">Zarejestruj się</button>
                    <p className="text-sm text-center">Masz już konto? <Link to="/login" className="text-indigo-600 hover:underline">Zaloguj się</Link></p>
                </form>
            </div>
        </div>
    );
};
export default Register;