import { useState, useEffect } from "react";
function Books (){
    let categories = [{name:"currentlyReading", value:"Currently Reading" }, {name: "wantToRead", value: "Want to Read"}, {name: "read", value: "Read"}, {name:"none", value: "None"}]
    let token = localStorage.token;
    const api = "https://reactnd-books-api.udacity.com";
    if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);
  
    const headers = {
      Accept: "application/json",
      Authorization: token,
    };
    const [books, setBooks] = useState([]);
    const [status, setStatus] = useState([]);
    useEffect(() => {
        getAllBooks()
    }, []);
    
    function changeBookShelf(shelf, bookid){
        fetch(`${api}/books/${bookid}`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ shelf }),
        }).then((res) => res.json().then(getAllBooks()));
    
    }
    function getAllBooks(){
        fetch(`${api}/books`, { headers })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBooks(data.books);
      });
    }
    return(
        <div>
        {books.length > 0 ? (
         <div className="bookshelf">
         {categories.map((category, cindex) => (
            <div>
            <h2 className="bookshelf-title">{category.value}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book, index) => (
                    book.shelf == category.name ?
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                                "url("+book.imageLinks.smallThumbnail+")",
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
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li> : ""
                    ))}
                </ol>
                </div>
            </div>
            ))}
        </div>
        ) : (
            <p>No books available</p>
        )}
    </div>
    )
}
export default Books;