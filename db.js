const mongoose = require("mongoose");

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		const mongo_user = "mongodb+srv://raheemm:raheem12@cluster0.duwqf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
		mongoose.connect(mongo_user,{useUnifiedTopology: true, useNewUrlParser: true }).then((res)=>{console.log("Connected to database successfully");});
		
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};
