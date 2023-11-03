const mongoose = require('mongoose')

async function connection() {
    await mongoose
        .connect('mongodb+srv://RappiAdmin:1234@rappiadmin.wuivng7.mongodb.net/?retryWrites=true&w=majority')
        .catch(err => console.log(err))
}

module.exports = { connection }