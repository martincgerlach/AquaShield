const toggle = document.getElementById("darkToggle");
const toggleLabel = toggle.closest(".dark-toggle");

function setMode(isDarkMode) {
  document.body.classList.toggle("dark-mode", isDarkMode);
  toggle.checked = isDarkMode;

  if (toggleLabel) {
    toggleLabel.setAttribute(
      "aria-label",
      isDarkMode ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}

setMode(localStorage.getItem("darkMode") === "enabled");

toggle.addEventListener("change", () => {
  localStorage.setItem("darkMode", toggle.checked ? "enabled" : "disabled");
  setMode(toggle.checked);
});
