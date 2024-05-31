import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../../apis/books";
import { downloadBook } from "../../apis/books";

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});

  const getBook = async () => {
    const book = await getBookById(id);
    setBook(book);
  };
  useEffect(() => {
    getBook(id);
  }, []);

  const onClickDownload = () => {
    downloadBook(book.name, book._id);
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 mx-5">
      <div className="card" style={{ width: "90%" }}>
        <div className="d-flex justify-content-startr">
          <img
            src={`http://localhost:3001${book.img}`}
            alt={book.name}
            className="card-img-top m-3"
            style={{ height: "300px", width: "auto" }}
          />
        </div>
        <hr className="my-2" />
        <h3 className="card-title ms-3">{book.name}</h3>
        <hr className="my-2" />
        <div className="card-body">
          <p className="card-text">Description: {book.description}</p>
          <p className="card-text">Author: {book.author}</p>
          <p className="card-text">Category: {book.category}</p>
        </div>
        <hr className="mt-2 mb-0" />
        <button className="btn btn-primary m-2" onClick={onClickDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default Book;
