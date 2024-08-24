import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Register from './content/Register';
import Login from './content/Login';
import Homepage from './content/Homepage';
import Mappa from './content/Mappa';
import Organizer from './content/Organizer';
import CreateEvent from './content/CreateEvent';
import EventDetails from './content/EventDetails';
import Profile from './content/Profile';
import Chat from './content/Chat';
import Category from './content/Category';
import { LoadScript } from '@react-google-maps/api';

const mapId = '6e674a5f15d5b512';
const apiKey = "AIzaSyDfHYlA0EODV9YfoDGc5pAO93XLqhu_0Fs";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <LoadScript
      googleMapsApiKey={apiKey}
      mapIds={[mapId]}
    >
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/mappa" element={<Mappa />} />
        <Route path="/organizzatore" element={<Organizer />} />
        <Route path="/organizzatore/crea" element={<CreateEvent />} />
        <Route path="/evento" element={<EventDetails />} />
        <Route path="/profilo" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/categorie" element={<Category />} />
      </Routes>
    </Router>
    </LoadScript>
  </React.StrictMode>
);
