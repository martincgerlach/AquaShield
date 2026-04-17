const toggle = document.getElementById("darkToggle");
const icon = document.querySelector(".icon");

// load saved mode
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  toggle.checked = true;
  icon.textContent = "☀️";
} else {
  icon.textContent = "🌙";
}

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");

  if (toggle.checked) {
    localStorage.setItem("darkMode", "enabled");
    icon.textContent = "☀️";
  } else {
    localStorage.setItem("darkMode", "disabled");
    icon.textContent = "🌙";
  }
});