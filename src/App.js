import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import { useState } from "react";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
const UNSPLASH_BASE_URL = `https://api.unsplash.com/photos/random/`;

function App() {
  const [searchTerm, updateSearchTerm] = useState("");
  const queryString = `?query=${searchTerm}&client_id=${UNSPLASH_KEY}`;

  async function searchImageHandler(e) {
    e.preventDefault();
    console.log(searchTerm);

    try {
      const response = await fetch(`${UNSPLASH_BASE_URL}${queryString}`);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <Header title="Images Gallery" />
      <Search
        onSearch={searchImageHandler}
        searchTerm={searchTerm}
        updateSearchTerm={updateSearchTerm}
      />
    </div>
  );
}

export default App;
