const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const socket = require("./socket")(io);
const port = process.env.PORT || 8080;
const cors = require("cors");

const helmet = require("helmet");

app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});

http.listen(port, () => console.log(`Listening on port ${port}`));
