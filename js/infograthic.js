const cards = document.querySelectorAll("[data-card]");

cards.forEach((card) => {
  const button = card.querySelector(".card-toggle");

  button.addEventListener("click", () => {
    const isActive = card.classList.contains("active");

    cards.forEach((otherCard) => {
      otherCard.classList.remove("active");
      otherCard
        .querySelector(".card-toggle")
        .setAttribute("aria-expanded", "false");
    });

    if (!isActive) {
      card.classList.add("active");
      button.setAttribute("aria-expanded", "true");
    }
  });
});
