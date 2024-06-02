import { useState } from "react";
import NavBar from "./navbar";

import { Container, Row, Col, Card, Image,  } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Favourite = ({logout,Favorites}) => {

    
    return (
        <>
            <NavBar logout={logout}/>
            <h1 className="text-center">Your Favourites</h1>
            <Container>
            <Row>
            { Favorites.map((movie) => (
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
 