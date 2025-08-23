const express = require("express");
const serverless = require("serverless-http");
const app = require("../../server"); // Adjust to your Express app file

app.use("/api", app); // Ensure routes start with /api

module.exports.handler = serverless(app);
