const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Types.ObjectId, // Maybe?
    default: new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    max: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    timestamps: true,
  },
});

module.exports = { reactionSchema };
// SCHEMA SETTINGS
