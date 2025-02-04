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

  updateHoverColors(theme);
  themeMenu.classList.remove("show");
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeIcon(theme) {
  themeIcon.src = themeIcons[theme] || themeIcons["light"];
}

function updateHoverColors(theme) {
  let bgColor, textColor;

  switch (theme) {
    case "light":
      bgColor = "var(--background-primary-light)";
      textColor = "var(--text-light)";
      break;
    case "dark":
      bgColor = "var(--background-primary-dark)";
      textColor = "var(--text-dark)";
      break;
    case "persian":
      bgColor = "var(--background-primary-persian)";
      textColor = "var(--text-persian)";
      break;
    default:
      bgColor = "light-dark(var(--background-primary-light), var(--background-primary-dark))";
      textColor = "light-dark(var(--text-light), var(--text-dark))";
  }

  document.documentElement.style.setProperty("--theme-bg-hover", bgColor);
  document.documentElement.style.setProperty("--theme-text-hover", textColor);
}

updateHoverColors(localStorage.getItem("theme") || "automatic");

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
