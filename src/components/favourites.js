import { useState,useEffect } from "react";
import NavBar from "./navbar";
import MoviesDataService from '../services/movies';

import { Container, Row, Col, Card, Image,  } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Favourite = ({logout}) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
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
    }, []); 
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
    return (
        <>
            <NavBar logout={logout}/>
            <h1 className="text-center">Your Favourites</h1>
            <Container>
            <Row>
            { favorites.map((movie) => (
                <Col xs={6} md={4} lg={3} key={movie.imdbID} className="mb-4">
                <Link to={`/detail/${movie.imdbID}`} className='textdec'>
                    <Card>
                    <Card.Img variant="top" src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/600x400'} />
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>
                        <strong>Year:</strong> {movie.Year}
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </Link>
                </Col>
            )) }
            </Row>
            </Container>
        </>
    )
}

export default Favourite;
 