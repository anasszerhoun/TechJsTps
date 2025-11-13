const express = require("express");
const main = require("./db");
const users = require("./user");
const passport = require("./passport");
const session = require("express-session");

var booksListe = [
  {
    id: 1,
    nom: "Book 1",
  },
  {
    id: 2,
    nom: "Book 2",
  },
];

const app = express();

app.set("view engine", "pug");

app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

main();

app.listen(8080, () => {
  console.log("Server Running On https://localhost:8080");
});

app.use(
  session({
    secret: "ABCDEFGHGFEDCBA",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/books", (req, res) => {
  if (!req.session.username) {
    return res.redirect("/login");
  }
  res.render("books", { booksListe });
});

app.post("/addBook", (req, res) => {
  if (!req.session.username) {
    return res.redirect("/login");
  }
  const book = req.body;
  booksListe.push({
    id: Number(book.id),
    nom: book.nom,
  });
  res.redirect("/books");
});

app.use(express.json());
app.use("/users", users.router);
app.use("/passport", passport);
