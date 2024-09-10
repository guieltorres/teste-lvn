import mongoose from "mongoose";
import { UserStatus } from "../enums/userStatus";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: Object.values(UserStatus),
    default: UserStatus.ACTIVE,
  },
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);
