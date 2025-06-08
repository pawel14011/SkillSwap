import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="text-center py-20">
        <h1 className="text-6xl font-bold text-indigo-600">404</h1>
        <p className="text-2xl mt-4">Strona nie została znaleziona</p>
        <p className="text-gray-600 mt-2">Wygląda na to, że strona, której szukasz, nie istnieje.</p>
        <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">Wróć na stronę główną</Link>
    </div>
);
export default NotFound;