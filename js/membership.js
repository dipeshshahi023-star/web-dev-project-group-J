// Membership Plans Data
const membershipPlans = {
    'single': {
        name: 'Normal Package',
        price: '£4.99/month',
        description: 'Normal Package Membership'
    },
    '10-sessions': {
        name: 'Standard Package',
        price: '£9.99/month',
        description: 'Standard Package Membership'
    },
    '40-sessions': {
        name: 'Premium Package',
        price: '£14.99/month',
        description: 'Premium Package Membership'
    }
};

// Function to attach event listeners
function attachEventListeners() {
    const buttons = document.querySelectorAll('.btn-choose-plan');
    console.log('Found ' + buttons.length + ' buttons');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const packageType = this.getAttribute('data-package');
            console.log('Button clicked - Package:', packageType);
            // Redirect to payment page with package type
            window.location.href = 'payment.html?package=' + packageType;
        });
    });
}

// Attach listeners when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachEventListeners);
} else {
    attachEventListeners();
}

console.log('Membership script loaded successfully');

