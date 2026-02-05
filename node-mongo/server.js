const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());


require("./app/models/inventory.model.js");


require("dotenv").config();
const mongoose = require("mongoose");


mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


mongoose.connection
  .on("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.log("Connection error: " + err.message);
  });


require("./app/routes/inventory.router.js")(app);


const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
