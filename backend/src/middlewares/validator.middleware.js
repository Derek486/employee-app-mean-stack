// Middleware que ejecuta los esquemas de request
const validateMiddleware = (schema) => (req, res, next) => {
	try {
		const form = {
			...req.body
		}
		if (form.age) form.age = parseInt(form.age);
		if (form.salary) form.salary = parseFloat(form.salary);
		schema.parse(form);
		next();
	} catch (error) {
		return res
			.status(400)
			.json({
				errors: error.errors.map((error) => (
					{
						[error.path]: error.message
					}
				))
			});
	}
};

module.exports = validateMiddleware