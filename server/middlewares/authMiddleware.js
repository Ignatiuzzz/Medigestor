import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
// speaker access
export const isSpeaker = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 2) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in speaker middleware",
    });
  }
};
// Middleware to check if user is either an admin or a speaker
export const isAdminOrSpeaker = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role === 1 || user.role === 2) { 
      next();
    } else {
      return res.status(403).send({ message: 'Access Denied' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server Error' });
  }
};
