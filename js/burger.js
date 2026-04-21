const burger = document.querySelector(".burger");
const headerActions = document.querySelector(".header-actions");
const headerNav = document.querySelector(".site-header nav");

function closeMenu() {
  burger.classList.remove("active");
  headerActions.classList.remove("menu-open");
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-label", "Open menu");
}

function openMenu() {
  burger.classList.add("active");
  headerActions.classList.add("menu-open");
  burger.setAttribute("aria-expanded", "true");
  burger.setAttribute("aria-label", "Close menu");
}

if (burger && headerActions && headerNav) {
  burger.addEventListener("click", function () {
    if (headerActions.classList.contains("menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  headerNav.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", function (event) {
    const clickedInsideHeader = headerActions.contains(event.target);

    if (!clickedInsideHeader) {
      closeMenu();
    }
  });
}
