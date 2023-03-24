const db = require("mongoose");

const eventSchema = new db.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

const eventModel = db.model("event", eventSchema);
module.exports = eventModel;
