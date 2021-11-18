const express = require("express");
const path = require("path");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const socket = require("./socket")(io);
const port = process.env.PORT || 8080;

const helmet = require("helmet");

app.use(helmet());
app.use(express.static(path.join(__dirname, "../../client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

http.listen(port, () => console.log(`Listening on port ${port}`));
