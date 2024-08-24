import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import './App.css';

function Navbar() {
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const searchRef = useRef(null);
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
                    }
                })
                .catch(error => {
                    console.error('Verification error:', error);
                    navigate('/login');
                });
        }
    }, [navigate]);

    useEffect(() => {
        // Close dropdown if clicked outside
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const logout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    const handleSearch = (event) => {
        event.preventDefault();
        axios.get('/api/events/search', { params: { search: searchTerm } })
            .then(response => {
                setSearchResults(response.data);
                setDropdownVisible(true);
            })
            .catch(error => {
                console.error('Search error:', error);
                setDropdownVisible(false);
            });
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setSearchResults([]);
            setDropdownVisible(false);
        } else {
            handleSearch(event);
        }
    };

    if (!user) {
        return <div>Caricamento in corso...</div>;
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-success fixed-top shadow">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/homepage">
                        <img src="/assets/img/logoNuovo.png" alt="" className="d-inline-block align-text-top" style={{ width: '50px', height: '50px' }} />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/homepage" className="nav-link text-white">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink to="/categorie" className="nav-link dropdown-toggle text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categorie
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink to="/categorie?c=tutto" className="dropdown-item">Tutte</NavLink></li>
                                    <li><NavLink to="/categorie?c=cultura" className="dropdown-item">Cultura</NavLink></li>
                                    <li><NavLink to="/categorie?c=concerti" className="dropdown-item">Concerti</NavLink></li>
                                    <li><NavLink to="/categorie?c=mostre" className="dropdown-item">Mostre</NavLink></li>
                                    <li><NavLink to="/categorie?c=party" className="dropdown-item">Party</NavLink></li>
                                    <li><NavLink to="/categorie?c=sport" className="dropdown-item">Sport</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/mappa" className="nav-link text-white">
                                    Mappa
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/chat" className="nav-link text-white">
                                    Chat
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/profilo" className="nav-link text-white">
                                    Profilo
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/organizzatore" className={`nav-link ${user.organizer ? 'text-white' : 'disabled'}`} href={`${user.organizer ? '/organizzatore' : ''}`} aria-disabled={!user.organizer}>
                                    Organizzatore
                                </NavLink>
                            </li>
                        </ul>
                        <form className="d-flex position-relative" role="search" onSubmit={handleSearch} ref={searchRef}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={handleInputChange}
                            />
                            {dropdownVisible && searchResults.length > 0 && (
                                <ul className="dropdown-menu-mine position-absolute w-100 list-unstyled bg-white rounded-top-1 rounded-bottom-1">
                                    {searchResults.map((event, index) => (
                                        <div className='dropdown-item-mine text-dark fw-bold text-decoration-none pb-2 pt-2'>
                                            <li key={index}  >
                                                <a className="text-decoration-none text-dark ms-3  fw-bold" href={`/evento?id=${event._id}`}>{event.name}</a>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            )}
                        </form>
                        <ul className='navbar-nav mb-2 mb-lg-0 mt-lg-0 mt-3 align-items-center'>
                            <li className='nav-item'>
                                <a onClick={() => logout()} className='btn btn-danger text-white ms-lg-5'>
                                    LogOut
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="m-5 p-2"></div>
        </div>
    );
}

export default Navbar;
