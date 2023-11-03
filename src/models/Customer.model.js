const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    dni: {
        type: Number,
        required: true,
        unique: true
    },
    phone_number: {
        type: Number,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
        unique: true
    },
    loginStatus: {
        type: Boolean,
        required: true,
    }
});


CustomerSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

CustomerSchema.statics.comparePassword = async (password, passwordDb) => {
    return await bcrypt.compare(password, passwordDb)
}


const CustomerModel = mongoose.model('CustomerModel', CustomerSchema);

module.exports = CustomerModel;