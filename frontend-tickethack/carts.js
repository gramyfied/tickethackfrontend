function resfreshCarts() {
  let total = 0;
  document.querySelector(
    "#mycart"
  ).innerHTML = `<div id="carts"><h3>My Cart</h3>`;
  fetch("http://localhost:3000/carts")
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        for (let cart of data.carts) {
          let cartDate = new Date(cart.date);
          document.querySelector("#mycart").innerHTML += `
                    <div class="cart">
                        <div class="departure">${cart.departure}</div>
                        >
                        <div class="arrival">${cart.arrival}</div>
                        <div class="date">${
                          cartDate.toDateString() ===
                          new Date(Date.now).toDateString()
                            ? ""
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
          <div class="prix">${cart.price}</div> €
          <button type="button">x</button>
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
      } else {
        document.querySelector("#mycart").innerHTML = `
                <p>No tickets in your cart.</p>
                <p>Why not plan a trip?</p>`;
      }
    });
}

resfreshCarts();
