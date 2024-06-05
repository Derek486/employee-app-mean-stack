const mongoose = require('mongoose')
const { MONGODB_URI } = require('./config.js')

const connectDB = async () => {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log("MongoDB is connected");
	} catch (error) {
		console.error(error);
	}
};

module.exports = connectDB