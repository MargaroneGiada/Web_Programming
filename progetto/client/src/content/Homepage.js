import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import Footer from './Footer'
import './App.css'

function Homepage() {

    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const serverBaseUrl = 'http://localhost:5000'; 


    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            axios.get('/api/auth/verify', { headers: { authorization: token } })
                .then(response => {
                    if (response.status !== 200) {
                        navigate('/login');

                    } else {
                        setUser(response.data.user);
                        fetchFutureEvents();
                    }
                })
                .catch((error) => {
                    console.error('Verification error:', error);
                    navigate('/login');
                });
        }
    }, [navigate]);

    const fetchFutureEvents = async () => {
        await axios.get('/api/events/futureEvents', { headers: { authorization: sessionStorage.getItem('token') } })
            .then(response => {
                setEvents(response.data || []);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }

    const handleEventClick = (eventId) => {
        const goto = '/evento?id=' + eventId;
        navigate(goto);
    }

    if (!user) {
        return <div>Caricamento in corso...</div>
    }

    return (

        <div className=" Homepage fullpage">

            <Navbar />

            {/* -------------------------------------------------------------------- WELCOME ------------------------------------------------------------------------------------- */}

            <div className="pt-5 mt-5">
                <h1 className=" mb-0 display-5 fw-bold text-primary text-center">Ciao {`${user.username}`}!</h1>
            </div>
            {/* -------------------------------------------------------------------- FUTURE EVENTS ------------------------------------------------------------------------------------- */}

            <header className="py-5 ">
                <div className=" container px-lg-5">
                    <div className="futureEvents p-4 p-lg-5 bg-white rounded-3 text-center" >
                        <div className="m-4 m-lg-4">
                            <h1 className="display-5 fw-bold text-primary">I tuoi eventi futuri</h1>
                        </div>
                        <div className="row gx-lg-5">

                            {events.length > 0 ? (
                                events.map((event) => {
                                    const data = new Date(event.date);
                                    return (
                                        <div key={event._id} className="event card col-lg-6 col-xxl-4 mb-5  border-0 bg-transparent text-start " onClick={() => handleEventClick(event._id)}>
                                            <figure className="card-img-top mb-0 overflow-hidden bsb-overlay-hover">
                                                <a className='overflow-hidden'>
                                                    {event.images.length > 0 && (
                                                        <img src={`${serverBaseUrl}${event.images[0]}`} alt={`event`} className="img-thumbnail" />
                                                    )
                                                    }{event.images.length <= 0 && (
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
                                            </figure> {/* -------------------------------------------------------------------- SPAZIO ------------------------------------------------------------------------------------- */}

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
                                                    <a className="link-primary text-decoration-none" >{event.name}</a>
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

            {/* --------------------------------------------------------------------  EVENTS ------------------------------------------------------------------------------------- */}


            <section className="pt-4">
                <div className="container px-lg-5">
                    <div className="row gx-lg-5">
                        {/* <div className="event card col-lg-6 col-xxl-4 mb-5  border-0 bg-transparent text-start ">
                            <figure className="card-img-top mb-0 overflow-hidden bsb-overlay-hover ">
                                <a href="#" className='overflow-hidden'>
                                    <img className="img-fluid bsb-scale center bsb-hover-scale-up" loading="lazy" src="https://picsum.photos/1500/1000" alt="Living" />
                                </a>
                                <figcaption>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-eye text-white bsb-hover-fadeInLeft" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                    </svg>
                                    <h4 className="h6 text-white bsb-hover-fadeInRight mt-2 ">Scopri evento</h4>
                                </figcaption>
                            </figure>
                            <div className="card-body p-2 bg-light">
                                <div className="entry-header mb-3">
                                    <ul className="entry-meta list-unstyled d-flex mb-3 ">
                                        <li>
                                            <a className="d-inline-flex m-2 px-2 py-1 bg-secondary link-light text-accent-emphasis bg-accent-subtle border border-accent-subtle rounded-2 text-decoration-none fs-7" href="#!">Sport</a>
                                        </li>
                                    </ul>
                                    <h2 className="card-title entry-title h4 m-1">
                                        <a className="link-primary text-decoration-none  " href="#!">Olimpiadi</a>
                                    </h2>
                                </div>
                            </div>
                            <div className="card-footer border-0 bg-light p-0 m-0">
                                <ul className="entry-meta list-unstyled d-flex align-items-center m-0">
                                    <li>
                                        <a className="fs-7 link-dark text-decoration-none d-flex align-items-center" href="#!">
                                            <span className="ms-2 fs-7">11 Dec 2030</span>
                                        </a>
                                    </li>
                                    <li>
                                        <span className="px-3">&bull;</span>
                                    </li>
                                    <li>
                                        <a className="link-dark text-decoration-none d-flex align-items-center" href="#!">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chat-dots" viewBox="0 0 16 16">
                                                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                                <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                                            </svg>
                                            <span className="ms-2 fs-7">383</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div> */}

                    </div>
                </div>
            </section>


            {/* ----------------------------- FOOTER -------------------------------------------------*/}

            <Footer />

        </div>
    );
}


export default Homepage;
