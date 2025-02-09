const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeIcon = document.getElementById("theme-icon");
const themeMenu = document.getElementById("theme-menu");
const closeButton = document.querySelector(".close-menu");
const themeButtons = document.querySelectorAll(".js-themepicker-themeselect");
const root = document.documentElement;

const themeIcons = {
  light: "../assets/theme-icon-light.svg",
  dark: "../assets/theme-icon-dark.svg",
  persian: "../assets/theme-icon-persian.svg",
};

const savedTheme = localStorage.getItem("theme") || "automatic";
setTheme(savedTheme);

let isAnimating = false;

function openMenu() {
  if (isAnimating || themeMenu.classList.contains("show")) return;
  isAnimating = true;

  themeMenu.style.display = "block";
  themeMenu.style.opacity = "0";

  requestAnimationFrame(() => {
    themeMenu.style.transition = "opacity 0.3s ease";
    themeMenu.style.opacity = "1";
    themeMenu.classList.add("show");

    setTimeout(() => {
      isAnimating = false;
    }, 300);
  });
}

function closeMenu() {
  if (isAnimating || !themeMenu.classList.contains("show")) return;
  isAnimating = true;

  themeMenu.style.transition = "opacity 0.3s ease";
  themeMenu.style.opacity = "0";

  setTimeout(() => {
    themeMenu.style.display = "none";
    themeMenu.classList.remove("show");
    isAnimating = false;
  }, 300);
}

themeToggleBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  openMenu();
});

closeButton.addEventListener("click", () => {
  closeMenu();
});

document.addEventListener("click", (event) => {
  if (!themeMenu.contains(event.target) && !themeToggleBtn.contains(event.target)) {
    closeMenu();
  }
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

  setTimeout(() => {
    closeMenu();
  }, 500);
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

let wordsH2 = ["فرانت اند توسعه دهنده", "توسعه‌دهنده هستم", "طراح هستم", "توسعه‌دهنده وب هستم", "طراح UI/UX هستم", "دانشجو هستم"];

const staticText = "من یک ";

let index = 0;
let wordIndexH2 = 0;
let charIndexH2 = 0;
let isDeletingH2 = false;
let isTypingStaticText = true;

titleElement.textContent = "";

const typeInterval = 100;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(wordsH2);
wordIndexH2 = Math.floor(Math.random() * wordsH2.length);

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
      setTimeout(updateWordH2, 4000);
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

const articles = document.querySelectorAll("article");
let isScrolling = false;

function snapToSection() {
  if (isScrolling) return;
  isScrolling = true;

  const scrollPosition = window.scrollY;
  let closestArticle = null;
  let closestDistance = Infinity;

  if (scrollPosition < articles[1].offsetTop / 2) {
    isScrolling = false;
    return;
  }

  for (let i = 1; i < articles.length; i++) {
    let distance = Math.abs(articles[i].offsetTop - scrollPosition);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestArticle = articles[i];
    }
  }

  if (closestArticle) {
    window.scrollTo({
      top: closestArticle.offsetTop,
      behavior: "smooth",
    });
  }

  setTimeout(() => {
    isScrolling = false;
  }, 600);
}

window.addEventListener("scroll", () => {
  clearTimeout(window.snapScrollTimeout);
  window.snapScrollTimeout = setTimeout(snapToSection, 150);
});
