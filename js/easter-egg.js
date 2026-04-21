const brand = document.querySelector(".brand");

if (brand) {
  let logoClicks = 0;
  let resetTimer;

  const toast = document.createElement("p");
  toast.className = "easter-toast";
  toast.textContent = "Emergency tip unlocked: Follow official evacuation alerts first.";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);

  function showEmergencyTip() {
    toast.classList.add("is-visible");

    window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 3600);
  }

  brand.addEventListener("click", function () {
    logoClicks += 1;
    window.clearTimeout(resetTimer);

    if (logoClicks >= 3) {
      logoClicks = 0;
      showEmergencyTip();
    }

    resetTimer = window.setTimeout(function () {
      logoClicks = 0;
    }, 1800);
  });
}
