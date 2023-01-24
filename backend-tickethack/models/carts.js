const  mongoose  = require("mongoose");

const cartsSchema = mongoose.Schema({

    departure: String,
    arrival: String,
    date: Date,
    price: Number


})

const Carts = mongoose.model('carts', cartsSchema);
module.exports = Carts
   