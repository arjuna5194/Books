import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import BookCard from "../../components/BookCard";
import { pdfjs } from "react-pdf";
import { getBooks } from "../../apis/books";

const Home = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const getBooksData = async () => {
    const booksData = await getBooks(search);
    setBooks(booksData ? booksData : []);
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
      <div className="row row-cols-4 mx-3">
        {books.map((book) => (
          <BookCard bookDetail={book} key={book._id}></BookCard>
        ))}
      </div>
    </>
  );
};

export default Home;
