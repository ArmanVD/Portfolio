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
const h2Element = document.getElementById("animated-h2");
const textElementH2 = document.getElementById("animated-text-h2");
const cursor = document.getElementById("cursor");

const wordsH2 = ["Frontender", "Developer", "Designer", "Web Developer", "UI/UX Designer", "Student"];
const staticText = "I'm a ";

let index = 0;
let wordIndexH2 = 0;
let charIndexH2 = 0;
let isDeletingH2 = false;
let isTypingStaticText = true;

titleElement.textContent = "";

const typeInterval = 100;

document.documentElement.style.setProperty(
  "--fadeInTime",
  `${(text.split("").length + wordsH2[0].split("").length + staticText.split("").length) * typeInterval + 250}ms`
);

setTimeout(() => {
  typeEffect();
}, typeInterval);

function typeEffect() {
  if (index < text.length) {
    titleElement.textContent += text[index];
    index++;
    setTimeout(typeEffect, typeInterval);
  } else {
    typeEffectH2();
  }
}

function typeEffectH2() {
  h2Element.style.visibility = "visible";
  cursor.style.opacity = "1";

  if (isTypingStaticText) {
    if (charIndexH2 < staticText.length) {
      textElementH2.innerHTML = staticText.substring(0, charIndexH2 + 1);
      charIndexH2++;
      setTimeout(typeEffectH2, typeInterval);
    } else {
      isTypingStaticText = false;
      charIndexH2 = 0;
      updateWordH2();
    }
  }
}

function updateWordH2() {
  const currentWord = wordsH2[wordIndexH2];

  if (!isDeletingH2) {
    textElementH2.innerHTML = staticText + currentWord.substring(0, charIndexH2 + 1);
    charIndexH2++;

    if (charIndexH2 === currentWord.length) {
      isDeletingH2 = true;
      setTimeout(updateWordH2, 15000);
      return;
    }
  } else {
    textElementH2.innerHTML = staticText + currentWord.substring(0, charIndexH2 - 1);
    charIndexH2--;

    if (charIndexH2 === 0) {
      isDeletingH2 = false;
      wordIndexH2 = (wordIndexH2 + 1) % wordsH2.length;
    }
  }

  setTimeout(updateWordH2, typeInterval);
}
