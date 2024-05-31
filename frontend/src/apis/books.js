import axios from "./axios.js";
import { toast } from "react-toastify";

export const addBook = async (payload) => {
  try {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });
    await axios.post("/book/add", formData);
    return true;
  } catch (err) {
    toast.error(`${err.response.data || err.message}`);
    return false;
  }
};

export const editBook = async (payload, id) => {
  try {
    await axios.patch(`/book/edit/${id}`, payload);
    return true;
  } catch (err) {
    toast.error(`${err.response.data || err.message}`);
    return false;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`/books/${id}`);
    return response.data;
  } catch (err) {
    toast.error(`${err.response.data || err.message}`);
    return false;
  }
};

export const getBooks = async (search) => {
  try {
    const response = await axios.get("/books", {
      params: {
        search: search,
      },
    });
    return response.data;
  } catch (err) {
    toast.error(`${err.response.data || err.message}`);
    return false;
  }
};

export const getBookPdf = async (bookId) => {
  try {
    const response = await axios.get("/get-pdf", {
      params: {
        id: bookId,
      },
      responseType: "blob",
    });
    return response;
  } catch (err) {
    toast.error(`${err.response.data || err.message}`);
  }
};

export const downloadBook = async (bookName, bookId) => {
  try {
    const response = await getBookPdf(bookId);
    console.log(response);

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${bookName}.pdf`; // Set the desired file name
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    toast.error(`${err.response.data || err.message}`);
  }
};

export const deleteBook = async (id) => {
  try {
    await axios.delete(`book/delete/${id}`);
    return true;
  } catch (err) {
    toast.error(`${err.response.data || err.message}`);
    return false;
  }
};
