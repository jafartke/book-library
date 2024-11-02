import { useState, useEffect } from "react";

function Search({showSearchPage, setShowSearchpage}){
    let categories = [{name:"currentlyReading", value:"Currently Reading" }, {name: "wantToRead", value: "Want to Read"}, {name: "read", value: "Read"}, {name:"none", value: "None"}]
    let token = localStorage.token;
    const api = "https://reactnd-books-api.udacity.com";
    if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);
    const [books, setBooks] = useState([]);
    const headers = {
      Accept: "application/json",
      Authorization: token,
    };
    function changeBookShelf(shelf, bookid){
        fetch(`${api}/books/${bookid}`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ shelf }),
        }).then((res) => res.json());
    
    }
    function searchBooks(query, maxResults = 10){
        query ? fetch(`${api}/search`, {
            method: "POST",
            headers: {
              ...headers,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query, maxResults }),
          })
            .then((res) => res.json())
            .then((data) => {
                setBooks(data.books)
            }) : setBooks([])
    }
    return (
    <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input onChange={(e)=>searchBooks(e.target.value )}
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
          <div>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.length > 0 && books.map((book, index) => (
                   
                    <li key={index}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                                "url("+book?.imageLinks?.smallThumbnail+")",
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                          <select value={book.shelf} onChange={(e)=>changeBookShelf(e.target.value, book.id )}>
                              <option value="none" disabled>
                                Move to...
                              </option>
                              {categories.map((cat, catIndex) => (
                              <option value={cat.name}>{cat.value}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book?.authors}</div>
                      </div>
                    </li>
                    ))}
                </ol>
                </div>
            </div>
          </div>
        </div>
    )
    }
export default Search;