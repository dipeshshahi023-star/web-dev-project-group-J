// Membership Plans Data
const membershipPlans = {
    'single': {
        name: 'Single Session',
        price: '$15',
        description: 'Single Session Membership Package'
    },
    '10-sessions': {
        name: '10 Session Package',
        price: '$10',
        description: '10 Session Membership Package'
    },
    '40-sessions': {
        name: '40 Session Package',
        price: '$7',
        description: '40 Session Membership Package'
    }
};

// Handle Choose Plan Button Click
console.log('Script loaded, attaching event listeners...');
document.querySelectorAll('.btn-choose-plan').forEach(button => {
    console.log('Found button:', button.id);
    button.addEventListener('click', function() {
        console.log('Button clicked:', this.id);
        alert('something get wrong');
    });
});
console.log('Event listeners attached.');
