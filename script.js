document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('tax-calculator-form');
  const submitBtn = document.getElementById('submit-btn');
  const grossAnnualIncomeInput = document.getElementById('gross-annual-income');
  const extraIncomeInput = document.getElementById('extra-income');
  const ageGroupSelect = document.getElementById('age-group');
  const totalDeductionsInput = document.getElementById('total-deductions');
  const overallIncomeOutput = document.getElementById('overall-income');
  const taxAmountOutput = document.getElementById('tax-amount');
  const taxResultModal = new bootstrap.Modal(document.getElementById('tax-result-modal'));

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateInputs()) {
      calculateTax();
      taxResultModal.show();
    }
  });

  function validateInputs() {
    let isValid = true;
    [grossAnnualIncomeInput, extraIncomeInput, totalDeductionsInput].forEach(field => {
      if (isNaN(parseFloat(field.value)) || field.value.trim() === '') {
        setError(field, true);
        isValid = false;
      } else {
        setError(field, false);
      }
    });

    if (ageGroupSelect.value === '') {
      setError(ageGroupSelect, true);
      isValid = false;
    } else {
      setError(ageGroupSelect, false);
    }

    return isValid;
  }

  function setError(field, error) {
    const invalidFeedback = field.parentNode.querySelector('.invalid-feedback');
    if (error) {
      field.classList.add('is-invalid');
      invalidFeedback.classList.remove('d-none');
    } else {
      field.classList.remove('is-invalid');
      invalidFeedback.classList.add('d-none');
    }
  }

  function calculateTax() {
    const grossAnnualIncome = parseFloat(grossAnnualIncomeInput.value);
    const extraIncome = parseFloat(extraIncomeInput.value);
    const totalDeductions = parseFloat(totalDeductionsInput.value);
    const ageGroup = ageGroupSelect.value;

    const totalIncome = grossAnnualIncome + extraIncome;
    const taxableIncome = totalIncome - totalDeductions;
    let taxAmount = 0;

    if (taxableIncome > 800000) {
      const excessIncome = taxableIncome - 800000;
      switch (ageGroup) {
        case 'under-40':
          taxAmount = excessIncome * 0.3;
          break;
        case '40-60':
          taxAmount = excessIncome * 0.4;
          break;
        case 'over-60':
          taxAmount = excessIncome * 0.1;
          break;
      }
    }

    updateResults(totalIncome, taxAmount);
  }

  function updateResults(totalIncome, taxAmount) {
    overallIncomeOutput.textContent = `Your net income after tax deduction is ${(totalIncome - taxAmount).toFixed(2)}.`;
    taxAmountOutput.textContent = `Your tax amount is ${taxAmount.toFixed(2)}.`;
}
});
