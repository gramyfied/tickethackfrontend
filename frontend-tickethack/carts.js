async function addCartsToBookings(carts) {
  for (cart of document.querySelectorAll(".cart")) {
    let date = cart.querySelector(".date").textContent;
    let departure = cart.querySelector(".departure").textContent;
    let arrival = cart.querySelector(".arrival").textContent;
    let price = cart.querySelector(".prix").textContent;
    await fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: {
        "Accept-Content": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departure: departure,
        arrival: arrival,
        date: parseInt(date),
        price: parseInt(price),
      }),
    });
    await fetch(`http://localhost:3000/carts/`, {
      method: "DELETE",
      headers: {
        "Accept-Content": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departure: departure,
        arrival: arrival,
        date: parseInt(date),
        price: parseInt(price),
      }),
    });
    resfreshCarts();
  }
}

function refreshPurchaseButtonListener() {
  let purchase_button = document.querySelector("#purchase-button");
  purchase_button.addEventListener("click", (event) => {
    addCartsToBookings(document.querySelectorAll(".cart")).then(() => {
      window.location.assign("./bookings.html");
    });
  });
}

function resfreshCarts() {
  let total = 0;
  fetch("http://localhost:3000/carts")
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        document.querySelector(
          "#mycart"
        ).innerHTML = `<div id="carts"><h3>My Cart</h3>`;
        for (let cart of data.carts) {
          let cartDate = new Date(cart.date);
          document.querySelector("#mycart").innerHTML += `
                    <div class="cart">
                        <div class="departure">${cart.departure}</div>
                        >
                        <div class="arrival">${cart.arrival}</div>
                        <div class="date">${Date.parse(cartDate)}</div>
                        <div class="day">${
                          cartDate.toDateString() ===
                          new Date(Date.now()).toDateString()
                            ? "Today"
                            : cartDate.toDateString()
                        }</div>
                        <div class="hour">${
                          cartDate.getHours() < 10
                            ? "0" + cartDate.getHours()
                            : cartDate.getHours()
                        }:${
            cartDate.getMinutes() < 10
              ? "0" + cartDate.getMinutes()
              : cartDate.getMinutes()
          }</div>
          <div class="prix">${cart.price}€</div>
          <button class="delete-button" type="button">x</button>
                    </div>
                    `;
          total += cart.price;
        }
        document.querySelector("#mycart").innerHTML += `</div>`;
        document.querySelector("#mycart").innerHTML += `
                    <div id="total-carts">
                        <div id="total-price">Total: ${total}€</div>
                        <input id="purchase-button" type="button" value="Purchase"/>
                    </div>
                `;
        resfreshDeleteButtonListeners();
        refreshPurchaseButtonListener();
      } else {
        document.querySelector("#mycart").innerHTML = `
                <p>No tickets in your cart.</p>
                <p>Why not plan a trip?</p>`;
      }
    });
}

function resfreshDeleteButtonListeners() {
  let allDeleteButtons = document.querySelectorAll(".delete-button");
  for (let deleteButton of allDeleteButtons) {
    deleteButton.addEventListener("click", (event) => {
      console.log(deleteButton.parentNode);
      let deleteDeparture =
        deleteButton.parentNode.querySelector(".departure").textContent;
      let deleteArrival =
        deleteButton.parentNode.querySelector(".arrival").textContent;
      let deleteDate =
        deleteButton.parentNode.querySelector(".date").textContent;
      let deletePrice = deleteButton.parentNode
        .querySelector(".prix")
        .textContent.replace("€", "");
      fetch(`http://localhost:3000/carts/`, {
        method: "DELETE",
        headers: {
          "Accept-Content": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          departure: deleteDeparture,
          arrival: deleteArrival,
          date: parseInt(deleteDate),
          price: deletePrice,
        }),
      }).then(() => {
        resfreshCarts();
      });
    });
  }
}

resfreshCarts();
