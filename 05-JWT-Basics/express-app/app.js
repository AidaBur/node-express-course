require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

app.use(express.static("./public"));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());

app.use("/api/v1", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
