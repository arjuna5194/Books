import React from "react";
import { deleteBook as deleteBookApi } from "../apis/books";

const BookRow = ({ bookDetail, getBooks, setSelectedBook }) => {
  const deleteBook = async () => {
    await deleteBookApi(bookDetail._id);
    await getBooks();
  };

  return (
    <>
      <tr>
        <td>
          <img
            src={`http://localhost:3001${bookDetail.img}`}
            alt={bookDetail.name}
            style={{ width: "100px", height: "100px" }}
          ></img>
          <span className="ms-3">{bookDetail.name}</span>
        </td>
        <td>{bookDetail.author}</td>
        <td>{bookDetail.description}</td>
        <td>{bookDetail.category}</td>
        <td>
          <button
            className="btn btn-primary me-1"
            data-bs-toggle="modal"
            data-bs-target="#editBookModal"
            onClick={() => {
              setSelectedBook(bookDetail);
            }}
          >
            Edit
          </button>
          <button className="btn btn-danger ms-1" onClick={deleteBook}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default BookRow;
