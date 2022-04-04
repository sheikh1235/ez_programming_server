const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    var token = req.query.token;
    if (!token){
        token = req.body.data.token
    }
    if (!token){
        token = req.body.token
    }
    if(!token) return res.status(401).send('Access Denied');
    try{
        console.log("token received")
        //it will return back the user name of logged in user
        const verified = jwt.verify(token, "HEllo");
        req.userid = verified._id;
        next()
    }catch(err){
        res.status(400).send('Invalid Token')
    }
}