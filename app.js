const express = require("express");
const app = express();
const path = require("path");
const request = require("request");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/search", (req, res) => {
  res.render("search");
});

app.get("/results", (req, res) => {
  let query = req.query.search;
  request(
    "https://api.themoviedb.org/3/search/movie?api_key=3969bcf7c2236c86cfecb40b3ff7cf6e&query=" +
      query,
    (error, response, body) => {
      if (error) console.log(error);
      let data = JSON.parse(body);
      res.render("movies", { data: data, searchQuery: query });
    }
  );
});

app.listen(3000, () => {
  console.log("Server stared on port 3000");
});
