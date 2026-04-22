// Payment Details Page Script

// Membership Plans Data
const membershipPlans = {
    'single': {
        name: 'Normal Package',
        price: '£4.99/month'
    },
    '10-sessions': {
        name: 'Standard Package',
        price: '£9.99/month'
    },
    '40-sessions': {
        name: 'Premium Package',
        price: '£14.99/month'
    }
};

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Payment page loaded');
    displayPackageInfo();
    setupFormValidation();
    setupPurchaseButton();
    setupErrorModal();
});

// Display package information
function displayPackageInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const packageType = urlParams.get('package') || 'single';
    const packageName = document.getElementById('packageName');
    const packagePrice = document.getElementById('packagePrice');

    if (membershipPlans[packageType]) {
        packageName.textContent = membershipPlans[packageType].name;
        packagePrice.textContent = membershipPlans[packageType].price;
    } else {
        packageName.textContent = 'Selected Package';
        packagePrice.textContent = 'Contact us for pricing';
    }
}

// Setup form validation
function setupFormValidation() {
    const form = document.getElementById('paymentForm');
    const inputs = form.querySelectorAll('input[type="text"]');

    // Input validation listeners
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            // Clear error message when user starts typing
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorId = this.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }

            // Apply input masking
            if (this.id === 'cardNumber') {
                let rawDigits = this.value.replace(/\D/g, '');
                let formatted = '';
                
                // Only keep first 16 digits
                rawDigits = rawDigits.substring(0, 16);
                
                // Format as XXXX XXXX XXXX XXXX
                for (let i = 0; i < rawDigits.length; i++) {
                    if (i > 0 && i % 4 === 0) {
                        formatted += ' ';
                    }
                    formatted += rawDigits[i];
                }
                
                this.value = formatted;
            } else if (this.id === 'cardExpiry') {
                let value = this.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                this.value = value;
            } else if (this.id === 'sortCode') {
                let rawDigits = this.value.replace(/\D/g, '');
                let formatted = '';
                
                // Only keep first 6 digits
                rawDigits = rawDigits.substring(0, 6);
                
                // Format as XX-XX-XX
                if (rawDigits.length > 0) formatted = rawDigits.substring(0, 2);
                if (rawDigits.length > 2) formatted += '-' + rawDigits.substring(2, 4);
                if (rawDigits.length > 4) formatted += '-' + rawDigits.substring(4, 6);
                
                this.value = formatted;
            } else if (this.id === 'bankAccount' || this.id === 'securityCode') {
                this.value = this.value.replace(/\D/g, '');
            }
        });
    });
}

// Validate individual field
function validateField(field) {
    const fieldId = field.id;
    const value = field.value.trim();
    const errorElement = document.getElementById(fieldId + 'Error');
    let isValid = true;
    let errorMessage = '';

    switch (fieldId) {
        case 'bankAccount':
            if (!value) {
                isValid = false;
                errorMessage = 'Bank account number is required';
            } else if (!/^\d{1,8}$/.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Bank account must be 1-8 digits';
            }
            break;

        case 'accountHolder':
            if (!value) {
                isValid = false;
                errorMessage = 'Account holder name is required';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
            break;

        case 'cardNumber':
            const cardDigits = value.replace(/\s/g, '');
            if (!cardDigits) {
                isValid = false;
                errorMessage = 'Card number is required';
            } else if (!/^\d{1,16}$/.test(cardDigits)) {
                isValid = false;
                errorMessage = 'Card number must be 1-16 digits';
            }
            break;

        case 'cardExpiry':
            if (!value) {
                isValid = false;
                errorMessage = 'Expiry date is required';
            } else if (!/^\d{2}\/\d{2}$/.test(value)) {
                isValid = false;
                errorMessage = 'Format must be MM/YY';
            } else {
                const [month, year] = value.split('/');
                const monthNum = parseInt(month);
                if (monthNum < 1 || monthNum > 12) {
                    isValid = false;
                    errorMessage = 'Month must be between 01 and 12';
                }
            }
            break;

        case 'sortCode':
            const sortCodeDigits = value.replace(/\D/g, '');
            if (!sortCodeDigits) {
                isValid = false;
                errorMessage = 'Sort code is required';
            } else if (!/^\d{6}$/.test(sortCodeDigits)) {
                isValid = false;
                errorMessage = 'Sort code must be 6 digits (XX-XX-XX)';
            }
            break;

        case 'securityCode':
            if (!value) {
                isValid = false;
                errorMessage = 'Security code is required';
            } else if (!/^\d{3}$/.test(value)) {
                isValid = false;
                errorMessage = 'Security code must be exactly 3 digits';
            }
            break;
    }

    // Update UI based on validation
    if (isValid) {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    } else {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
    }

    return isValid;
}

// Validate entire form
function validateForm() {
    const form = document.getElementById('paymentForm');
    const inputs = form.querySelectorAll('input[type="text"]');
    let allValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            allValid = false;
        }
    });

    return allValid;
}

// Setup purchase button
function setupPurchaseButton() {
    const form = document.getElementById('paymentForm');
    const purchaseBtn = document.querySelector('.btn-purchase');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            // Show error modal (as per requirement - this is a UI demo)
            showErrorModal();
        }
    });
}

// Setup error modal
function setupErrorModal() {
    const errorModal = document.getElementById('errorModal');
    const errorOverlay = document.getElementById('errorModalOverlay');
    const closeBtn = document.getElementById('closeErrorModal');

    closeBtn.addEventListener('click', function() {
        closeErrorModal();
    });

    errorOverlay.addEventListener('click', function() {
        closeErrorModal();
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeErrorModal();
        }
    });
}

// Show error modal
function showErrorModal() {
    const errorModal = document.getElementById('errorModal');
    const errorOverlay = document.getElementById('errorModalOverlay');

    errorModal.classList.add('show');
    errorOverlay.classList.add('show');

    // Optional: Trigger animation
    errorModal.style.animation = 'none';
    setTimeout(() => {
        errorModal.style.animation = '';
    }, 10);
}

// Close error modal
function closeErrorModal() {
    const errorModal = document.getElementById('errorModal');
    const errorOverlay = document.getElementById('errorModalOverlay');

    errorModal.classList.remove('show');
    errorOverlay.classList.remove('show');
}
