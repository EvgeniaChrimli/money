const arrow = document.querySelectorAll(".body_info-arrow");

arrow.forEach((item, index) => {
  item.addEventListener("click", () => {
    const answer = document.querySelectorAll(".answer");
    answer.forEach((item, answerIndex) => {
      if (index === answerIndex) {
        item.classList.toggle("active");
      }
    });
  });
});

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");

function toggleMenu() {
  menu.classList.toggle("active");
  overlay.classList.toggle("active");
  burger.classList.toggle("active");
}

burger.addEventListener("click", toggleMenu);

overlay.addEventListener("click", toggleMenu);

document.querySelectorAll(".menu li").forEach((link) => {
  link.addEventListener("click", toggleMenu);
});

const burgerFooter = document.querySelector(".burger-footer");
const menuFooter = document.querySelector(".menu-footer");

const toggleFooter = () => {
  menuFooter.classList.toggle("active");
};

document.querySelectorAll(".menu-footer li").forEach((link) => {
  link.addEventListener("click", toggleFooter);
});

burgerFooter.addEventListener("click", toggleFooter);
