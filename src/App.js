import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Welcome from "./components/Welcome";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5050";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);

  const queryString = `/new-image?query=${searchTerm}`;

  async function searchImageHandler(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}${queryString}`);
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
      {images.length > 0 ? (
        <Container className="mt-4">
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={i}>
                <ImageCard image={image} onDelete={deleteImageHandler} />
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <Welcome />
      )}
    </div>
  );
}

export default App;
