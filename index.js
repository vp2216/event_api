const express = require("express");
const eventRoute = require("./Routes/events");
const db = require("mongoose");

const app = express();

app.use(express.json());
app.use("/", eventRoute);

db.connect("mongodb://localhost:27017/events");
app.listen(8080,()=>console.log("Connected to server"))