const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    open_hour: {
        type: Number,
        required: true
    },
    close_hour: {
        type: Number,
        required: true
    },
    rut: {
        type: Number,
        required: true,
        unique: true
    },  
    loginStatus: {
        type: Boolean,
        required: true,
    }
})

RestaurantSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

RestaurantSchema.statics.comparePassword = async (password, passwordDb) => {
    return await bcrypt.compare(password, passwordDb)
}

const RestaurantModel = mongoose.model('RestaurantModel', RestaurantSchema)

module.exports = RestaurantModel