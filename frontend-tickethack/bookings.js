function compareBookingToNow(dateBooking) {
  let dateActuelleMS = new Date(Date.now()).getTime();
  let dateBookingMS = dateBooking.getTime();
  let timeBetween = dateBookingMS - dateActuelleMS;
  let days = timeBetween / 86400000;
  let remainingTime = timeBetween % 86400000;
  if (dateActuelleMS > dateBookingMS) {
    return "Departed";
  } else {
    if (days < 1) {
      return `Departure in ${Math.floor(remainingTime / 3600000)} hours`;
    } else {
      return `Departure in ${Math.floor(days)} days and ${Math.floor(
        remainingTime / 3600000
      )} hours`;
    }
  }
}

fetch("http://localhost:3000/bookings")
  .then((response) => response.json())
  .then((data) => {
    if (data.result) {
      document.querySelector("#mybooking").innerHTML = "";
      document.querySelector("#mybooking").innerHTML += "<h3>My Bookings</h3>";
      for (booking of data.bookings) {
        let bookingDate = new Date(booking.date);
        document.querySelector("#mybooking").innerHTML += `
        <div class="booking">
                        <div class="departure">${booking.departure}</div>
                        >
                        <div class="arrival">${booking.arrival}</div>
                        <div class="day">${
                          bookingDate.toDateString() ===
                          new Date(Date.now()).toDateString()
                            ? "Today"
                            : bookingDate.toDateString()
                        }</div>
                        <div class="hour">${
                          bookingDate.getHours() < 10
                            ? "0" + bookingDate.getHours()
                            : bookingDate.getHours()
                        }:${
          bookingDate.getMinutes() < 10
            ? "0" + bookingDate.getMinutes()
            : bookingDate.getMinutes()
        }</div>
          <div class="prix">${booking.price}€</div>
          <div class="timeToDeparture">${compareBookingToNow(bookingDate)}</div>
                    </div>`;
      }
      document.querySelector("#mybooking").innerHTML +=
        "<p>______________________________________________<p>";
      document.querySelector("#mybooking").innerHTML +=
        "<h2>Enjoy your travels with Tickethack!</h2>";
    } else {
      document.querySelector("#mybooking").innerHTML = `<p>No booking yet.</p>
      <p>Why not plan a trip?</p>`;
    }
  });
