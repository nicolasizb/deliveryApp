const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const DeliverySchema = new mongoose.Schema({
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
    phone_number: {
        type: Number,
        required: true,
        unique: true
    },
    dni: {
        type: Number,
        required: true,
        unique: true
    },  
    loginStatus: {
        type: Boolean,
        required: true,
    }
})

DeliverySchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

DeliverySchema.statics.comparePassword = async (password, passwordDb) => {
    return await bcrypt.compare(password, passwordDb)
}


const DeliveryModel = mongoose.model('DeliveryModel', DeliverySchema)

module.exports = DeliveryModel