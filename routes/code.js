const router = require("express").Router();
const { User } = require("../models/user");
const Code = require("../models/code")
const verify = require('./verifyToken')


router.post("/save",verify, async (req, res) => {
    console.log('Hello bro')
    await new Code({body: req.body.code, user_id: req.userid }).save();
    res.status(200).send({ message: "Code Saved!!" });
});


module.exports = router;