// server.js
const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const tenderRoutes = require("./routes/tenders");
const bodyParser = require("body-parser");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/tenders", tenderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
