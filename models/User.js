const { ObjectID } = require("bson");
const { Schema, model } = require("mongoose");
const { thoughtSchema } = require("./Thought");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  thoughts: [{ type: ObjectID, ref: "thought" }],
  friends: [{ type: ObjectID, ref: "user" }],
});

const User = model("user", userSchema);
module.exports = { User, userSchema };
