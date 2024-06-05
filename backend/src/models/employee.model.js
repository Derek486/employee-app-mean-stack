const mongoose = require('mongoose')

// Esquemas para definir modelo de datos en mongodb
const employeeSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  salary: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  imageUrl: {
    type: String,
    default: 'default-profile.png'
  }
}, {
  timestamps: true,
})

employeeSchema.set('toJSON', {
  getters: true,
  transform: (doc, ret) => {
    ret.salary = parseFloat(ret.salary.toString());
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Employee", employeeSchema)