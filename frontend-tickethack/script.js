function populateTripsResults(data) {
  document.querySelector("#results-container").innerHTML = "";
  console.log(data);
  if (data.result) {
    let trips = data.trips;
    for (let trip of trips) {
      let tripDate = new Date(trip.date);
      document.querySelector("#results-container").innerHTML += `
                <div class="trip">
                    <div class="depart">${
                      trip.departure
                    }</div> > <div class="arrivee">${trip.arrival}</div>
      <div class="date">${Date.parse(tripDate)}</div>
                    <div class="heure">${
                      tripDate.getHours() < 10
                        ? "0" + tripDate.getHours()
                        : tripDate.getHours()
                    }:${
        tripDate.getMinutes() < 10
          ? "0" + tripDate.getMinutes()
          : tripDate.getMinutes()
      }</div>
          <div class="prix">${trip.price}</div> €
          <input class="book-button" type="button" value="Book" />
                `;
    }
  } else {
    document.querySelector("#results-container").innerHTML += `
            <img id="img-not-found" src="./images/notfound.png"/>
            <p>___________________________</p>
            <p>No trip found.</p>
        `;
  }
}

function resfreshListenersBookButtons() {
  let allBookButtons = document.querySelectorAll(".book-button");
  for (let bookButton of allBookButtons) {
    bookButton.addEventListener("click", (event) => {
      let date = bookButton.parentNode.querySelector(".date").textContent;

      let departure =
        bookButton.parentNode.querySelector(".depart").textContent;
      let arrival = bookButton.parentNode.querySelector(".arrivee").textContent;
      let price = bookButton.parentNode.querySelector(".prix").textContent;
      fetch("http://localhost:3000/carts", {
        method: "POST",
        headers: {
          "Accept-Content": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          departure: departure,
          arrival: arrival,
          date: parseInt(date),
          price: price,
        }),
      }).then(() => {
        window.location.assign("./carts.html");
      });
    });
  }
}

document.querySelector("#search-button").addEventListener("click", (event) => {
  console.log("click");
  let searchedDeparture = document.querySelector("#search-departure").value;
  let searchedArrival = document.querySelector("#search-arrival").value;
  let searchedDate = document.querySelector("#search-date").value;
  if (
    searchedDeparture === "" ||
    searchedArrival === "" ||
    searchedDate === ""
  ) {
    console.log("Champs manquants"); /*
    document.querySelector(
      "#search-container"
    ).innerHTML += `<h6>Merci de remplir tous les champs</h6>`;*/
  } else {
    document.querySelector("#results-container").innerHTML =
      "<p>Loading...</p>";
    fetch(
      `http://localhost:3000/trips/${searchedDeparture}/${searchedArrival}/${searchedDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        populateTripsResults(data);
        resfreshListenersBookButtons();
      });
  }
});
