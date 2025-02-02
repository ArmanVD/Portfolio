const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeMenu = document.getElementById("theme-menu");
const themeButtons = document.querySelectorAll(".js-themepicker-themeselect");
const root = document.documentElement;

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
  } else {
    root.dataset.theme = theme;
  }

  themeButtons.forEach((btn) => btn.classList.remove("active"));

  const activeButton = document.querySelector(`.js-themepicker-themeselect[data-theme="${theme}"]`);
  if (activeButton) {
    activeButton.classList.add("active");
  }

  themeMenu.classList.remove("show");
}
