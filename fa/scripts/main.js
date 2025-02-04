const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeIcon = document.getElementById("theme-icon");
const themeMenu = document.getElementById("theme-menu");
const themeButtons = document.querySelectorAll(".js-themepicker-themeselect");
const root = document.documentElement;

const themeIcons = {
  light: "../assets/theme-icon-light.svg",
  dark: "../assets/theme-icon-dark.svg",
  persian: "../assets/theme-icon-persian.svg",
};

const savedTheme = localStorage.getItem("theme") || "automatic";
setTheme(savedTheme);

themeToggleBtn.addEventListener("click", () => {
  themeMenu.classList.toggle("show");
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(button.dataset.theme);
  });
});

function setTheme(theme) {
  localStorage.setItem("theme", theme);

  if (theme === "automatic") {
    delete root.dataset.theme;
    updateThemeIcon(getSystemTheme());
  } else {
    root.dataset.theme = theme;
    updateThemeIcon(theme);
  }

  themeButtons.forEach((btn) => btn.classList.remove("active"));

  const activeButton = document.querySelector(`.js-themepicker-themeselect[data-theme="${theme}"]`);
  if (activeButton) {
    activeButton.classList.add("active");
  }

  themeMenu.classList.remove("show");
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeIcon(theme) {
  themeIcon.src = themeIcons[theme] || themeIcons["light"];
}

const titleElement = document.querySelector("#animated-title");
const text = titleElement.dataset.text;

let index = 0;

titleElement.textContent = "";

setTimeout(() => {
  typeEffect();
}, 750);

function typeEffect() {
  if (index < text.length) {
    titleElement.textContent += text[index];
    index++;
    setTimeout(typeEffect, 200);
  }
}
