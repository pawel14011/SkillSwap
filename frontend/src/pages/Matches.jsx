import React, { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        api.get('/matches').then(res => setMatches(res.data));
    }, []);

    return (
       <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Twoje dopasowania</h1>
            <div className="space-y-4">
                {matches.length === 0 && <p className="text-center text-gray-500 bg-white p-6 rounded-lg shadow">Brak dopasowań. Dodaj ofertę, aby znaleźć partnerów do wymiany!</p>}
                {matches.map(match => {
                    const otherUser = match.user1.id === user.id ? match.user2 : match.user1;
                    return (
                        <div key={match.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <img src={otherUser.avatarUrl || `https://placehold.co/48x48/e0e7ff/4f46e5?text=${otherUser.username.charAt(0)}`} className="w-12 h-12 rounded-full" alt="Avatar"/>
                                <div><p>Dopasowanie z: <strong>{otherUser.username}</strong></p><p className="text-sm">Status: <span className="font-semibold text-indigo-600">{match.status}</span></p></div>
                            </div>
                            <div className="flex space-x-2">
                                {match.status === 'ACCEPTED' && <Link to={`/chat/${match.id}`} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-sm">Czat</Link>}
                                {match.status === 'PENDING' && match.user2Id === user.id && (<>
                                    <button onClick={() => handleUpdateStatus(match.id, 'ACCEPTED')} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm">Akceptuj</button>
                                    <button onClick={() => handleUpdateStatus(match.id, 'REJECTED')} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm">Odrzuć</button>
                                </>)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Matches;