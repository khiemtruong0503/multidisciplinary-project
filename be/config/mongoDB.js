const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

async function connect() { 
    try { 
        await mongoose.connect('mongodb+srv://khiemtruong0503:Sometimeswinmid123@multidisciplinaryprojec.ht8dkwf.mongodb.net/yolohome')
        console.log('Database successfully connected.')
    } catch (error) { 
        console.log('Failed to connect to database: ' + error)
    }
}

module.exports = { connect }