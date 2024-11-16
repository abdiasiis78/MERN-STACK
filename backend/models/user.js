import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    email: {
      type: String, // Use String, not "string"
      unique: true,
      required: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },

    userName: {
      type: String, // Use String, not "string"
      required: true,
      lowercase: true,
      unique: true,
    },

    password: {
      type: String, // Use String, not "string"
      required: true,
      select: false, // Hide the password from the output
      validate: [
        {
          validator: (value) => validator.isStrongPassword(value),
          message:
            "Password must be strong: include uppercase, lowercase, numbers, and symbols.",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Add method for password comparison
userSchema.methods.comparePasswords = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

// Create and export the model
const User = mongoose.model("User", userSchema);
export default User;
