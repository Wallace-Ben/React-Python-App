import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
const UNSPLASH_BASE_URL = `https://api.unsplash.com/photos/random/`;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);

  const queryString = `?query=${searchTerm}&client_id=${UNSPLASH_KEY}`;

  async function searchImageHandler(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${UNSPLASH_BASE_URL}${queryString}`);
      const data = await response.json();
      setImages([{ ...data, title: searchTerm }, ...images]);
      console.log(images);
    } catch (err) {
      console.log(err);
    }

    setSearchTerm("");
  }

  function deleteImageHandler(id) {
    setImages(images.filter((image) => image.id !== id));
  }

  return (
    <div className="App">
      <Header title="Images Gallery" />
      <Search
        onSearch={searchImageHandler}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Container className="mt-4">
        <Row xs={1} md={2} lg={3}>
          {images.map((image, i) => (
            <Col key={i}>
              <ImageCard image={image} onDelete={deleteImageHandler} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
