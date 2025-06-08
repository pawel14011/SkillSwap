import React, { useState, useEffect } from 'react';
import api from '../api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => { api.get('/admin/users').then(res => setUsers(res.data)); }, []);
    
    return (
     <div className="space-y-8">
            <h1 className="text-3xl font-bold">Panel Administratora</h1>
            <div><h2 className="text-xl font-semibold mb-4">Użytkownicy ({users.length})</h2><div className="bg-white p-4 rounded-lg shadow-md"><table className="w-full text-left"><thead><tr><th>ID</th><th>Username</th><th>Email</th><th>Rola</th><th>Akcje</th></tr></thead><tbody>{users.map(u => <tr key={u.id}><td>{u.id.substring(0, 8)}...</td><td>{u.username}</td><td>{u.email}</td><td>{u.role}</td><td><button onClick={() => handleDeleteUser(u.id)} className="text-red-500">Usuń</button></td></tr>)}</tbody></table></div></div>
            <div><h2 className="text-xl font-semibold mb-4">Oferty ({offers.length})</h2><div className="bg-white p-4 rounded-lg shadow-md">{/* Tabela z ofertami */}</div></div>
        </div>
    );
};
export default AdminDashboard;