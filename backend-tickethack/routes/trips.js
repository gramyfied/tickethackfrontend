var express = require("express");
var router = express.Router();
// var Trip = require('../models/trips');
let trips = [
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
  if (trips != []) {
    res.json({ result: true, trips: trips });
  } else {
    res.json({ result: false, error: "No trip found" });
  }
});

router.get("/:departure/:arrival/:date", (req, res) => {
  let searchedDate = new Date(req.params.date);
  let returnTrips = trips.filter(
    (trip) =>
      new Date(trip.date.$date).toDateString() ===
        searchedDate.toDateString() &&
      trip.arrival === req.params.arrival &&
      trip.departure === req.params.departure
  );
  if (returnTrips != []) {
    res.json({ result: true, trips: returnTrips });
  } else {
    res.json({ result: false, error: "No trip found" });
  }
});

module.exports = router;
