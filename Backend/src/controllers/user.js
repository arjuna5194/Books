import express from "express";
import User from "../models/user.js";
import { sendResetPasswordMail } from "../common/mailer.js";
import auth from "../middleware/auth.js";
import jwt from "jsonwebtoken";

const router = new express.Router();
router.post("/Signup", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send("User Already Exist");
    return;
  }
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    await user.save();
    res.status(201).send();
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

router.post("/Login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateToken();
    res.status(200).send({ token, user });
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

router.post("/forgotPassword", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send("Email does not exists!");
      return;
    }
    user.isResetPasswordRequest = true;
    user.save();
    await sendResetPasswordMail(user.email);
    res.send({ message: "Reset Link sent Successfully" });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.patch("/resetPassword", async (req, res) => {
  try {
    const token = req.body.token;
    const { email } = jwt.verify(token, process.env.KEY);
    const user = await User.findOne({ email });
    if (!user.isResetPasswordRequest) {
      res.status(410).send("Link is expired!");
      return;
    }
    user.password = req.body.password;
    user.isResetPasswordRequest = false;
    user.save();
    res.send({ message: "Password reset Successfully" });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/getProfile", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// router.patch("/user/update", async (req,res) => {
//     const updates = Object.keys(req.body)
// })

export default router;
