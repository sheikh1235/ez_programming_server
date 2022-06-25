const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/signin", async (req, res) => {
  try {
    const { error } = validate2(req.body);

    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("user not available to be logged in");
      return res.status(401).send({ message: "Invalid Email or Password" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(validPassword);
    if (!validPassword) {
      console.log("wrong password");
      return res.status(401).send({ message: "Invalid Email or Password" });
    }
    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error " });
  }
});

const validate2 = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

router.post("/signup", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    console.log(req.body);

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });
    }

    const salt = await bcrypt.genSalt(Number(10));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
