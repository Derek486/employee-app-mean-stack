const fs = require('fs');
const path = require('path');
const Employee = require('../models/employee.model')
const uuid = require('uuid')

/***
 * Controladores para manejo de registro de empleados
 * 
 * saveEmployee:    Guardar empleado 
 * deleteEmployee:  Eliminar empleado en base a un ID
 * listEmployee:    Listar todos los empleados
 * showEmployee:    Obtener data de un empleado en base a un ID
 * EditEmployee:    Editar datos de un empleado en base a su ID
 */

const saveEmployee = async (req, res) => {
	try {
		const { firstName, lastName, age, salary } = req.body;
		let imageName = null
		if (req.file) {
			imageName = uuid.v4() + '.png'
			const imagePath = path.join(__dirname, '../..', 'public', 'employees', imageName);
			fs.writeFile(imagePath, req.file.buffer, (err) => {
				if (err) {
					throw err;
				}
			});
		}
		const newEmployee = new Employee({
			firstName,
			lastName,
			age,
			salary,
			imageUrl: imageName || 'default-profile.png'
		});
		await newEmployee.save();
		return res.json(newEmployee);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const deleteEmployee = async (req, res) => {
	try {
		await Employee.deleteOne({
			_id: req.employee._id
		})
		return res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const listEmployee = async (req, res) => {
	try {
		const filters = ['firstName', 'lastName'].reduce((acc, field) => {
			if (req.query[field]) {
				acc.push({ [field]: { $regex: req.query[field], $options: 'i' } });
			}
			return acc;
		}, []);
		const employees = await Employee.find(filters.length > 0 ? { $or: filters } : {});
		return res.json(employees);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const showEmployee = async (req, res) => {
	try {
		return res.json(req.employee)
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const editEmployee = async (req, res) => {
	try {
		const { firstName, lastName, age, salary } = req.body;
		let imageName = req.employee.imageUrl
		if (req.file) {
			imageName = uuid.v4() + '.png'
			const imagePath = path.join(__dirname, '../..', 'public', 'employees', imageName);
			if (req.employee.imageUrl !== 'default-profile.png') {
				const prevImagePath = path.join(__dirname, '../..', 'public', 'employees', req.employee.imageUrl);
				fs.unlink(prevImagePath, (err) => {
					if (err) {
						throw err;
					}
				});
			}
			fs.writeFile(imagePath, req.file.buffer, (err) => {
				if (err) {
					throw err;
				}
			});
		}
		await Employee.updateOne({
			_id: req.employee._id
		}, {
			firstName,
			lastName,
			age,
			salary,
			imageUrl: imageName || 'default-profile.png'
		});
		return res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

module.exports = {
	saveEmployee,
	deleteEmployee,
	editEmployee,
	showEmployee,
	listEmployee,
}