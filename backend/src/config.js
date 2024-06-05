const PORT = process.env.PORT || 8000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/employees'
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4200'

module.exports = {
	PORT: PORT,
	MONGODB_URI: MONGODB_URI,
	FRONTEND_URL: FRONTEND_URL
}