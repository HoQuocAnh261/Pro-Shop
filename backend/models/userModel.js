import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamp: true }
);

userSchema.pre("save", async function (next) {
  const rounds = 10; //What you want number for round password
  const hash = await bcrypt.hash(this.password, rounds);
  this.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
