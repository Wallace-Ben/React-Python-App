import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./components/Header";
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Welcome from "./components/Welcome";
import Spinner from "./components/Spinner";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5050";

/**
 * Main application component for the Images Gallery.
 * Manages state for search term and images, handles image search, save, and delete operations.
 *
 * @component
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetches saved images from the backend API and updates the images state.
   * Handles errors by logging them to the console.
   *
   * @async
   * @function getSavedImages
   * @returns {Promise<void>}
   */
  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchImages() {
      await getSavedImages();
    }
    fetchImages();
    toast.success("📸 Your saved images are ready!", {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }, []);

  /**
   * Saves an image by its ID to the backend API and updates its saved status in state.
   * Handles errors by logging them to the console.
   *
   * @async
   * @function handleSaveImage
   * @param {string|number} id - The ID of the image to be saved.
   * @returns {Promise<void>}
   */
  const handleSaveImage = async (id) => {
    try {
      const imageToBeSaved = images.find((image) => image.id === id);
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);

      if (res.data?.id) {
        setImages((prev) =>
          prev.map((img) =>
            img.id === id
              ? { ...img, id: res.data.id, saved: true } // ✅ update id to Mongo ID
              : img
          )
        );
      }
      toast.success("💾 Image saved to your gallery", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const queryString = `/new-image?query=${searchTerm}`;

  /**
   * Handles the search form submission, fetches a new image based on the search term,
   * and adds it to the images state.
   * Handles errors by logging them to the console.
   *
   * @async
   * @function searchImageHandler
   * @param {React.FormEvent} e - The form submission event.
   * @returns {Promise<void>}
   */
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

  /**
   * Deletes an image from the images state by its ID.
   *
   * @function deleteImageHandler
   * @param {string|number} id - The ID of the image to be deleted.
   * @returns {void}
   */
  async function deleteImageHandler(id) {
    const image = images.find((img) => img.id === id);

    // If image isn't saved yet, just remove from frontend
    if (!image?.saved) {
      setImages((prev) => prev.filter((img) => img.id !== id));
      return;
    }

    // Otherwise delete from DB
    try {
      await axios.delete(`${API_URL}/images/${id}`);
      setImages((prev) => prev.filter((img) => img.id !== id));
      toast.success(`🗑️ Image removed from your gallery.`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  }

  return (
    <div className="App">
      <Header title="Images Gallery" />
      {loading ? (
        <Spinner />
      ) : (
        <>
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
                    <ImageCard
                      image={image}
                      onDelete={deleteImageHandler}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          ) : (
            <Welcome />
          )}
        </>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
