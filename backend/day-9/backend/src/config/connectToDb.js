const mongoose = require("mongoose")

const connectToDb=()=>{

    mongoose.connect(process.env.DATABASE_URL + process.env.DATABASE_NAME).then(()=>{
        console.log("connected to database ")
    })
}

module.exports = connectToDb