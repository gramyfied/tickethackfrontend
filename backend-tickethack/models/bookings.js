const  mongoose  = require("mongoose");

const bookingsSchema = mongoose.Schema({

    departure: String,
    arrival: String,
    date: Date,
    price: Number


})

const Bookings = mongoose.model('bookings', bookingsSchema);
module.exports = Bookings

