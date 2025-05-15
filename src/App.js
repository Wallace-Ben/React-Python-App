import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import { useState } from "react";

function App() {
  const [searchTerm, updateSearchTerm] = useState("");

  function searchImageHandler(e) {
    e.preventDefault();
    console.log(searchTerm);
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
