const z = require("zod")

// Esquema para definir los request desde frontend
const createEmployeeSchema = z.object({
  firstName: z.string({
    required_error: "El primer nombre es requerido"
  }).max(25, {
    message: "El primer nombre no debe tener más de 25 caracteres"
  }).min(1, {
    message: "El nombre no debe quedar en blanco"
  }),

  lastName: z.string({
    required_error: "El segundo nombre es requerido"
  }).max(25, {
    message: "El segundo nombre no debe tener más de 25 caracteres"
  }).min(1, {
    message: "El nombre no debe quedar en blanco"
  }),

  age: z.number({
    required_error: "La edad es requerida",
    invalid_type_error: "Se esperaba un número entero positivo"
  }).int({
    message: "Debe ser un número entero"
  }).positive({
    message: "Debe ser un número entero positivo"
  }).min(18, {
    message: "Debe ser mayor de edad"
  }),

  salary: z.number({
    required_error: "El salario es requerido",
    invalid_type_error: "Se esperaba un número decimal positivo"
  }).step(0.01).positive({
    message: "Debe ser un número flotante positivo"
  })
});

module.exports = {
    createEmployeeSchema: createEmployeeSchema
}