const form = document.getElementById("emergency-plan-form");
const clearButton = document.getElementById("clear-plan-btn");
const storageKey = "aquashieldEmergencyPlan";

function saveFormData() {
  const formData = {};
  const fields = form.querySelectorAll("input, textarea");

  fields.forEach((field) => {
    formData[field.name] = field.value;
  });

  localStorage.setItem(storageKey, JSON.stringify(formData));
}

function loadFormData() {
  const savedData = localStorage.getItem(storageKey);

  if (!savedData) return;

  const formData = JSON.parse(savedData);
  const fields = form.querySelectorAll("input, textarea");

  fields.forEach((field) => {
    if (formData[field.name] !== undefined) {
      field.value = formData[field.name];
    }
  });
}

function clearFormData() {
  const confirmed = confirm(
    "Are you sure you want to clear your emergency plan?",
  );

  if (!confirmed) return;

  form.reset();
  localStorage.removeItem(storageKey);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  saveFormData();
  alert("Your emergency plan has been saved.");
});

form.addEventListener("input", () => {
  saveFormData();
});

clearButton.addEventListener("click", clearFormData);

loadFormData();
