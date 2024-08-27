import io from 'socket.io-client';


const serverUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'http://192.168.1.25:5000';
const SERVER_URL = serverUrl;

let socket;

const getSocket = () => {
    if (!socket) {
        socket = io(SERVER_URL);
        return socket;
    }
    return socket;
};

export default getSocket;
