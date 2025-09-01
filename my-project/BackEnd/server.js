// require("dotenv").config();
// require("./Database/connection");
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// // const router = require("./router/router");

// // const Contact = require("contact")
// // const cors = require("cors");

// app.use(express.json());
// // app.use(cors());
// // app.use("", router);
// // app.use('/api', router);
// // app.use('/api/contact', router);

// const port = 8005;

// app.listen(port, () => {
//   console.log(`server is connected to ${port}`);
// });








require("dotenv").config();
require("./Database/connection"); // Ensure this file sets up MongoDB connection
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const router = require("./router/router"); // Import your router file

// Middleware
app.use(cors());
app.use(express.json());

// Use the router for API routes (e.g., /api/todos)
app.use('/api', router); // Mount the router at /api prefix

// Start Server
const port = 8005;
app.listen(port, () => {
  console.log(`Server is connected to ${port}`);
});