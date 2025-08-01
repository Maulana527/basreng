// toggle class active untuk hamburger
const navbarNav = document.querySelector(".navbar-nav");
//ketika hamburger-menu di click
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

//toggle class active untuk hambuger menu


//toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

//klik di luar elemen
const hamburger = document.querySelector("#hamburger-menu");

const shoppingC = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  
  if (!shoppingC.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// modal box
const modal = document.querySelector("#item-detail-modal");
const itemDetailButton = document.querySelectorAll(".item-detail-button");

itemDetailButton.forEach((btn) => {
  btn.onclick = (e) => {
    modal.style.display = "flex";
    e.preventDefault();
  };
});
//kclik tombol close
document.querySelector(".modal .close-icon").onclick = (e) => {
  modal.style.display = "none";
  e.preventDefault();
};
