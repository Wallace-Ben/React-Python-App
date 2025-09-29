import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./components/Header";
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Welcome from "./components/Welcome";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5050";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchImages() {
      await getSavedImages();
    }
    fetchImages();
  }, []);

  const queryString = `/new-image?query=${searchTerm}`;

  async function searchImageHandler(e) {
    e.preventDefault();

    try {
      const res = await axios.get(`${API_URL}${queryString}`);
      setImages([{ ...res.data, title: searchTerm }, ...images]);
    } catch (error) {
      console.log(error);
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
