const { Schema, model } = require("mongoose");
const User = require("./User");
const { reactionSchema } = require("./Reaction");

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
  reactions: [reactionSchema],
});

const Thought = model("thought", thoughtSchema);
module.exports = { Thought, thoughtSchema };
// SCHEMA SETTINGS
