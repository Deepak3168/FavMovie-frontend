import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import movie from "./components/imgs/movie.jpg"
import movie2 from "./components/imgs/movie2.jpeg"
import movie3 from "./components/imgs/movie3.jpeg"


function AutoSlide() {
  return (
    <Container>
      <Image src={movie} fluid  rounded />
    </Container>
    
  );
}

export default AutoSlide;