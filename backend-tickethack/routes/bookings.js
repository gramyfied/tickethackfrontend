var express = require("express");
var router = express.Router();
var Booking = require("../models/bookings");
let bookings = [
  {
    departure: "Lyon",
    arrival: "Bruxelles",
    date: { $date: "2023-01-24T09:14:56.312Z" },
    price: 63,
  },
  {
    departure: "Lyon",
    arrival: "Paris",
    date: { $date: "2023-01-24T09:25:02.368Z" },
    price: 74,
  },
  {
    departure: "Marseille",
    arrival: "Bruxelles",
    date: { $date: "2023-01-24T09:31:48.441Z" },
    price: 31,
  },
  {
    departure: "Lyon",
    arrival: "Paris",
    date: { $date: "2023-01-24T10:00:28.123Z" },
    price: 85,
  },
  {
    departure: "Marseille",
    arrival: "Lyon",
    date: { $date: "2023-01-24T10:01:41.921Z" },
    price: 142,
  },
  {
    departure: "Bruxelles",
    arrival: "Lyon",
    date: { $date: "2023-01-24T10:19:15.205Z" },
    price: 138,
  },
  {
    departure: "Paris",
    arrival: "Lyon",
    date: { $date: "2023-01-24T10:41:12.180Z" },
    price: 128,
  },
  {
    departure: "Paris",
    arrival: "Lyon",
    date: { $date: "2023-01-24T10:45:25.483Z" },
    price: 94,
  },
  {
    departure: "Bruxelles",
    arrival: "Marseille",
    date: { $date: "2023-01-24T10:48:14.365Z" },
    price: 42,
  },
  {
    departure: "Bruxelles",
    arrival: "Paris",
    date: { $date: "2023-01-24T11:22:03.029Z" },
    price: 132,
  },
  {
    departure: "Paris",
    arrival: "Lyon",
    date: { $date: "2023-01-24T11:24:33.041Z" },
    price: 46,
  },
];

router.get("/", (req, res) => {
  Booking.find().then((bookings) => {
    if (bookings.length != 0) {
      res.json({ result: true, bookings: bookings });
    } else {
      res.json({ result: false, error: "No booking found" });
    }
  });
});

router.post("/", (req, res) => {
  let newBooking = new Booking({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: new Date(req.body.date),
    price: req.body.price,
  });
  newBooking.save().then(() => {
    res.json({ result: true, newBooking: newBooking });
  });
});

module.exports = router;
