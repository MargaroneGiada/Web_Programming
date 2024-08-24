import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Chat = () => {
    return (
        <div className='fullpage'>
            <Navbar />
            <Footer />
        </div>
    );
};

export default Chat;