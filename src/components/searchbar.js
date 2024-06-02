import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import  {useState,} from 'react';


const Searchbar  = ({searchMovie}) => {
    const [moviename,setMoviename] = useState("")
    const onChangeMoviename = e => {
        const moviename = e.target.value;
        setMoviename(moviename);
      }
    const handleSearch =  async (event) => {
        event.preventDefault();
        await searchMovie(moviename)

    }
    return (
        <div className="searchContainer">
            <Form >
                <Row>
                    <Col xs="auto">
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        className=" mr-sm-2"
                        value = {moviename}
                        onChange={onChangeMoviename}
                    />
                    </Col>
                    <Col xs="auto">
                    <Button type="submit" onClick={handleSearch}>Search</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Searchbar;
