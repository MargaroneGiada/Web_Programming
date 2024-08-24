import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, isValid, isAfter } from 'date-fns';
import Navbar from './Navbar';
import LocationSearchInput from './LocationSearchInput';

function CreateEvent() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: new Date(), 
        location: '',
        category: 'cultura',
        images: [],
        latitude: '',
        longitude: '',
    });

    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    

    //prima del caricamento totale della pagina
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            axios.get('/api/auth/verifyOrganizer', { headers: { authorization: token } })
                .then(response => {
                    if (response.status !== 200) {
                        navigate('/organizzatore');
                    } else {
                        setUser(response.data.user);
                    }
                })
                .catch(error => {
                    console.error('Verification error:', error);
                    navigate('/organizzatore');
                });
        }
    }, [navigate]);

    //inserisco preventivamente l'id organizzatore nel formData
    useEffect(() => {
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                organizer: user._id,
            }));
        }
    }, [user]);

    //cambio in tempo reale i valori nel formData
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prevData => ({
            ...prevData,
            images: files 
        }));
    };

    const handleLocationSelect = (coordinates) => {
        setFormData(prevData => ({
            ...prevData,
            location: coordinates.location,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prevData => ({
            ...prevData,
            date
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!isValid(formData.date)) {
            setErrorMessage('Data non valida.');
            return;
        }
    
        if (!isAfter(formData.date, new Date())) {
            setErrorMessage('La data deve essere uguale o successiva alla data odierna.');
            return;
        }
    
        try {
            const formattedDate = format(formData.date, 'yyyy-MM-dd HH:mm');
            console.log('Formatted date:', formattedDate);

            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('date', formattedDate);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('organizer', user._id);
            formDataToSend.append('latitude', formData.latitude);
            formDataToSend.append('longitude', formData.longitude);
    
            formData.images.forEach((image) => {
                console.log(image);
                formDataToSend.append('images', image);
            });

            formDataToSend.append('images', '/assets/img/logoNuovo.jpg');
    
            // Invia il FormData al server
            const response = await axios.post('/api/events/create', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const goto = "/evento?id=" + response.data._id;
    
            navigate(goto);
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Errore nella creazione dell\'evento.');
        }
    };
    

    if (!user) {
        return <div>Caricamento in corso...</div>;
    }

    return (
        <div className="Create fullpage">
            <Navbar />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                    <div className="card border border-light-subtle rounded-3 shadow-sm">
                        <div className="card-body p-3 p-md-4 p-xl-5">
                            <h2 className="fs-1 fw-bold text-center text-danger mb-4">
                                Crea un nuovo evento
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="row gy-2 overflow-hidden">
                                    <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                className="form-control border-danger"
                                                name="name"
                                                id="name"
                                                placeholder="Nome dell'evento"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="name" className="form-label text-warning">
                                                Nome dell'evento
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <textarea
                                                className="form-control border-danger"
                                                name="description"
                                                id="description"
                                                placeholder="Descrizione dell'evento"
                                                value={formData.description}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="description" className="form-label text-warning">
                                                Descrizione
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label htmlFor="date" className="form-label text-warning">
                                                Data e ora: &ensp;
                                            </label>
                                            <DatePicker
                                                selected={formData.date}
                                                onChange={handleDateChange}
                                                showTimeSelect
                                                dateFormat="dd/MM/yyyy HH:mm"
                                                minDate={new Date()} 
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label htmlFor="place" className="form-label text-warning">
                                                Luogo : &ensp;
                                            </label>
                                            <LocationSearchInput onSelect={handleLocationSelect} />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <select
                                                className="form-select border-danger"
                                                name="category"
                                                id="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="cultura">Cultura</option>
                                                <option value="concerti">Concerti</option>
                                                <option value="mostre">Mostre</option>
                                                <option value="party">Party</option>
                                                <option value="sport">Sport</option>
                                            </select>
                                            <label htmlFor="category" className="form-label text-warning">
                                                Categoria
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label htmlFor="images" className="form-label text-warning">
                                                Immagini
                                            </label>
                                            <input
                                                type="file"
                                                className="form-control border-danger"
                                                name="images"
                                                id="images"
                                                onChange={handleImageChange}
                                                multiple
                                            />
                                        </div>
                                    </div>

                                    {errorMessage && (
                                        <div className="col-12">
                                            <p className="text-danger text-center">{errorMessage}</p>
                                        </div>
                                    )}

                                    <div className="col-12">
                                        <div className="d-grid my-3">
                                            <button className="btn btn-danger btn-lg" type="submit">
                                                Crea Evento
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateEvent;
