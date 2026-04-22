$(document).ready(function() {
    // ===== LOAD USER DETAILS =====
    
    function loadUserDetails() {
        const currentUser = JSON.parse(localStorage.getItem('fitflow_current_user'));
        
        if (!currentUser) {
            $('#detailsContent').html(`
                <div class="no-data-message">
                    <p>No user details found. Please <a href="form.html">complete the form</a> first.</p>
                </div>
            `);
            return;
        }

        // Helper function to format field names
        function formatFieldName(field) {
            return field
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase())
                .trim();
        }

        // Helper function to format values
        function formatValue(key, value) {
            if (key === 'gender' || key === 'occupation') {
                return value.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            }
            if (key === 'height') {
                return `${value} cm`;
            }
            if (key === 'weight') {
                return `${value} kg`;
            }
            return value;
        }

        // Create details HTML
        let detailsHTML = '<div class="user-details-grid">';
        
        for (const [key, value] of Object.entries(currentUser)) {
            if (key !== 'submittedAt') {
                detailsHTML += `
                    <div class="detail-item">
                        <label>${formatFieldName(key)}</label>
                        <span class="detail-value">${formatValue(key, value)}</span>
                    </div>
                `;
            }
        }
        
        // Add submission date
        detailsHTML += `
            <div class="detail-item">
                <label>Submitted At</label>
                <span class="detail-value">${currentUser.submittedAt}</span>
            </div>
        </div>`;

        $('#detailsContent').html(detailsHTML);

        // Display height and weight in metrics
        $('#heightValue').text(currentUser.height + ' cm');
        $('#weightValue').text(currentUser.weight + ' kg');

        // Calculate and display BMI
        calculateBMI(currentUser.height, currentUser.weight);

        // Store current user globally for edit functionality
        window.currentUserData = currentUser;
    }

    // ===== CALCULATE BMI =====
    
    function calculateBMI(heightCm, weightKg) {
        const heightM = heightCm / 100;
        const bmi = weightKg / (heightM * heightM);
        const bmiRounded = bmi.toFixed(1);
        
        $('#bmiValue').text(bmiRounded);
        
        // Determine BMI status
        let status = '';
        let statusClass = '';
        
        if (bmi < 18.5) {
            status = 'Underweight';
            statusClass = 'underweight';
        } else if (bmi < 25) {
            status = 'Normal Weight';
            statusClass = 'normal';
        } else if (bmi < 30) {
            status = 'Overweight';
            statusClass = 'overweight';
        } else {
            status = 'Obese';
            statusClass = 'obese';
        }
        
        $('#bmiStatus').html(`<span class="status-badge ${statusClass}">${status}</span>`);
    }

    // ===== HEALTH METRICS SAVING =====
    
    window.saveHealth = function(type) {
        let value, input, displayElement;
        
        switch(type) {
            case 'height':
                value = parseFloat($('#heightInput').val());
                input = $('#heightInput');
                displayElement = '#heightValue';
                if (value && value >= 100 && value <= 220) {
                    window.currentUserData.height = value;
                    $(displayElement).text(value + ' cm');
                    calculateBMI(value, window.currentUserData.weight);
                    input.val('');
                    showNotification('Height updated successfully!');
                } else {
                    showNotification('Please enter a valid height (100-220 cm)', 'error');
                }
                break;
                
            case 'weight':
                value = parseFloat($('#weightInput').val());
                input = $('#weightInput');
                displayElement = '#weightValue';
                if (value && value >= 30 && value <= 200) {
                    window.currentUserData.weight = value;
                    $(displayElement).text(value + ' kg');
                    calculateBMI(window.currentUserData.height, value);
                    input.val('');
                    showNotification('Weight updated successfully!');
                } else {
                    showNotification('Please enter a valid weight (30-200 kg)', 'error');
                }
                break;
                
            case 'caloriesBurned':
                value = parseFloat($('#caloriesBurnedInput').val());
                if (value && value >= 0) {
                    let currentBurned = parseFloat($('#caloriesBurnedValue').text()) || 0;
                    currentBurned += value;
                    $('#caloriesBurnedValue').text(Math.round(currentBurned));
                    $('#caloriesBurnedInput').val('');
                    updateNetCalories();
                    showNotification('Calories burned logged!');
                } else {
                    showNotification('Please enter a valid calorie value', 'error');
                }
                break;
                
            case 'caloriesIntake':
                value = parseFloat($('#caloriesIntakeInput').val());
                if (value && value >= 0) {
                    let currentIntake = parseFloat($('#caloriesIntakeValue').text()) || 0;
                    currentIntake += value;
                    $('#caloriesIntakeValue').text(Math.round(currentIntake));
                    $('#caloriesIntakeInput').val('');
                    updateNetCalories();
                    showNotification('Calories intake logged!');
                } else {
                    showNotification('Please enter a valid calorie value', 'error');
                }
                break;
                
            case 'water':
                value = parseFloat($('#waterInput').val());
                if (value && value >= 0) {
                    $('#waterValue').text(value + 'L');
                    $('#waterInput').val('');
                    showNotification('Water intake logged!');
                } else {
                    showNotification('Please enter a valid water intake value', 'error');
                }
                break;
                
            case 'sleep':
                value = parseFloat($('#sleepInput').val());
                if (value && value >= 0 && value <= 24) {
                    $('#sleepValue').text(value + ' hrs');
                    $('#sleepInput').val('');
                    showNotification('Sleep duration saved!');
                } else {
                    showNotification('Please enter a valid sleep duration (0-24 hours)', 'error');
                }
                break;
        }
    };

    // ===== UPDATE NET CALORIES =====
    
    function updateNetCalories() {
        const burned = parseFloat($('#caloriesBurnedValue').text()) || 0;
        const intake = parseFloat($('#caloriesIntakeValue').text()) || 0;
        const net = intake - burned;
        
        $('#netCaloriesValue').text(Math.round(net));
        
        let status = '';
        let statusClass = '';
        
        if (net < 0) {
            status = 'Calorie Deficit';
            statusClass = 'deficit';
        } else if (net === 0) {
            status = 'Balanced';
            statusClass = 'balanced';
        } else {
            status = 'Calorie Surplus';
            statusClass = 'surplus';
        }
        
        $('#netCaloriesStatus').html(`<span class="status-badge ${statusClass}">${status}</span>`);
    }

    // ===== WORKOUT LOGGING =====
    
    window.logWorkout = function() {
        const workoutType = $('#workoutTypeSelect').val();
        
        if (workoutType === 'Select workout...') {
            showNotification('Please select a workout type', 'error');
            return;
        }
        
        let currentCount = parseInt($('#workoutCountValue').text()) || 0;
        currentCount++;
        $('#workoutCountValue').text(currentCount);
        
        // Add to workout history
        const timestamp = new Date().toLocaleTimeString();
        const historyHTML = `
            <div class="history-item">
                <div class="history-item-content">
                    <span class="workout-type">${workoutType}</span>
                    <span class="history-time">${timestamp}</span>
                </div>
            </div>
        `;
        
        if ($('#workoutHistoryList').text().includes('No workouts')) {
            $('#workoutHistoryList').html(historyHTML);
        } else {
            $('#workoutHistoryList').prepend(historyHTML);
        }
        
        // Update weekly stats
        updateWeeklyStats();
        
        showNotification(`${workoutType} workout logged!`);
        $('#workoutTypeSelect').val('Select workout...');
    };

    // ===== UPDATE WEEKLY STATS =====
    
    function updateWeeklyStats() {
        const totalWorkouts = parseInt($('#workoutCountValue').text()) || 0;
        const totalBurned = parseInt($('#caloriesBurnedValue').text()) || 0;
        
        $('#weekWorkouts').text(totalWorkouts);
        $('#weekCaloriesBurned').text(totalBurned);
        
        const avgCalories = totalWorkouts > 0 ? Math.round(totalBurned / totalWorkouts) : 0;
        $('#weekAvgCalories').text(avgCalories);
    }

    // ===== EDIT / CHANGE DETAILS =====
    
    window.editDetails = function() {
        if (confirm('You will be redirected to the form to update your details. Continue?')) {
            window.location.href = 'form.html';
        }
    };

    // ===== EXPORT DATA =====
    
    window.exportHealthData = function() {
        const userDetails = window.currentUserData || {};
        const healthMetrics = {
            height: $('#heightValue').text(),
            weight: $('#weightValue').text(),
            bmi: $('#bmiValue').text(),
            caloriesBurned: $('#caloriesBurnedValue').text(),
            caloriesIntake: $('#caloriesIntakeValue').text(),
            netCalories: $('#netCaloriesValue').text(),
            workoutsCompleted: $('#workoutCountValue').text(),
            waterIntake: $('#waterValue').text(),
            sleepDuration: $('#sleepValue').text()
        };

        const exportData = {
            userProfile: userDetails,
            healthMetrics: healthMetrics,
            exportDate: new Date().toLocaleString()
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `fitflow_health_data_${new Date().getTime()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Health data exported successfully!');
    };

    // ===== RESET DATA =====
    
    window.resetAllData = function() {
        if (confirm('Are you sure you want to clear all health metrics? This cannot be undone.')) {
            $('#heightValue').text('--');
            $('#weightValue').text('--');
            $('#bmiValue').text('--');
            $('#bmiStatus').html('');
            $('#caloriesBurnedValue').text('0');
            $('#caloriesIntakeValue').text('0');
            $('#netCaloriesValue').text('0');
            $('#netCaloriesStatus').html('');
            $('#workoutCountValue').text('0');
            $('#waterValue').text('0');
            $('#sleepValue').text('--');
            $('#workoutHistoryList').html('<p>No workouts logged yet. Start your fitness journey today!</p>');
            $('#weekWorkouts').text('0');
            $('#weekCaloriesBurned').text('0');
            $('#weekAvgCalories').text('0');
            
            showNotification('All health metrics cleared!');
        }
    };

    // ===== SHOW NOTIFICATION =====
    
    function showNotification(message, type = 'success') {
        const notificationClass = type === 'error' ? 'error' : 'success';
        const notification = $(`
            <div class="notification ${notificationClass}">
                ${message}
            </div>
        `);
        
        $('body').append(notification);
        
        setTimeout(() => {
            notification.addClass('show');
        }, 10);
        
        setTimeout(() => {
            notification.removeClass('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ===== INITIALIZE PAGE =====
    
    loadUserDetails();

    // Add Edit button to profile section
    const editButton = $(`
        <button class="btn-edit-details" onclick="editDetails()">✏️ Edit / Change Details</button>
    `);
    
    $('.profile-section').append(editButton);
});
