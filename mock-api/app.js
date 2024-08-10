const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// User Routes
app.use("/api/user", require("./routes/userRoutes"));

// Project Routes

// Service Routes

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT} in localhost`);
});
