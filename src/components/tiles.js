
import { Container, Row, Col, Card, Image,  } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


function MovieTiles({searchResults}) {
  return (
    <Container>
    <Row>
      {searchResults.map((movie) => (
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
      ))}
    </Row>
  </Container>
    
  );
}

export default MovieTiles;


