import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {  useNavigate } from 'react-router-dom';
import NavBar from './navbar';



const MovieDetail = ({favourite,logout}) => {
  const Navigate = useNavigate();
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);


  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      console.log("Extracted imdbID:", imdbID);
      const imdb = String(imdbID)
      console.log(imdb)
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${imdb}&apikey=5b5c9220`);
        console.log(response.data)
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  const handleFavourite = (event) => {
    event.preventDefault();
    if (favourite(movie)) {
      Navigate('/')
    }
    else{
      console.log("something is wrong")
    }
  }


  if (loading) {

    return (
      <Container>
        <Spinner animation="border"  className="middle"/>;
      </Container>
    
    )
  }


  return (
    <>
    <NavBar logout={logout}/>
    <div className="xcontainer container ">
        { movie ? 
              <>
              <div className='detail'>
        
                  <img
                    src={movie.Poster}
                    className='img-thumbnail'
                    alt={movie.Title}
                  />
                  <br/>
                  <h1> {movie.Title}</h1>
                  <br/>
                  <p>
                  <strong>Year-</strong> {movie.Year}
                  <br/>
                  <strong>Rated-</strong> {movie.Rated}
                  <br/>
                  <strong>Released-</strong> {movie.Released}
                  <br/>
                  <strong>Runtime-</strong> {movie.Runtime}
                  <br/>
                  <strong>Genre-</strong> {movie.Genre}
                  <br/>
                  <strong>Director-</strong> {movie.Director}
                  <br/>
                  <strong>Writer-</strong> {movie.Writer}
                  <br/>
                  <strong>Actors-</strong> {movie.Actors}
                  <br/>
                  <strong>Awards-</strong> {movie.Awards}
                  <br/>
                  <strong>Language-</strong> {movie.Language}
                  <br/>
                  <strong>Country-</strong> {movie.Country}
              </p>
            </div>
            <div className='details2'>
              <p>
                <strong>Plot- </strong> {movie.Plot}
                <br/>
                <strong>Metascore - </strong> {movie.Metascore}
                <br/>
                <strong>imdbRating - </strong> {movie.imdbRating}
                <br/>
                <strong>imdbVotes - </strong> {movie.imdbVotes}
                <br/>
                <strong>Type - </strong> {movie.Type}
                <br/>
                <strong>BoxOffice - </strong> {movie.BoxOffice}
                <br/>
              </p>
              <Button variant="outline-success" onClick={handleFavourite}>Add to Favourites</Button>
            </div>
            </>
        : null }
    
  </div>
  </>
  );
};

export default MovieDetail;
