const express = require("express");
const events = require("../Models/events");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(fileUpload());

app.post("/v1/events", async (req, res) => {
  try {
    const { title, description, location, startTime, endTime } = req.body;
    const data = await events.create({
      title,
      description,
      location,
      startTime,
      endTime,
    });
    return res.status(201).json({
      data,
    });
  } catch (err) {
    return res.status(400).json({
      error: `${err.name} : ${err.message.split(":")[1]} is required`,
    });
  }
});

app.get("/v1/events", async (req, res) => {
  const data = await events.find();
  return res.status(200).json({
    data,
  });
});

app.get("/v1/events/:id", async (req, res) => {
  try {
    const data = await events.findOne({ _id: req.params.id });
    return res.status(200).json({
      data,
    });
  } catch (err) {
    return res.status(404).json({
      error: "There is no event with that id",
    });
  }
});

app.delete("/v1/events/:id", async (req, res) => {
  try {
    await events.deleteOne({ _id: req.params.id });
    return res.status(204).json({});
  } catch (err) {
    return res.status(204).json({});
  }
});

app.put("/v1/events/:id", async (req, res) => {
  try {
    const { title, description, location, startTime, endTime } = req.body;
    if (!title)
      return res.status(400).json({
        error: "Validation error : title is required",
      });
    if (!description)
      return res.status(400).json({
        error: "Validation error : description is required",
      });
    if (!location)
      return res.status(400).json({
        error: "Validation error : location is required",
      });
    if (!startTime)
      return res.status(400).json({
        error: "Validation error : start time is required",
      });
    if (!endTime)
      return res.status(400).json({
        error: "Validation error : end time is required",
      });
    await events.updateOne(
      { _id: req.params.id },
      {
        title,
        description,
        location,
        startTime,
        endTime,
      }
    );
    const data = await events.findOne({ _id: req.params.id });
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(404).json({
      error: "There is no event with that id",
    });
  }
});

module.exports = app;
