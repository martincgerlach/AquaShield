const form = document.getElementById("emergency-plan-form");

if (form) {
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
  const allFields = form.querySelectorAll("input, textarea");

  const requiredFields = [
    { name: "full-name", label: "Full Name", required: true },
    { name: "address", label: "Address", required: true },
    { name: "phone", label: "Phone Number", required: true },
    { name: "contact-name", label: "Emergency Contact", required: true },
    { name: "contact-phone", label: "Emergency Contact Phone", required: true },
  ];

  const householdFields = [
    { name: "relationship", label: "Relationship" },
    { name: "people-home", label: "People in Home" },
    { name: "pets", label: "Pets" },
  ];

  const evacuationFields = [
    { name: "safe-location", label: "Safe Location", required: true },
    { name: "meeting-point", label: "Meeting Point", required: true },
    { name: "evac-route", label: "Evacuation Route", required: true },
  ];

  const notesFields = [
    { name: "medical-needs", label: "Medical / Important Needs" },
    { name: "extra-notes", label: "Extra Notes" },
  ];

  function getField(name) {
    return form.elements.namedItem(name);
  }

  function getFieldValue(name) {
    const field = getField(name);

    if (!field) {
      return "";
    }

    return field.value.trim();
  }

  function getErrorElement(field) {
    const group = field.closest(".form-group");

    if (!group) {
      return null;
    }

    return group.querySelector(".field-error");
  }

  function setStatusMessage(message) {
    statusMessage.textContent = message;
  }

  function collectFormData() {
    const formData = {};

    for (const field of allFields) {
      formData[field.name] = field.value.trim();
    }

    return formData;
  }

  function getValidationMessage(field) {
    const value = field.value.trim();

    if (field.required && value === "") {
      return field.dataset.requiredMessage || "This field is required.";
    }

    if (value !== "") {
      const isNameField =
        field.name === "full-name" ||
        field.name === "contact-name" ||
        field.name === "relationship";

      const isPhoneField =
        field.name === "phone" ||
        field.name === "contact-phone";

      if (isNameField) {
        const nameIsValid = /^[A-Za-zÆØÅæøåÀ-ÿ' -]+$/.test(value);

        if (!nameIsValid) {
          return field.dataset.patternMessage || "Please use the correct format.";
        }
      }

      if (isPhoneField) {
        const hasOnlyPhoneCharacters = /^[0-9 +()-]+$/.test(value);
        const digitCount = value.replace(/\D/g, "").length;

        if (!hasOnlyPhoneCharacters) {
          return field.dataset.patternMessage || "Please use the correct format.";
        }

        if (digitCount < 8) {
          return "Phone number is too short.";
        }

        if (digitCount > 15) {
          return "Phone number is too long.";
        }
      }
    }

    return "";
  }

  function validateField(field, showRequiredMessage) {
    const group = field.closest(".form-group");
    const errorElement = getErrorElement(field);
    const value = field.value.trim();
    let message = "";

    field.setCustomValidity("");

    if (field.required && value === "" && showRequiredMessage) {
      message = field.dataset.requiredMessage || "This field is required.";
    } else if (value !== "" && getValidationMessage(field) !== "") {
      message = getValidationMessage(field);
    }

    field.setCustomValidity(message);

    if (errorElement) {
      errorElement.textContent = message;
    }

    if (!group) {
      return message === "";
    }

    if (value === "" && !showRequiredMessage) {
      group.classList.remove("is-invalid");
      field.classList.remove("valid", "invalid");
      field.setAttribute("aria-invalid", "false");
      return true;
    }

    if (message !== "") {
      group.classList.add("is-invalid");
      field.classList.remove("valid");
      field.classList.add("invalid");
      field.setAttribute("aria-invalid", "true");
      return false;
    }

    group.classList.remove("is-invalid");
    field.classList.remove("invalid");

    if (value !== "") {
      field.classList.add("valid");
    } else {
      field.classList.remove("valid");
    }

    field.setAttribute("aria-invalid", "false");
    return true;
  }

  function validateAllFields() {
    let allValid = true;

    for (const field of allFields) {
      const fieldValid = validateField(field, true);

      if (!fieldValid) {
        allValid = false;
      }
    }

    return allValid;
  }

  function isFieldValid(name) {
    const field = getField(name);

    if (!field) {
      return false;
    }

    const value = field.value.trim();

    if (value === "") {
      return false;
    }

    validateField(field, false);
    return field.checkValidity();
  }

  function createSummaryItem(fieldInfo, value) {
    const fieldIsValid = isFieldValid(fieldInfo.name);
    let itemClass = "summary-item";
    let valueClass = "summary-value";
    let displayValue = value;

    if (value === "") {
      if (fieldInfo.required) {
        itemClass = "summary-item is-missing";
        valueClass = "summary-value is-empty";
        displayValue = "Missing";
      } else {
        valueClass = "summary-value is-empty";
        displayValue = "Not added yet";
      }
    } else if (!fieldIsValid) {
      itemClass = "summary-item is-missing";
      valueClass = "summary-value is-empty";
      displayValue = "Check field";
    }

    return `
      <li class="${itemClass}">
        <span class="summary-label">${fieldInfo.label}</span>
        <span class="${valueClass}">${displayValue}</span>
      </li>
    `;
  }

  function renderSummaryList(target, fields, formData) {
    let markup = "";

    for (const field of fields) {
      markup += createSummaryItem(field, formData[field.name] || "");
    }

    target.innerHTML = markup;
  }

  function createDialogGroup(title, fields, formData) {
    let itemsMarkup = "";

    for (const field of fields) {
      const value = formData[field.name];

      if (value && isFieldValid(field.name)) {
        itemsMarkup += `
          <li>
            <span class="summary-label">${field.label}</span>
            <span class="summary-value">${value}</span>
          </li>
        `;
      }
    }

    if (itemsMarkup === "") {
      return "";
    }

    return `
      <section class="dialog-group">
        <h4>${title}</h4>
        <ul class="dialog-list">${itemsMarkup}</ul>
      </section>
    `;
  }

  function buildDialogSummary(formData) {
    let markup = "";

    markup += createDialogGroup("Required Information", requiredFields, formData);
    markup += createDialogGroup("Household Snapshot", householdFields, formData);
    markup += createDialogGroup("Evacuation Details", evacuationFields, formData);
    markup += createDialogGroup("Additional Notes", notesFields, formData);

    dialogSummary.innerHTML = markup;
  }

  function updateSummary() {
    const formData = collectFormData();
    const allRequiredFields = requiredFields.concat(evacuationFields);
    let completedRequired = 0;

    for (const field of allRequiredFields) {
      if (isFieldValid(field.name)) {
        completedRequired += 1;
      }
    }

    if (completedRequired === allRequiredFields.length) {
      summaryStatus.textContent = "All required fields are complete. Your plan is ready to save.";
    } else {
      summaryStatus.textContent = `${completedRequired} of ${allRequiredFields.length} required fields valid.`;
    }

    renderSummaryList(requiredSummaryList, requiredFields, formData);
    renderSummaryList(householdSummaryList, householdFields, formData);
    renderSummaryList(evacuationSummaryList, evacuationFields, formData);

    const notes = [formData["medical-needs"], formData["extra-notes"]]
      .filter(Boolean)
      .join(" ");

    if (notes) {
      notesSummary.textContent = notes;
    } else {
      notesSummary.textContent = "No medical or extra notes added yet.";
    }
  }

  function clearFormData() {
    const confirmed = confirm("Are you sure you want to clear your emergency plan?");

    if (!confirmed) {
      return;
    }

    form.reset();

    for (const field of allFields) {
      const group = field.closest(".form-group");
      const errorElement = getErrorElement(field);

      if (group) {
        group.classList.remove("is-invalid");
      }

      field.classList.remove("valid", "invalid");
      field.setCustomValidity("");
      field.setAttribute("aria-invalid", "false");

      if (errorElement) {
        errorElement.textContent = "";
      }
    }

    updateSummary();
    setStatusMessage("Your saved plan has been cleared.");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateAllFields()) {
      setStatusMessage("Please correct the highlighted fields before saving.");
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

  form.addEventListener("input", function (event) {
    const target = event.target;

    if (!target.matches("input, textarea")) {
      return;
    }

    validateField(target, false);
    updateSummary();
  });

  clearButton.addEventListener("click", clearFormData);

  closeDialogButton.addEventListener("click", function () {
    planDialog.close();
  });

  planDialog.addEventListener("click", function (event) {
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
}
