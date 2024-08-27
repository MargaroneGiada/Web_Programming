import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'
import Navbar from './Navbar'
import './App.css'

function Organizer() {

  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/homepage');
    } else {
      axios.get('/api/auth/verifyOrganizer', { headers: { authorization: token } })
        .then(response => {
          if (response.status !== 200) {
            navigate('/homepage');
          } else {
            setUser(response.data.user);
            fetchUserEvents();
          }
        })
        .catch((error) => {
          console.error('Verification error:', error);
          navigate('/homepage');
        });

    }
  }, [navigate]);

  const handleEventClick = (eventId) => {
    const goto = '/evento?id=' + eventId;
    navigate(goto);
  }


  const fetchUserEvents = async () => {

    await axios.get('/api/events/eventsOf', { headers: { authorization: sessionStorage.getItem('token') } })
      .then(response => {
        setEvents(response.data.events || []);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  };

  if (!user) {
    return <div>Caricamento in corso...</div>
  }

  return (

    <div className="Organizer fullpage">

      <Navbar />

      <div className='container px-lg-5 p-4 p-lg-5 bg-white rounded-3 text-center mb-3'>
        <h1 className="display-5 fw-bold text-primary text-center">I tuoi eventi</h1>
        {events.length > 0 ? (
          <div>
            <a className="btn btn-primary btn-lg center m-5" href='/organizzatore/crea'>
              Crea
            </a>
            <div className='row gx-lg-5'>
              {events.map((event) => {
                const data = new Date(event.date);
                return (
                  <div key={event._id} className="card col-lg-6 col-xxl-4 mb-5  border-0 bg-transparent text-start " onClick={() => handleEventClick(event._id)}>
                    <figure className="card-img-top mb-0 overflow-hidden bsb-overlay-hover">
                      <a className=' overflow-hidden'>
                        {event.images.length > 0 && (
                          <img src={`${event.images[0]}`} alt={`event`} className="img-thumbnail" />
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
                    <div className="card-footer border-0 bg-light p-0 m-0">
                      {/* <ul className="entry-meta list-unstyled d-flex align-items-center m-0 justify-content-end">
                            
                          </ul> */}
                      <h2 className="card-title entry-title h4 m-1 mb-3 text-center">
                        <a className="link-primary text-decoration-none" >{event.name}</a>
                      </h2>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


        )
          :
          (
            <div className='container'>
              <p className='text-secondary text-center pt-5 pb-5'>Nessun evento creato</p>
              <a className="btn btn-primary btn-lg center" href='/organizzatore/crea'>
                Crea
              </a>
            </div>
          )}
      </div>




      {/* ------------------------------------ FORM CREA EVENTO --------------------------------------------- 

       */}

      <Footer />
    </div>


  );
}

export default Organizer;
