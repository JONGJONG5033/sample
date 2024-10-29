// script.js for sidebar menu
document.getElementById('toggleButton').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar.style.right === "-250px") {
      sidebar.style.right = "0";
    } else {
      sidebar.style.right = "-250px";
    }
  });
  
  document.getElementById('closeButton').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.right = "-250px";
  });


// script.js for add to cart
document.addEventListener("DOMContentLoaded", function() {
  const openRightbar = document.getElementById("openRightbar");
  const closeRightbar = document.getElementById("closeRightbar");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartItemsContainer = document.getElementById("cartItems");
  const totalProducts = document.getElementById("totalProducts");
  const totalPrice = document.getElementById("totalPrice");
  const removeAllButton = document.getElementById("removeAll");

  openRightbar.addEventListener("click", function(event) {
      event.preventDefault();
      rightbar.style.width = "250px";
  });

  closeRightbar.addEventListener("click", function() {
      rightbar.style.width = "0";
  });

  addToCartButtons.forEach(function(button) {
      button.addEventListener("click", function(event) {
          event.preventDefault();
          const card = button.closest(".card");
          const productName = card.querySelector(".product-name").textContent;
          const productPrice = parseFloat(card.querySelector(".product-price").textContent.replace(/[^0-9.]/g, ''));
          const cartItem = document.createElement("div");
          cartItem.classList.add("cart-item");
          cartItem.innerHTML = `
              <span>${productName}</span>
              <span>${productPrice.toFixed(2)} PHP</span>
              <button class="remove-from-cart">Remove</button>
          `;
          cartItemsContainer.appendChild(cartItem);

          // Add event listener to remove from cart button
          const removeFromCartButton = cartItem.querySelector(".remove-from-cart");
          removeFromCartButton.addEventListener("click", function() {
              cartItemsContainer.removeChild(cartItem);
              updateTotals();
          });

          updateTotals();
      });
  });

  // Add event listener for the Remove All button
  removeAllButton.addEventListener("click", function() {
      while (cartItemsContainer.firstChild) {
          cartItemsContainer.removeChild(cartItemsContainer.firstChild);
      }
      updateTotals();
  });

  function updateTotals() {
      const cartItems = document.querySelectorAll(".cart-item");
      let totalProductCount = cartItems.length;
      let totalCartPrice = 0;

      cartItems.forEach(function(item) {
          const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.replace(/[^0-9.]/g, ''));
          totalCartPrice += itemPrice;
      });

      totalProducts.textContent = totalProductCount;
      totalPrice.textContent = totalCartPrice.toFixed(2) + " PHP";
  }
});


  // script for add to favorites
document.addEventListener("DOMContentLoaded", function() {
  // Function to add item to favorites
  function addToFavorites(productImage, productName, productPrice) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites.push({ image: productImage, name: productName, price: productPrice });
      localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  // Function to open the Favorites Tab window
  function openFavoritesTab() {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const favoritesWindow = window.open('', 'Favorites Tab', 'width=600,height=400');
      favoritesWindow.document.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Favorites Tab</title>
              <style>
                  .favorite-item {
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      padding: 10px;
                      border: 1px solid #ccc;
                      margin: 10px 0;
                  }
                  .favorite-item img {
                      max-width: 50px;
                      margin-right: 10px;
                  }
                  .remove-from-favorites {
                    background-color: #fcfcfc0c;
                    color: black;
                      padding: 5px 10px;
                      border: none;
                      cursor: pointer;
                      border: solid black 2px;
                      border-radius: 3px;
                  }
                  .remove-from-favorites:hover {
                    background-color: black;
                    color: white;
                  }
              </style>
          </head>
          <body>
              <h1>Favorites</h1>
              <div id="favorites-container">
                  ${favorites.map(item => `
                      <div class="favorite-item">
                          <img src="${item.image}" alt="Product Image">
                          <div>${item.name}</div>
                          <div>${item.price}</div>
                          <button class="remove-from-favorites">Remove</button>
                      </div>
                  `).join('')}
              </div>
              <script>
                  document.addEventListener('click', function(event) {
                      if (event.target.classList.contains('remove-from-favorites')) {
                          const itemDiv = event.target.closest('.favorite-item');
                          const name = itemDiv.querySelector('div:nth-child(2)').textContent;
                          const price = itemDiv.querySelector('div:nth-child(3)').textContent;
                          itemDiv.remove();
                          removeFromFavoritesLocalStorage(name, price);
                      }
                  });

                  function removeFromFavoritesLocalStorage(productName, productPrice) {
                      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
                      favorites = favorites.filter(item => !(item.name === productName && item.price === productPrice));
                      localStorage.setItem("favorites", JSON.stringify(favorites));
                  }
              </script>
          </body>
          </html>
      `);
  }

  // Event delegation for dynamically added "Add to Favorites" buttons
  document.body.addEventListener("click", function(event) {
      if (event.target.classList.contains("add-to-favorites")) {
          const card = event.target.closest(".card");
          const productImage = card.querySelector("img").src;
          const productName = card.querySelector(".product-name").textContent;
          const productPrice = card.querySelector(".product-price").textContent;
          addToFavorites(productImage, productName, productPrice);
      }
  });

  // Open the Favorites Tab window when the "Favorites" sidebar link is clicked
  const favoritesLink = document.querySelector('.sidebar-item[href="Favorites Tab.html"]');
  favoritesLink.addEventListener('click', function(event) {
      event.preventDefault();
      openFavoritesTab();
  });
});
