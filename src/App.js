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

const getFavorites = async () => {
  const xsToken = localStorage.getItem('token');
  if (!xsToken) {
    console.error('x-auth-token not found in localStorage.');
    return [];
  }
  try {
    const response = await MoviesDataService.getFavorites(xsToken);
    return response.data || [];
  } catch (error) {
    console.log("Error fetching favorites:", error);
    return [];
  }
};

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
      console.log('Token and user found in localStorage');
      console.log('Token:', storedToken);
      console.log('User:', storedUser);

      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setAuth(true);
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
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
    console.log('Logged out successfully');
    setUser(null);
    setAuth(false);
  }

  async function signup(user = null) {
    try {
      const response = await MoviesDataService.signup(user);
      if (response.status !== 201) {
        console.log(response.data);
        setRMessage(response.data.message);
        return false;
      }
      setRMessage(response.data.message);
      setError('');
      setAuth(true);
      return true;
    } catch (e) {
      console.log('signup', e);
      setError(e.toString());
      setRMessage(e.response && e.response.status === 400 ? e.response.data.message : "Registration failed");
      return false;
    }
  }

  async function login(user) {
    try {
      const response = await MoviesDataService.login(user);

      if (response.status !== 200) {
        console.log(response.data);
        setMessage(response.data);
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
      console.log("true");

      return true;
    } catch (e) {
      console.log('login', e);
      setError(e.toString());
      setMessage("Enter correct Email and Password");
      return false;
    }
  }
 
  if (loading) {
    return (<div>Loading...</div>)
  }
  const searchMovie = (movieName) => {
    axios.get(`http://www.omdbapi.com/?s=${movieName}&apikey=5b5c9220`)
      .then((response) => {
        if (response.data && response.data.Search) {
          setSearchResults(response.data.Search);
          console.log(searchResults)
        } else {
          setSearchResults([]); // Clear results if no movies found
        }
      })
      .catch((error) => {
        console.error("Error fetching the movie data:", error);
        setSearchResults([]); // Clear results in case of error
      });
  };
  const favourite = async (movie) => {
    const xsToken = localStorage.getItem('token')
    if (!xsToken) {
        console.error('x-auth-token not found in localStorage.');
        return false;
    }
    try {
        const response = await MoviesDataService.addFavorite(movie, xsToken);
        if (response.status === 400) {
            console.log(response.data);
        }
        return true;
    } catch (error) {
        console.log("Error adding Favourite:", error);
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
        <Route path="/favourites" element={auth ? <Favourite logout={logout} Favorites={favorites} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
