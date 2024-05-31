import React from "react";
import { downloadBook } from "../apis/books";
import { useNavigate } from "react-router-dom";

const BookCard = (props) => {
  const book = props.bookDetail;

  const navigate = useNavigate();

  const onClickDownload = () => {
    downloadBook(book.name, book._id);
  };

  const onClickOpen = () => {
    navigate(`/book/${book._id}`);
  };
  return (
    <div className="col">
      <div className="card my-4" style={{ width: "18rem" }}>
        <img
          src={`http://localhost:3001${book.img}`}
          style={{ objectFit: "cover", height: "200px" }}
          className="card-img-top"
          alt={book.name}
        />
        <div className="card-body">
          <h5 className="card-title">{book.name}</h5>
          <p className="card-text">{book.description}</p>
          <button className="btn btn-success me-1" onClick={onClickOpen}>
            Open
          </button>
          <button className="btn btn-primary ms-1" onClick={onClickDownload}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
