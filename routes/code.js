const router = require("express").Router();
const { User } = require("../models/user");
const Code = require("../models/code")
const verify = require('./verifyToken')


router.post("/save",verify, async (req, res) => {
    Code.findOne({id: req.body.data.codeId})
    .then(async (code)=>{
        if(!code){
            await new Code({ id: req.body.data.codeId, name: req.body.data.codeName, body: req.body.data.codeBody, user_id: req.userid })
            .save();
            return res.status(200).send("Code updated")
        }
        else{
            code.body = req.body.data.codeBody;
            code.save();
            return res.status(200).send("New code updated")
        }
    })
});

router.get("/get:id",verify, async (req, res) => {

    const code = await Code.findOne({id: req.params.id})
    if (code){
        res.status(200).send({ id: code.id , name: code.name , body: code.body, user_id: req.userid});
    }
    else{
        res.status(405).send({ message: 'Invalid Code Id'});
    }
});

router.get("/myallcodes", verify, async (req, res) => {
    console.log('GOttt')
    var codes = await Code.find({user_id: req.userid});
    res.json(codes);


});


module.exports = router;