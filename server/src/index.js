const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const socket = require("./socket")(io);
const port = process.env.PORT || 5000;

const helmet = require("helmet");

app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello");
});

http.listen(port, () => console.log(`Listening on port ${port}`));
