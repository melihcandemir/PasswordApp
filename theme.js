// Tema değiştirme
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

// Sayfa yüklendiğinde tema tercihini kontrol et
if (
  localStorage.getItem("theme") === "dark" ||
  (!localStorage.getItem("theme") &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  html.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    html.classList.contains("dark") ? "dark" : "light"
  );
});
