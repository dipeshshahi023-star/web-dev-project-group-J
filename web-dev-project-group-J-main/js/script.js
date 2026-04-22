$(document).ready(function() {
    // ===== COOKIES POPUP LOGIC =====
    
    // Check if user has already accepted/declined cookies
    function checkCookieConsent() {
        const cookieConsent = localStorage.getItem('fitflow_cookie_consent');
        
        // If no consent stored, show the popup
        if (!cookieConsent) {
            $('#cookiePopup').addClass('show');
        }
    }
    
    // Accept Cookies Button
    $('#acceptCookies').click(function() {
        localStorage.setItem('fitflow_cookie_consent', 'accepted');
        $('#cookiePopup').fadeOut(500, function() {
            $(this).removeClass('show');
        });
        console.log('Cookies accepted!');
    });
    
    // Decline Cookies Button
    $('#declineCookies').click(function() {
        localStorage.setItem('fitflow_cookie_consent', 'declined');
        $('#cookiePopup').fadeOut(500, function() {
            $(this).removeClass('show');
        });
        console.log('Cookies declined!');
    });
    
    // Show cookie popup on page load if first visit
    checkCookieConsent();

    // ===== VIEW ALL COMPLEMENTARY EXERCISES =====
    // Changed to link in HTML, toggle functionality removed
    // Users are now redirected to programs.html for all programs
    
    // ===== SMOOTH SCROLLING FOR NAVIGATION =====
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        
        const target = $(this).attr('href');
        if ($(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 80
            }, 800, 'swing');
        }
    });
    
    // ===== PROGRAM CARD INTERACTIVE EFFECTS =====
    $('.program-card').each(function(index) {
        $(this).on('mouseenter', function() {
            $(this).find('.card-icon').animate({ fontSize: '4rem' }, 300);
        });
        
        $(this).on('mouseleave', function() {
            $(this).find('.card-icon').animate({ fontSize: '3rem' }, 300);
        });
    });
    
    // ===== GET STARTED BUTTON =====
    $('.btn-start').click(function() {
        alert('🎉 Welcome to FitFlow! Starting your fitness journey...');
        // You can add navigation to programs section
        $('html, body').animate({
            scrollTop: $('#training').offset().top - 80
        }, 800, 'swing');
    });
    
    // ===== ADD ACTIVE STATE TO NAVIGATION =====
    $(window).scroll(function() {
        const scrollPos = $(window).scrollTop();
        
        // Check which section is in view
        if (scrollPos < 500) {
            // Near top/hero
            $('nav a').removeClass('active');
        }
    });
    
    // ===== BUTTON RIPPLE EFFECT =====
    $('button').on('click', function(e) {
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
    
    // ===== COUNTER ANIMATION (Optional - for future stats) =====
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                $(element).text(Math.floor(target));
                clearInterval(interval);
            } else {
                $(element).text(Math.floor(current));
            }
        }, 10);
    }
    
    // ===== FORM INPUT FOCUS EFFECTS (For future forms) =====
    $('input, textarea').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        $(this).parent().removeClass('focused');
    });
    
    // ===== LOGO CLICK TO SCROLL TO TOP =====
    $('.logo').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'swing');
    });
    
    // ===== LOGIN/MEMBERSHIP CLICK HANDLERS =====
    $('a[href="#membership"]').click(function(e) {
        e.preventDefault();
        alert('🏋️ Upgrade to Premium Membership for exclusive programs and tracking!');
    });
    
    $('a[href="#login"]').click(function(e) {
        e.preventDefault();
        alert('👤 Login feature coming soon!');
    });
    
    // ===== VIDEO BACKGROUND OPTIMIZATION =====
    // Pause video on mobile for better performance
    if (window.innerWidth < 768) {
        $('.hero-video').prop('muted', true);
    }
    
    // Handle video loading
    $('.hero-video').on('loadedmetadata', function() {
        console.log('Background video loaded successfully!');
    }).on('error', function() {
        console.log('Video failed to load. Using fallback background.');
        $('.hero').css('background', 'linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))');
    });
    
    // ===== PAGE LOAD ANIMATION =====
    $('body').fadeIn(500);
    
    // ===== CONSOLE MESSAGE =====
    console.log('%cWelcome to FitFlow!', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
    console.log('%cBuild Your Best Self 💪', 'color: #0099ff; font-size: 16px;');
});
