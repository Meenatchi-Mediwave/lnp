require("dotenv").config();
const express = require("express");

const {
  insertNovel,
  fetchAllNovels,
  getNovel,
  updateNovel,
  deleteNovel,
} = require("../cli/utils");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4567;
const APP_NAME = process.env.APP_NAME || "api";

app.get("/books", async (req, res) => {
  const books = await fetchAllNovels();
  return res.send(books.rows);
});

app.post("/books", async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      message: "Book must have a title",
    });
  }
  const newBook = await insertNovel(req.body.title);
  return res.send(newBook.rows[0]);
});

app.put("/books/:bookid", async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      message: "Book title not passed",
    });
  }
  const bookFound = await getNovel(req.params.bookid);
  if (!bookFound.rows.length) {
    return res.status(400).json({
      message: "Book not found",
    });
  }
  const updatedNovel = await updateNovel(req.params.bookid, req.body.title);
  return res.send(updatedNovel.rows[0]);
});
app.get("/books/:bookid", async (req, res) => {
  const book = await getNovel(req.params.bookid);
  if (!book.rows.length) {
    return res.status(400).json({
      message: "Book not found",
    });
  }
  return res.send(book.rows[0]);
});
app.delete("/books/:bookid", async (req, res) => {
  const bookFound = await getNovel(req.params.bookid);
  if (!bookFound.rows.length) {
    return res.status(400).json({
      message: "Book not found",
    });
  }
  const deleted = await deleteNovel(req.params.bookid);
  return res.send(deleted.rows[0]);
});

app.use((req, res) => {
  return res.status(400).send({
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server ${APP_NAME} running on ${PORT}`);
});
