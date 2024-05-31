import express, { json } from "express";
import Books from "../models/books.js";
import path from "path";
import { fileURLToPath } from "url";
import auth from "../middleware/auth.js";
import multer from "multer";
import fs from "fs";
import { ObjectId } from "mongodb";

const router = new express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
router.use(
  "/assets/images",
  express.static(path.join(__dirname, "../assets/images"))
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(
        __dirname,
        "../assets",
        file.fieldname === "img" ? "images" : "pdfs"
      )
    );
  },
  filename: (req, file, cb) => {
    const id = new ObjectId();
    cb(null, `${id}` + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post(
  "/book/add",
  auth,
  upload.fields([
    { name: "img", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  async (req, res) => {
    let book = new Books({
      name: req.body.name,
      description: req.body.description,
      author: req.body.author,
      category: req.body.category,
      img: req.files.img[0].filename,
      bookPath: req.files.pdf[0].filename,
    });
    try {
      if (req.user.isAdmin) {
        await book.save();
        res.status(201).send("Book added successfully");
      } else res.staus(401).send("Only admin can add Books.");
    } catch (e) {
      console.log(e);
      res.status(400).send(e.message);
    }
  }
);

router.patch("/book/edit/:id", auth, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      await Books.findByIdAndUpdate(req.params.id, req.body);
      res.send(`Updated Successfully`);
    } else {
      res.status(401).send("Only admin can update Books.");
      return; // Ensure to stop further code execution
    }
  } catch (e) {
    console.error(e); // Log the error for debugging purposes
    res.status(500).send("An error occurred while updating the book."); // Send an error response to the client
  }
});

router.get("/books/:id", auth, async (req, res) => {
  try {
    let book = await Books.findById(req.params.id);

    book = {
      _id: book._id,
      name: book.name,
      description: book.description,
      author: book.author,
      category: book.category,
      img: `/assets/images/${book.img}`,
    };
    res.send(book);
  } catch (e) {
    console.log(e);
  }
});

router.get("/books", auth, async (req, res) => {
  const search = req.query.search;
  const regex = new RegExp(search, "i");
  try {
    let books;
    if (!search) {
      books = await Books.find({});
    } else {
      books = await Books.find({ name: regex });
    }
    books = books.map((book) => ({
      _id: book._id,
      name: book.name,
      description: book.description,
      author: book.author,
      category: book.category,
      img: `/assets/images/${book.img}`,
    }));
    res.send(books);
  } catch (e) {
    console.log(e);
  }
});

router.get("/get-pdf", auth, async (req, res) => {
  const book = await Books.findById(req.query.id);
  const file = path.join(__dirname, "../assets/pdfs", `${book.bookPath}`); // Adjust the path to your PDF file

  res.download(file, `${book.name}.pdf`, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Error downloading file");
    }
  });
});

const deletefiles = async (id) => {
  const book = await Books.findById(id);
  fs.unlink(
    path.join(__dirname, "../assets/pdfs", `${book.bookPath}`),
    (err) => {
      if (err) {
        console.error(`Error deleting file `, err);
      }
    }
  );
  fs.unlink(path.join(__dirname, "../assets/images", `${book.img}`), (err) => {
    if (err) {
      console.error(`Error deleting file `, err);
    }
  });
};

router.delete("/book/delete/:id", auth, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      await deletefiles(req.params.id);
      await Books.findByIdAndDelete(req.params.id);
      res.send(`deleted Successfully`);
    } else {
      res.staus(401).send("Only admin can delete Books.");
    }
  } catch (e) {
    console.log(e);
  }
});

export default router;
