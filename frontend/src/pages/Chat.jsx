import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { io } from 'socket.io-client';
import api from '../api';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';

const socket = io('http://localhost:5000'); // Adres Twojego backendu

const Chat = () => {
    const { matchId } = useParams();
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    
    // Pobierz historię wiadomości
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Załóżmy, że masz taki endpoint
                const { data } = await api.get(`/matches/${matchId}/messages`);
                setMessages(data);
            } catch (error) {
                console.error("Failed to fetch messages", error);
            }
        };
        fetchMessages();
    }, [matchId]);

    // Konfiguracja Socket.io
    useEffect(() => {
        if (!matchId) return;

        socket.emit('join_match_room', matchId);

        const handleReceiveMessage = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };
        
        socket.on('receive_message', handleReceiveMessage);

        return () => {
            socket.off('receive_message', handleReceiveMessage);
        };
    }, [matchId]);

    // Przewijanie na dół
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !user) return;

        const messageData = {
            matchId,
            senderId: user._id, // Zakładam, że user.id jest dostępne
            receiverId: 'TUTAJ_ID_DRUGIEGO_UZYTKOWNIKA', // Potrzebujesz logiki by to uzyskać
            content: newMessage,
        };
        
        socket.emit('send_message', messageData);
        // Optymistyczne dodanie wiadomości do UI
        setMessages(prev => [...prev, { ...messageData, sender: { username: 'Ja' }, createdAt: new Date() }]);
        setNewMessage('');
    };

    return (
        <div className="container mx-auto p-4 flex flex-col h-[80vh] bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4 border-b pb-2">Czat</h1>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-lg max-w-xs lg:max-w-md ${msg.senderId === user?._id ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}>
                            <p className="font-bold text-sm">{msg.sender.username}</p>
                            <p>{msg.content}</p>
                             <p className="text-xs text-right mt-1 opacity-75">
                                {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true, locale: pl })}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Wpisz wiadomość..."
                    className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none"
                />
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700">
                    Wyślij
                </button>
            </form>
        </div>
    );
};

export default Chat;