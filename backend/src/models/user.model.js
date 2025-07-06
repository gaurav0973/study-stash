import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
  {
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    university: { 
        type: String, 
        required: true 
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);


// hook
userSchema.pre("save", async function (next) {
  const user = this
  if (!user.isModified("password")) 
    return next();
  user.password = await bcrypt.hash(user.password, 10);
  next();
});


//check for password correction
userSchema.methods.isPasswordCorrect = async function (password) {
    const user = this
  return await bcrypt.compare(password, user.password);
};

// JWT Token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_TOKEN_SECRET,
    { expiresIn: process.env.JWT_TOKEN_EXPIRY }
  );
};


const User = mongoose.model("User", userSchema);

export default User;
