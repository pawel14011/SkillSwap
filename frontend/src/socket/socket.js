import { io } from 'socket.io-client';
const URL = 'http://localhost:5000';
export const socket = io(URL, {
  autoConnect: false // Łączymy się manualnie, gdy jest to potrzebne
});
