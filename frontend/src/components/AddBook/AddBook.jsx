import React, { useState } from "react";
import { addBook as addBookApi } from "../../apis/books";
import styles from "./style.module.css";

const AddBook = ({ getBooks }) => {
  const initialValues = {
    name: "",
    author: "",
    category: "",
    description: "",
  };
  const [bookDetails, setBookDetails] = useState(initialValues);
  const [img, setImage] = useState();
  const [pdf, setPdf] = useState();
  const [Errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const addBook = async () => {
    const errors = validate();
    if (Object.keys(errors).length) setErrors(errors);
    else {
      await addBookApi({ ...bookDetails, img, pdf });
      await getBooks();
      document.querySelector("#addBooksModal .btn-close").click();
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
    } else if (!img) {
      errors.image = "Image is required";
    } else if (!pdf) {
      errors.pdf = "Book is required!";
    }
    return errors;
  };

  return (
    <div
      className="modal fade"
      id="addBooksModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Add Books
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="my-2 row">
              <label className="col-3">Name:</label>
              <div className="col-8">
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

            <div className="my-2 row">
              <label className="col-3">Author:</label>
              <div className="col-8">
                <input
                  className={`${styles.input}`}
                  name="author"
                  value={bookDetails.author}
                  onChange={handleChange}
                  type="text"
                  placeholder="Author"
                />
                <span className={styles.errorTexts}>{Errors.author}</span>
              </div>
            </div>

            <div className="my-2 row">
              <label className="col-3">Description:</label>
              <div className="col-8">
                <input
                  className={`${styles.input}`}
                  name="description"
                  value={bookDetails.description}
                  onChange={handleChange}
                  type="text"
                  placeholder="Description"
                />
                <span className={styles.errorTexts}>{Errors.description}</span>
              </div>
            </div>

            <div className="my-2 row">
              <label className="col-3">Category:</label>
              <div className="col-8">
                <input
                  className={`${styles.input}`}
                  name="category"
                  value={bookDetails.category}
                  onChange={handleChange}
                  type="text"
                  placeholder="Category"
                />
                <span className={styles.errorTexts}>{Errors.category}</span>
              </div>
            </div>

            <div className="my-2 row">
              <label className="col-3">Image</label>
              <div className="col-8">
                <input
                  className={`${styles.input}`}
                  name="img"
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  accept="image/*"
                />
                <span className={styles.errorTexts}>{Errors.image}</span>
              </div>
            </div>

            <div className="my-2 row">
              <label className="col-3">Book</label>
              <div className="col-8">
                <input
                  className={`${styles.input}`}
                  name="pdf"
                  onChange={(e) => setPdf(e.target.files[0])}
                  type="file"
                  accept=".pdf"
                />
                <span className={styles.errorTexts}>{Errors.pdf}</span>
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
            <button type="button" className="btn btn-primary" onClick={addBook}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
