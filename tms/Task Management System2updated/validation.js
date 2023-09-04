const startDateInput = document.getElementById("StartDate");
const endDateInput = document.getElementById("EndDate");

startDateInput.addEventListener("change", function() {
  endDateInput.min = startDateInput.value;
  validateDates();
});

endDateInput.addEventListener("change", function() {
  startDateInput.max = endDateInput.value;
  validateDates();
});

function validateDates() {
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);

  if (endDate < startDate) {
    endDateInput.value = "";
  }
}

