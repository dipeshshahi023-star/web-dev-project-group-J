$(document).ready(function() {
    // ===== FORM VALIDATION =====
    
    const form = $('#membershipForm');
    
    // Validate Full Name
    function validateFullName(value) {
        return value.trim().length >= 3 && /^[a-zA-Z\s]*$/.test(value);
    }
    
    // Validate Email
    function validateEmail(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value.trim());
    }
    
    // Validate Age
    function validateAge(value) {
        const age = parseInt(value);
        return age >= 13 && age <= 120;
    }
    
    // Validate Height
    function validateHeight(value, unit) {
        const height = parseFloat(value);
        if (unit === 'cm') {
            return height >= 50 && height <= 250;
        } else if (unit === 'feet') {
            return height >= 2 && height <= 8;
        }
        return false;
    }
    
    // Update height input based on unit
    function updateHeightInput(unit) {
        const heightInput = $('#height');
        if (unit === 'cm') {
            heightInput.attr('placeholder', 'Enter your height in cm (e.g., 175)');
            heightInput.attr('min', 50);
            heightInput.attr('max', 250);
            heightInput.attr('step', 0.1);
        } else if (unit === 'feet') {
            heightInput.attr('placeholder', 'Enter your height in feet (e.g., 5.6)');
            heightInput.attr('min', 2);
            heightInput.attr('max', 8);
            heightInput.attr('step', 0.1);
        }
    }
    
    // Validate Weight
    function validateWeight(value, unit) {
        const weight = parseFloat(value);
        if (unit === 'kg') {
            return weight >= 20 && weight <= 300;
        } else if (unit === 'lbs') {
            return weight >= 40 && weight <= 700;
        }
        return false;
    }
    
    // Update weight input based on unit
    function updateWeightInput(unit) {
        const weightInput = $('#weight');
        if (unit === 'kg') {
            weightInput.attr('placeholder', 'Enter your weight in kg');
            weightInput.attr('min', 20);
            weightInput.attr('max', 300);
            weightInput.attr('step', 0.1);
        } else if (unit === 'lbs') {
            weightInput.attr('placeholder', 'Enter your weight in lbs');
            weightInput.attr('min', 40);
            weightInput.attr('max', 700);
            weightInput.attr('step', 0.1);
        }
    }
    
    
    // Clear error message
    function clearError(fieldId) {
        $(`#${fieldId}Error`).removeClass('show').text('');
        $(`#${fieldId}`).closest('.form-group').removeClass('error');
    }
    
    // Show error message
    function showError(fieldId, message) {
        $(`#${fieldId}Error`).addClass('show').text(message);
        $(`#${fieldId}`).closest('.form-group').addClass('error');
    }
    
    // ===== REAL-TIME VALIDATION =====
    
    $('#fullName').on('blur', function() {
        const value = $(this).val();
        if (value && !validateFullName(value)) {
            showError('fullName', 'Please enter a valid name (min 3 letters, letters only)');
        } else {
            clearError('fullName');
        }
    });
    
    $('#email').on('blur', function() {
        const value = $(this).val();
        if (value && !validateEmail(value)) {
            showError('email', 'Please enter a valid email address');
        } else {
            clearError('email');
        }
    });
    
    $('#age').on('blur', function() {
        const value = $(this).val();
        if (value && !validateAge(value)) {
            showError('age', 'Age must be between 13 and 120');
        } else {
            clearError('age');
        }
    });
    
    $('#height').on('blur', function() {
        const value = $(this).val();
        const unit = $('input[name="heightUnit"]:checked').val();
        if (value && !validateHeight(value, unit)) {
            const unitText = unit === 'cm' ? 'cm' : 'feet';
            showError('height', `Height must be between ${unit === 'cm' ? '50cm and 250cm' : '2 feet and 8 feet'}`);
        } else {
            clearError('height');
        }
    });
    
    $('#weight').on('blur', function() {
        const value = $(this).val();
        const unit = $('input[name="weightUnit"]:checked').val();
        if (value && !validateWeight(value, unit)) {
            const unitText = unit === 'kg' ? 'kg' : 'lbs';
            showError('weight', `Weight must be between ${unit === 'kg' ? '20kg and 300kg' : '40 lbs and 700 lbs'}`);
        } else {
            clearError('weight');
        }
    });
    
    // Height unit change
    $('input[name="heightUnit"]').on('change', function() {
        const unit = $(this).val();
        updateHeightInput(unit);
        // Clear any existing error
        clearError('height');
    });
    
    // Weight unit change
    $('input[name="weightUnit"]').on('change', function() {
        const unit = $(this).val();
        updateWeightInput(unit);
        // Clear any existing error
        clearError('weight');
    });
    
    // Occupation change
    $('input[name="occupation"]').on('change', function() {
        const occupation = $(this).val();
        if (occupation) {
            clearError('occupation');
        }
    });
    
    // ===== FORM SUBMISSION =====
    
    form.on('submit', function(e) {
        e.preventDefault();
        
        // Reset all errors
        $('.error-message').removeClass('show').text('');
        $('.form-group').removeClass('error');
        
        // Validate all fields
        let isValid = true;
        const formData = {};
        
        // Validate Full Name
        const fullName = $('#fullName').val();
        if (!fullName) {
            showError('fullName', 'Full name is required');
            isValid = false;
        } else if (!validateFullName(fullName)) {
            showError('fullName', 'Please enter a valid name (min 3 letters, letters only)');
            isValid = false;
        } else {
            formData.fullName = fullName;
        }
        
        // Validate Email
        const email = $('#email').val();
        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        } else {
            formData.email = email;
        }
        
        // Validate Age
        const age = $('#age').val();
        if (!age) {
            showError('age', 'Age is required');
            isValid = false;
        } else if (!validateAge(age)) {
            showError('age', 'Age must be between 13 and 120');
            isValid = false;
        } else {
            formData.age = parseInt(age);
        }
        
        // Validate Height
        const height = $('#height').val();
        const heightUnit = $('input[name="heightUnit"]:checked').val();
        if (!height) {
            showError('height', 'Height is required');
            isValid = false;
        } else if (!validateHeight(height, heightUnit)) {
            const unitText = heightUnit === 'cm' ? 'cm' : 'feet';
            showError('height', `Height must be between ${heightUnit === 'cm' ? '50cm and 250cm' : '2 feet and 8 feet'}`);
            isValid = false;
        } else {
            // Convert to cm for storage
            const heightInCm = heightUnit === 'feet' ? parseFloat(height) * 30.48 : parseFloat(height);
            formData.height = Math.round(heightInCm * 10) / 10; // Round to 1 decimal
        }
        
        // Validate Weight
        const weight = $('#weight').val();
        const weightUnit = $('input[name="weightUnit"]:checked').val();
        if (!weight) {
            showError('weight', 'Weight is required');
            isValid = false;
        } else if (!validateWeight(weight, weightUnit)) {
            const unitText = weightUnit === 'kg' ? 'kg' : 'lbs';
            showError('weight', `Weight must be between ${weightUnit === 'kg' ? '20kg and 300kg' : '40 lbs and 700 lbs'}`);
            isValid = false;
        } else {
            // Convert to kg for storage
            const weightInKg = weightUnit === 'lbs' ? parseFloat(weight) / 2.20462 : parseFloat(weight);
            formData.weight = Math.round(weightInKg * 10) / 10; // Round to 1 decimal
        }
        
        // Validate Occupation
        const occupation = $('input[name="occupation"]:checked').val();
        if (!occupation) {
            showError('occupation', 'Please select your occupation status');
            isValid = false;
        } else {
            formData.occupation = occupation;
        }
        
        // Validate Gender
        const gender = $('input[name="gender"]:checked').val();
        if (!gender) {
            showError('gender', 'Please select a gender');
            isValid = false;
        } else {
            formData.gender = gender;
        }
        
        // If all validations pass
        if (isValid) {
            // Store data in localStorage
            const timestamp = new Date().toLocaleString();
            const membershipData = {
                ...formData,
                submittedAt: timestamp
            };
            
            // Store in localStorage
            const existingData = JSON.parse(localStorage.getItem('fitflow_members')) || [];
            existingData.push(membershipData);
            localStorage.setItem('fitflow_members', JSON.stringify(existingData));
            
            // Set this as the current user
            localStorage.setItem('fitflow_current_user', JSON.stringify(membershipData));
            
            console.log('✅ Form submitted successfully!', membershipData);
            
            // Hide form and show success message
            form.fadeOut(500, function() {
                $('#successMessage').fadeIn(500);
                $('html, body').animate({
                    scrollTop: $('.form-container').offset().top - 100
                }, 800, 'swing');
            });
        } else {
            // Scroll to first error
            const firstError = $('.error-message.show').first();
            if (firstError.length) {
                $('html, body').animate({
                    scrollTop: firstError.offset().top - 150
                }, 500, 'swing');
            }
        }
    });
    
    // ===== PHONE INPUT FORMATTING =====
    
    // Add animation to input on focus
    $('.form-group input, .form-group select').on('focus', function() {
        $(this).closest('.form-group').addClass('focused');
    }).on('blur', function() {
        $(this).closest('.form-group').removeClass('focused');
    });
    
    // ===== BUTTON RIPPLE EFFECT =====
    $('button, .btn-cancel, .btn-home').on('click', function(e) {
        const ripple = $('<span class="ripple"></span>');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.css({
            width: size,
            height: size,
            left: x,
            top: y
        });
        
        $(this).append(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // ===== GO TO MY DETAILS BUTTON =====
    $('.btn-home').on('click', function(e) {
        // Redirect to my-details page after storing data
        setTimeout(() => {
            window.location.href = 'my-details.html';
        }, 300);
    });
    
    // ===== PAGE LOAD ANIMATION =====
    $('body').fadeIn(500);
    
    // ===== CONSOLE MESSAGE =====
    console.log('%cWelcome to FitFlow Membership!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
    console.log('%cFill up your information to get started 💪', 'color: #0099ff; font-size: 14px;');
});
