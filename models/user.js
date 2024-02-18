import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    institute_name: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    board: {
      type: String,
      required: true,
    },
    facebook_link: {
      type: String,
    },
    user_logo_url: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    verified : {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
