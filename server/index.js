const express = require("express");
const cors = require("cors");
const app = express();
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:1478@localhost:5432/cats_pic");

app.use(cors());
app.use(express.json());

app.listen(8000, () => {
  console.log("server running on port 8000");
});

app.get("/photos", (req, res) => {
  db.any("SELECT * FROM cats")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/setLike/:id", (req, res) => {
  db.query("UPDATE cats SET likes = $1, liked = $3 WHERE id = $2", [
    req.body.likes,
    req.params.id,
    req.body.liked,
  ])
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});


app.post("/setView/:id", (req, res) => {
  db.query("UPDATE cats SET views = $1 WHERE id = $2", [
    req.body.views,
    req.params.id,
  ])
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
    })
})

app.get("/photo/:id", (req, res) => {
  db.any("SELECT * FROM cats WHERE id = $1", req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
    });
})