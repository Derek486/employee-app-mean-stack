const app = require('./app');
const connectDB = require('./db');

async function main() {
	try {
		await connectDB();
		app.listen(app.get('PORT'), () => {
			console.log(`Server runing on http://localhost:${app.get('PORT')}`);
		})
	} catch (error) {
		console.error(error);
	}
}

main();