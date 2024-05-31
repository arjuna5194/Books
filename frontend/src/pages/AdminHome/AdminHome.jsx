import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { pdfjs } from "react-pdf";
import { getBooks } from "../../apis/books";
import BookRow from "../../components/BookRow";
import AddBook from "../../components/AddBook/AddBook";
import EditBook from "../../components/EditBook/EditBook";

const AdminHome = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState({});
  const getBooksData = async () => {
    const booksData = await getBooks(search);
    setBooks(booksData);
  };
  useEffect(() => {
    getBooksData();
  }, [search]);

  const searchBooks = (search) => {
    setSearch(search);
  };

  return (
    <>
      <Header searchBooks={searchBooks}></Header>

      <div className="container-fluid mt-2" style={{ width: "90%" }}>
        <div className="text-end me-3 my-3">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-toggle="modal"
            data-bs-target="#addBooksModal"
          >
            Add Book
          </button>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <BookRow
                bookDetail={book}
                key={book._id}
                getBooks={getBooksData}
                setSelectedBook={setSelectedBook}
              ></BookRow>
            ))}
          </tbody>
        </table>
        <EditBook book={selectedBook} getBooks={getBooksData}></EditBook>
      </div>

      <AddBook getBooks={getBooksData}></AddBook>
    </>
  );
};

export default AdminHome;
