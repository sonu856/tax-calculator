document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('tax-calculator-form');
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

    [document.getElementById('gross-annual-income'), document.getElementById('extra-income'), document.getElementById('total-deductions')].forEach(field => {
      const icon = field.parentNode.querySelector('.input-group-text i');
      if (isNaN(parseFloat(field.value)) || field.value.trim() === '') {
        icon.classList.remove('bi-exclamation-circle');
        icon.classList.add('bi-exclamation-circle-fill','text-danger');
        icon.setAttribute('title', 'Enter a valid number');
        isValid = false;
      } else {
        icon.classList.remove('bi-exclamation-circle-fill','text-danger');
        icon.classList.add('bi-exclamation-circle');
        icon.setAttribute('title', 'Please Enter Numbers Only');
      }
    });

    const ageGroupSelect = document.getElementById('age-group');
    const ageGroupIcon = ageGroupSelect.parentNode.querySelector('.input-group-text i');
    if (ageGroupSelect.value === '') {
      ageGroupIcon.classList.add('bi-exclamation-circle-fill','text-danger');
      ageGroupIcon.classList.remove('bi-exclamation-circle');
      isValid = false;
    } else {
      ageGroupIcon.classList.remove('bi-exclamation-circle-fill','text-danger');
      ageGroupIcon.classList.add('bi-exclamation-circle');
    }

    return isValid;
  }

  function calculateTax() {
    const grossIncome = parseFloat(document.getElementById('gross-annual-income').value);
    const extraIncome = parseFloat(document.getElementById('extra-income').value);
    const deductions = parseFloat(document.getElementById('total-deductions').value);
    const ageGroup = document.getElementById('age-group').value;

    const totalIncome = grossIncome + extraIncome;
    const taxableIncome = totalIncome - deductions;
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
    document.getElementById('overall-income').textContent = `Your net income after tax deduction is ${(totalIncome - taxAmount).toFixed(2)}.`;
    document.getElementById('tax-amount').textContent = `Your tax amount is ${taxAmount.toFixed(2)}.`;
  }
});
