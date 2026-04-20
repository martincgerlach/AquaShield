const form = document.getElementById("emergency-plan-form");
const clearButton = document.getElementById("clear-plan-btn");
const statusMessage = document.getElementById("plan-status");
const summaryStatus = document.getElementById("summary-status");
const requiredSummaryList = document.getElementById("summary-required-list");
const householdSummaryList = document.getElementById("summary-household-list");
const evacuationSummaryList = document.getElementById("summary-evacuation-list");
const notesSummary = document.getElementById("summary-notes");
const planDialog = document.getElementById("plan-dialog");
const dialogSummary = document.getElementById("dialog-summary");
const closeDialogButton = document.getElementById("close-plan-dialog-btn");

const summaryGroups = {
  required: [
    { name: "full-name", label: "Full Name", required: true },
    { name: "address", label: "Address", required: true },
    { name: "phone", label: "Phone Number", required: true },
    { name: "contact-name", label: "Emergency Contact", required: true },
    { name: "contact-phone", label: "Emergency Contact Phone", required: true },
  ],
  household: [
    { name: "relationship", label: "Relationship" },
    { name: "people-home", label: "People in Home" },
    { name: "pets", label: "Pets" },
  ],
  evacuation: [
    { name: "safe-location", label: "Safe Location", required: true },
    { name: "meeting-point", label: "Meeting Point", required: true },
    { name: "evac-route", label: "Evacuation Route", required: true },
  ],
};

function collectFormData() {
  const formData = {};
  const fields = form.querySelectorAll("input, textarea");

  fields.forEach((field) => {
    formData[field.name] = field.value.trim();
  });

  return formData;
}

function setStatusMessage(message) {
  statusMessage.textContent = message;
}

function toggleInvalidState(field) {
  const group = field.closest(".form-group");

  if (!group) return;

  const value = field.value.trim();

  if (value === "") {
    group.classList.remove("is-invalid");
    return;
  }

  // kun fejl hvis der ER skrevet noget og det er invalid
  const isInvalid = !field.checkValidity();

  group.classList.toggle("is-invalid", isInvalid);
}

function validateRequiredFields() {
  const requiredFields = form.querySelectorAll("[required]");
  let allValid = true;

  requiredFields.forEach((field) => {
    toggleInvalidState(field);

    if (field.value.trim() === "") {
      allValid = false;
    }
  });

  return allValid;
}

function createSummaryMarkup(fieldConfig, value) {
  const isEmpty = value === "";
  const itemClass = fieldConfig.required && isEmpty
    ? "summary-item is-missing"
    : "summary-item";
  const valueClass = isEmpty ? "summary-value is-empty" : "summary-value";
  const fallbackText = fieldConfig.required ? "Missing" : "Not added yet";

  return `
    <li class="${itemClass}">
      <span class="summary-label">${fieldConfig.label}</span>
      <span class="${valueClass}">${isEmpty ? fallbackText : value}</span>
    </li>
  `;
}

function renderSummaryList(target, fields, formData) {
  target.innerHTML = fields
    .map((field) => createSummaryMarkup(field, formData[field.name] || ""))
    .join("");
}

function createDialogGroup(title, fields, formData) {
  const filledFields = fields.filter((field) => formData[field.name]);

  if (filledFields.length === 0) {
    return "";
  }

  const itemsMarkup = filledFields
    .map(
      (field) => `
        <li>
          <span class="summary-label">${field.label}</span>
          <span class="summary-value">${formData[field.name]}</span>
        </li>
      `,
    )
    .join("");

  return `
    <section class="dialog-group">
      <h4>${title}</h4>
      <ul class="dialog-list">${itemsMarkup}</ul>
    </section>
  `;
}

function buildDialogSummary(formData) {
  const notesFields = [
    { name: "medical-needs", label: "Medical / Important Needs" },
    { name: "extra-notes", label: "Extra Notes" },
  ];

  dialogSummary.innerHTML = [
    createDialogGroup("Required Information", summaryGroups.required, formData),
    createDialogGroup("Household Snapshot", summaryGroups.household, formData),
    createDialogGroup("Evacuation Details", summaryGroups.evacuation, formData),
    createDialogGroup("Additional Notes", notesFields, formData),
  ]
    .filter(Boolean)
    .join("");
}

function updateSummary() {
  const formData = collectFormData();
  const requiredFields = [
    ...summaryGroups.required,
    ...summaryGroups.evacuation.filter((field) => field.required),
  ];
  const completedRequired = requiredFields.filter(
    (field) => formData[field.name],
  ).length;

  summaryStatus.textContent =
    completedRequired === requiredFields.length
      ? "All required fields are complete. Your plan is ready to save."
      : `${completedRequired} of ${requiredFields.length} required fields completed.`;

  renderSummaryList(requiredSummaryList, summaryGroups.required, formData);
  renderSummaryList(householdSummaryList, summaryGroups.household, formData);
  renderSummaryList(evacuationSummaryList, summaryGroups.evacuation, formData);

  const notes = [formData["medical-needs"], formData["extra-notes"]]
    .filter(Boolean)
    .join(" ");

  notesSummary.textContent = notes || "No medical or extra notes added yet.";
}

function clearFormData() {
  const confirmed = confirm(
    "Are you sure you want to clear your emergency plan?",
  );

  if (!confirmed) return;

  form.reset();
  form.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("is-invalid");
  });
  updateSummary();
  setStatusMessage("Your saved plan has been cleared.");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const isValid = validateRequiredFields();

  if (!isValid) {
    setStatusMessage("Please complete all required fields before saving.");
    form.reportValidity();
    updateSummary();
    return;
  }

  updateSummary();
  buildDialogSummary(collectFormData());
  setStatusMessage("Your emergency plan has been saved.");

  if (planDialog && typeof planDialog.showModal === "function") {
    if (planDialog.open) {
      planDialog.close();
    }

    planDialog.showModal();
  }
});

form.addEventListener("input", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
    return;
  }

  // fjern gamle classes
  target.classList.remove("valid", "invalid");

  const value = target.value.trim();

  // hvis tom → ingen styling
  if (value === "") {
    target.classList.remove("valid", "invalid");
  } else {
    if (target.checkValidity()) {
      target.classList.add("valid");
    } else {
      target.classList.add("invalid");
    }
  }

  // din eksisterende logik
  toggleInvalidState(target);
  updateSummary();
});

clearButton.addEventListener("click", clearFormData);

closeDialogButton.addEventListener("click", () => {
  planDialog.close();
});

planDialog.addEventListener("click", (event) => {
  const dialogBounds = planDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < dialogBounds.left ||
    event.clientX > dialogBounds.right ||
    event.clientY < dialogBounds.top ||
    event.clientY > dialogBounds.bottom;

  if (clickedOutside) {
    planDialog.close();
  }
});

updateSummary();
