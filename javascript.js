const hamburguer = document.getElementById("hamburguer");
const navbarMenu = document.getElementById("navbarmenu");
hamburguer.addEventListener("click", () => {
  navbarMenu.classList.toggle("active");
});

/* slider */
const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

/* API */

const articleDiv = document.getElementById("articlewrapper");

function updateArticle() {
  fetch(
    "https://newsapi.org/v2/top-headlines?country=pt&apiKey=62d77a21651a4a3291fa03ae11f3e03f"
  )
    .then((response) => response.json())

    .then((data) => {
      console.log(data);
      const articles = data.articles;
      const randomIndex = Math.floor(Math.random() * articles.length);
      const randomArticle = articles[randomIndex];
      const articleContent = `
        <h2 class="api__tittle">${randomArticle.title}</h2>
        <p class="api__text">${randomArticle.description}</p>
        <p class="api__author">-${randomArticle.author}</p>
      `;
      articleDiv.innerHTML = articleContent;
    });
}

updateArticle();

setInterval(updateArticle, 15000);

/* readmore */
const more = document.getElementById("readmore");
const text = document.getElementById("readless");
more.addEventListener("click", () => {
  text.classList.toggle("active");
});
