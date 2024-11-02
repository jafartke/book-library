import "./App.css";
import { useState } from "react";
import Books from "./Components/Books"
import Search from "./Components/Search"

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false); 
  return (
    <div className="app">
      {showSearchPage ? (
        <Search showSearchPage={showSearchPage} setShowSearchpage={setShowSearchpage}/>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Books/>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
