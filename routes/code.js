const router = require("express").Router();
const { User } = require("../models/user");
const Code = require("../models/code")
const verify = require('./verifyToken')


router.post("/save", async (req, res) => {
    await new Code({ id: req.body.id, body: req.body.code, user_id: req.userid }).save();
    res.status(200).send({ message: "Code Saved!!" });
});

router.get("/get:id", async (req, res) => {

    console.log(req.params.id)
    const code = await Code.findOne({id: req.params.id})
    if (code){
        console.log('Found')
        res.status(200).send({ code_name: code.name , code_body: code.body});
    }
    else{
        console.log('Not found')
        res.status(405).send({ message: 'Invalid Code Id'});
    }
});


module.exports = router;