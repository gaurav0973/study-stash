import User from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";

// register User
export const registerUser = asyncHandler(async (req, res) => {
  //1. get the user details
  const { username, email, password, university } = req.body;

  //2. validate the req => middleware => route me

  // 3. check if user already exists in the db
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  // 4. create the user
  const user = await User.create({
    username,
    email,
    password,
    university,
  });

  if (!user) {
    throw new ApiError(400, "User Registration Failed");
  }
  await user.save();

  //6. send Response
  return res.json(
    new ApiResponse(200, { user }, "User Registered Successfully")
  );
});

// user login => JWT authentication
export const login = asyncHandler(async (req, res) => {
  //1. get user data
  const { email, password } = req.body;

  // 2. validate data => middleware => express-validator

  // 3. user validation
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid Email or password");
  }

  // 4. User password validation
  const isCorrectPassword = await user.isPasswordCorrect(password);
  if (!isCorrectPassword) {
    throw new ApiError(400, "Invalid Email or Password");
  }

  //5. generate auth token
  const jwtToken = user.generateAuthToken();
  //6.send auth token to cookies
  const cookieOptions = {
    httpOnly: true,
  };
  res.cookie("jwtToken", jwtToken, cookieOptions);

  // 7. return success responce
  return res.json(
    new ApiResponse(200, { user, Token: jwtToken }, "Logged in successful")
  );
});

// get user profile controller
export const getProfile = asyncHandler(async (req, res) => {
  return res.json(
    new ApiResponse(
      200,
      {
        user: req.user,
      },
      "User profile fetched successfully"
    )
  );
});

// user logout
export const logout = asyncHandler(async (req, res) => {
  //1. Clear the JWT token cookie
  res.cookie("jwtToken", "", {
    httpOnly: true,
    expires: new Date(0), // This will make the cookie expire immediately
  });

  return res.json(new ApiResponse(200, {}, "Logged out successfully"));
});

// update user profile
export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { username, university } = req.body;

  // Validate data
  if (!username && !university) {
    throw new ApiError(400, "At least one field is required to update");
  }

  // Find and update the user
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        username: username || req.user.username,
        university: university || req.user.university,
      },
    },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res.json(
    new ApiResponse(
      200,
      { user: updatedUser },
      "User profile updated successfully"
    )
  );
});
