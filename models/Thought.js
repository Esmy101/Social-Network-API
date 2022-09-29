const { Schema, model } = require("mongoose");
const User = require("./User");
const Reaction = require("./Reaction");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    min: 1,
    max: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    timestamps: true,
  },
  username: {
    type: User,
    required: true,
  },
  reactions: [Reaction],
});

const Thought = model("thought", thoughtSchema);
module.exports = Thought;
// SCHEMA SETTINGS
