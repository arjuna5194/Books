import React, { useEffect, useState } from "react";
import { editBook as editBookApi } from "../../apis/books";
import styles from "./style.module.css";

const EditBook = ({ getBooks, book }) => {
  const initialValues = {
    name: "",
    author: "",
    category: "",
    description: "",
  };
  const [bookDetails, setBookDetails] = useState(initialValues);
  const [Errors, setErrors] = useState({});

  useEffect(() => {
    setBookDetails({
      name: book.name ? book.name : "",
      author: book.author ? book.author : "",
      category: book.category ? book.category : "",
      description: book.description ? book.description : "",
    });
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const editBook = async () => {
    const errors = validate();
    if (Object.keys(errors).length) setErrors(errors);
    else {
      await editBookApi({ ...bookDetails }, book._id);
      await getBooks();
      document.querySelector("#editBookModal .btn-close").click();
    }
  };

  const validate = () => {
    const errors = {};
    if (!bookDetails.name) {
      errors.name = "Name is required!";
    } else if (!bookDetails.author) {
      errors.author = "Author is required!";
    } else if (!bookDetails.description) {
      errors.description = "Description is required!";
    } else if (!bookDetails.category) {
      errors.category = "Category is required!";
    }
    return errors;
  };

  return (
    <div
      className="modal fade"
      id="editBookModal"
      tabIndex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editModalLabel">
              Edit Book
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="my-1 row">
              <label className="col-3">Name:</label>
              <div className="col-6">
                <input
                  className={`${styles.input}`}
                  name="name"
                  value={bookDetails.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Name"
                />
                <div className={styles.errorTexts}>{Errors.name}</div>
              </div>
            </div>

            <div className="my-1 row">
              <label className="col-3">Author:</label>
              <div className="col-6">
                <input
                  className={`${styles.input}`}
                  name="author"
                  value={bookDetails.author}
                  onChange={handleChange}
                  type="text"
                  placeholder="Author"
                />
                <div className={styles.errorTexts}>{Errors.author}</div>
              </div>
            </div>

            <div className="my-1 row">
              <label className="col-3">Description:</label>
              <div className="col-6">
                <input
                  className={`${styles.input}`}
                  name="description"
                  value={bookDetails.description}
                  onChange={handleChange}
                  type="text"
                  placeholder="Description"
                />
                <div className={styles.errorTexts}>{Errors.description}</div>
              </div>
            </div>

            <div className="my-1 row">
              <label className="col-3">Category:</label>
              <div className="col-6">
                <input
                  className={`${styles.input}`}
                  name="category"
                  value={bookDetails.category}
                  onChange={handleChange}
                  type="text"
                  placeholder="Category"
                />
                <div className={styles.errorTexts}>{Errors.category}</div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={editBook}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
