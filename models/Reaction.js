const { Schema, model } = require("mongoose");
const User = require("./User");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId, // Maybe?
    default: ObjectId,
  },
  reactionBody: {
    type: String,
    required: true,
    max: 280,
  },
  username: {
    type: User,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    timestamps: true,
  },
});

const Reaction = model("reaction", reactionSchema);
module.exports = Reaction;
// SCHEMA SETTINGS
