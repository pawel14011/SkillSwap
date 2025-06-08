import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNotify } from '../hooks/useNotify';
import { FaUser, FaPlus, FaExchangeAlt, FaSignOutAlt, FaCog } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const notify = useNotify();

    const handleLogout = () => {
        logout();
        notify.success('Wylogowano pomyślnie!');
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-indigo-600">SkillSwap</Link>
                    <div className="flex items-center space-x-5">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600">Przeglądaj</Link>
                        {user ? (
                            <>
                                <Link to="/create-offer" className="flex items-center space-x-1 hover:text-indigo-600"><FaPlus /> <span>Dodaj</span></Link>
                                <Link to="/matches" className="flex items-center space-x-1 hover:text-indigo-600"><FaExchangeAlt /> <span>Dopasowania</span></Link>
                                {user.role === 'ADMIN' && (
                                     <Link to="/admin" className="flex items-center space-x-1 hover:text-indigo-600"><FaCog /> <span>Admin</span></Link>
                                )}
                                <Link to="/profile" className="flex items-center space-x-1 hover:text-indigo-600"><FaUser /> <span>Profil</span></Link>
                                <button onClick={handleLogout} className="flex items-center space-x-1 text-red-500 hover:text-red-700"><FaSignOutAlt /> <span>Wyloguj</span></button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-indigo-600">Logowanie</Link>
                                <Link to="/register" className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Rejestracja</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;