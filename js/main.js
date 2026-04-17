const openChecklistBtn = document.getElementById("openChecklistBtn");
const checklistDialog = document.getElementById("checklistDialog");
const closeChecklistBtn = document.getElementById("closeChecklistBtn");
const dialogDoneBtn = document.getElementById("dialogDoneBtn");
const popoverTriggers = document.querySelectorAll(".popover-btn");
const faqItems = document.querySelectorAll(".faq-item");
const dialogTransitionMs = 280;

let lastFocusedElement = null;

function openChecklistDialog() {
  if (!checklistDialog) return;

  lastFocusedElement = document.activeElement;
  checklistDialog.showModal();

  requestAnimationFrame(() => {
    checklistDialog.classList.add("is-visible");
  });
}

function closeChecklistDialog() {
  if (!checklistDialog || !checklistDialog.open) return;

  checklistDialog.classList.remove("is-visible");

  window.setTimeout(() => {
    checklistDialog.close();

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  }, dialogTransitionMs);
}

function positionPopover(trigger, popover) {
  if (!trigger || !popover || !popover.matches(":popover-open")) return;

  const triggerRect = trigger.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const spacing = 14;

  let left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
  let top = triggerRect.bottom + spacing;

  if (left < 16) left = 16;
  if (left + popoverRect.width > window.innerWidth - 16) {
    left = window.innerWidth - popoverRect.width - 16;
  }

  if (top + popoverRect.height > window.innerHeight - 16) {
    top = triggerRect.top - popoverRect.height - spacing;
  }

  if (top < 16) top = 16;

  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
}

if (openChecklistBtn && checklistDialog) {
  openChecklistBtn.addEventListener("click", openChecklistDialog);

  [closeChecklistBtn, dialogDoneBtn].forEach((button) => {
    button?.addEventListener("click", closeChecklistDialog);
  });

  checklistDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeChecklistDialog();
  });

  checklistDialog.addEventListener("click", (event) => {
    const dialogRect = checklistDialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < dialogRect.left ||
      event.clientX > dialogRect.right ||
      event.clientY < dialogRect.top ||
      event.clientY > dialogRect.bottom;

    if (clickedOutside) {
      closeChecklistDialog();
    }
  });
}

popoverTriggers.forEach((trigger) => {
  const popoverId = trigger.getAttribute("popovertarget");
  const popover = popoverId ? document.getElementById(popoverId) : null;

  if (!popover) return;

  trigger.addEventListener("click", () => {
    requestAnimationFrame(() => {
      positionPopover(trigger, popover);
    });
  });

  popover.addEventListener("toggle", () => {
    if (popover.matches(":popover-open")) {
      positionPopover(trigger, popover);
    }
  });

  window.addEventListener("resize", () => positionPopover(trigger, popover));
  window.addEventListener("scroll", () => positionPopover(trigger, popover), true);
});

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    });
  });
});
