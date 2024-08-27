import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Category = () => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [categoria, setCategoria] = useState('');
    const navigate = useNavigate();

    const fetchEventi = async () => {
        const query = new URLSearchParams(location.search);
        const categoriaParam = query.get('c');
        setCategoria(categoriaParam || 'tutto');
        await axios.get(`/api/events/category`,
            {
                headers: { authorization: sessionStorage.getItem('token') },
                params: { category: categoriaParam }
            }
        ).then(response => {
            setEvents(Array.isArray(response.data) ? response.data : []);

        }).catch(error => {
                console.error('Error fetching events:', error);
            });
    };

    useEffect(() => {

        axios.get('/api/auth/verify', { headers: { authorization: sessionStorage.getItem('token') } })
            .then(response => {
                if (response.status !== 200) {
                    navigate('/homepage');
                } else {
                    setUser(response.data.user);
                    fetchEventi();
                }
            })
            .catch(error => {
                console.error('Verification error:', error);
                navigate('/homepage');
            });

    }, [location.search]);
    
    useEffect(() => {
        fetchEventi();
    }, [location.search]);

    const handleEventClick = (eventId) => {
        const goto = '/evento?id=' + eventId;
        navigate(goto);
    }

    return (
        <div className='fullpage'>
            <Navbar />
            <header className="py-5">
                <div className="container px-lg-5">
                    <div className="futureEvents p-4 p-lg-5 bg-white rounded-3 text-center">
                        <div className="m-4 m-lg-4">
                            <h1 className="display-5 fw-bold text-primary text-capitalize">{categoria}</h1>
                        </div>
                        <div className="row gx-lg-5">
                            {events.length > 0 ? (
                                events.map((event) => {
                                    const data = new Date(event.date);
                                    return (
                                        <div key={event._id} className="event card col-lg-6 col-xxl-4 mb-5 border-0 bg-transparent text-start" onClick={() => handleEventClick(event._id)}>
                                            <figure className="card-img-top mb-0 overflow-hidden bsb-overlay-hover">
                                                <a className='overflow-hidden'>
                                                    {event.images.length > 0 ? (
                                                        <img src={`${event.images[0]}`} alt={`event`} className="img-thumbnail" />
                                                    ) : (
                                                        <img src='/assets/img/logoNuovo.png' alt={`event`} className="img-thumbnail" />
                                                    )}
                                                </a>
                                                <figcaption>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-eye text-white bsb-hover-fadeInLeft" viewBox="0 0 16 16">
                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                    </svg>
                                                    <h4 className="h6 text-white bsb-hover-fadeInRight mt-2">Scopri evento</h4>
                                                </figcaption>
                                            </figure>
                                            <div className="card-body p-2 bg-light">
                                                <div className="entry-header row">
                                                    <ul className="entry-meta list-unstyled d-flex mb-3">
                                                        <li className='col-6'>
                                                            <a className="text-capitalize d-inline-flex m-3 px-2 py-1 bg-secondary link-light text-accent-emphasis bg-accent-subtle border border-accent-subtle rounded-2 text-decoration-none fs-7">{event.category}</a>
                                                        </li>
                                                        <li className='col-6'>
                                                            <a className="fs-5 link-secondary m-3 text-decoration-none d-flex justify-content-end">
                                                                <span className="ms-2 fs-5">
                                                                    {data.toLocaleDateString('it-IT', {
                                                                        year: 'numeric',
                                                                        month: 'numeric',
                                                                        day: 'numeric'
                                                                    })}
                                                                    ,
                                                                    {data.toLocaleTimeString('it-IT', {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })}
                                                                </span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="card-footer border-0 bg-light p-0 m-0 mb-3">
                                                <h2 className="card-title entry-title h4 m-1 mb-3 text-center">
                                                    <a className="link-primary text-decoration-none">{event.name}</a>
                                                </h2>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div>Nessun evento in programma</div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <Footer />
        </div>
    );
};

export default Category;
