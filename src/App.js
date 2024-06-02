import './App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home';
import React from 'react';
import RegistrationForm from './components/signup';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/login';
import MoviesDataService from './services/movies';
import MovieDetail from './components/detail';
import axios from 'axios';
import Favourite from './components/favourites';



function App() {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState('');
  const [message, setMessage] = useState("");
  const [rmessage, setRMessage] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setAuth(true);
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false); 
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          setError('No token found');
          setLoading(false);
          return;
        }

        const response = await MoviesDataService.getFavorites(token);
        setFavorites(response.data);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to fetch favorites');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);  // Ensure this useEffect runs once on component mount

  async function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setAuth(false);
  }

 
  async function signup(user) {
    setLoading(true);
    try {
      const response = await MoviesDataService.signup(user);
      if (response.status !== 201) {
        setMessage(response.data.message);
        setLoading(false);
        return false;
      }
      setMessage(response.data.message);
      setError('');
      setAuth(true);
      setLoading(false);
      return true;
    } catch (e) {
      setError(e.toString());
      setMessage(e.response && e.response.status === 400 ? e.response.data.message : "Registration failed");
      setLoading(false);
      return false;
    }
  }

  async function login(user) {
    setLoading(true);
    try {
      const response = await MoviesDataService.login(user);

      if (response.status !== 200) {
        setMessage(response.data);
        setLoading(false);
        return false;
      }

      const userData = response.data.user;

      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(userData)); 

      setError('');
      setMessage('');
      setAuth(true);
      setUser(userData);
      setLoading(false);

      return true;
    } catch (e) {
      setError(e.toString());
      setMessage("Enter correct Email and Password");
      setLoading(false);
      return false;
    }
  }
 
  if (loading) {
    return (<div>Loading...</div>)
  }
  const searchMovie =  async (movieName) => {
    setLoading(true)
    await axios.get(`http://www.omdbapi.com/?s=${movieName}&apikey=5b5c9220`)
      .then((response) => {
        if (response.data && response.data.Search) {
          setSearchResults(response.data.Search);
          setLoading(false)
        } else {
          setSearchResults([]); // Clear results if no movies found
        }
      })
      .catch((error) => {
        setSearchResults([]); // Clear results in case of error
      });
  };
  const favourite = async (movie) => {
    const xsToken = localStorage.getItem('token')
    if (!xsToken) {
        return false;
    }
    try {
        const response = await MoviesDataService.addFavorite(movie, xsToken);
        if (response.status === 400) {
            console.log(response.data);
        }
        return true;
    } catch (error) {
        return false;
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={auth ? <Home logout={logout} searchMovie={searchMovie} searchResults={searchResults} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm login={login} message={message} />} />
        <Route path="/signup" element={<RegistrationForm rmessage={rmessage} signup={signup} />} />
        <Route path="/detail/:imdbID" element={auth ? <MovieDetail logout={logout} favourite={favourite} /> : <Navigate to="/login" />} />
        <Route path="/favourites" element={auth ? <Favourite logout={logout}  /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
