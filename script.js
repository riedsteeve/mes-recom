document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const body = document.body;

    // Check for saved theme in localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);

    function toggleTheme() {
        let currentTheme = body.getAttribute('data-theme');
        let newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggleIcon(newTheme);
    }

    function updateThemeToggleIcon(theme) {
        const iconClass = theme === 'light' ? 'fa-moon' : 'fa-sun';
        themeToggle.querySelector('i').className = `fas ${iconClass}`;
        themeToggleMobile.querySelector('i').className = `fas ${iconClass}`;
    }

    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);


    // 2. Dynamic Greeting in Hero Section
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting;

        if (hour < 12) {
            greeting = "Bonjour, explorateur tech !";
        } else if (hour < 18) {
            greeting = "Bon après-midi, passionné de tech !";
        } else {
            greeting = "Bonsoir, amateur de gadgets !";
        }
        greetingElement.textContent = greeting;
    }

    // 3. Smooth Scroll for Navigation & Active Links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function activateNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for fixed navbar
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // Add scroll event listener to activate nav links
    window.addEventListener('scroll', activateNavLink);

    // Smooth scroll for nav links and hero button
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            scrollToSection(targetId);

            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    });

    // Global function for scrolling to a section (used by hero button and footer)
    window.scrollToSection = function(id) {
        const targetSection = document.getElementById(id);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Adjust offset as needed
                behavior: 'smooth'
            });
        }
    };


    // 4. Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times'; // Change to 'x' icon
        } else {
            icon.className = 'fas fa-bars'; // Change back to hamburger icon
        }
    });

    // 5. Product Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productsGrid = document.getElementById('productsGrid');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex'; // Show card
                } else {
                    card.style.display = 'none'; // Hide card
                }
            });
        });
    });

    // 6. Back to Top Button
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling down 300px
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 7. Dynamic Year in Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});


 document.addEventListener('DOMContentLoaded', function() {
    const greetingElement = document.getElementById('greeting');
    const now = new Date();
    const hour = now.getHours();
    let greetingMessage = "";

    if (hour >= 5 && hour < 12) {
        greetingMessage = "Bonjour !";
    } else if (hour >= 12 && hour < 18) {
        greetingMessage = "Bon après-midi !";
    } else {
        greetingMessage = "Bonsoir !";
    }
    greetingElement.textContent = greetingMessage;
});


// Dynamic Greeting for Hero Section
document.addEventListener('DOMContentLoaded', function() {
    const greetingElement = document.getElementById('greeting');
    const now = new Date();
    const hour = now.getHours();
    let greetingMessage = "";

    if (hour >= 5 && hour < 12) {
        greetingMessage = "Bonjour !";
    } else if (hour >= 12 && hour < 18) {
        greetingMessage = "Bon après-midi !";
    } else {
        greetingMessage = "Bonsoir !";
    }
    greetingElement.textContent = greetingMessage + " Prêt à découvrir les meilleures innovations ?";
});

// Update current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Product Search Functionality (example, requires more robust implementation)
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('productSearch');
    const productsGrid = document.getElementById('productsGrid');
    const productCards = productsGrid.querySelectorAll('.product-card');

    searchInput.addEventListener('keyup', function() {
        const searchTerm = searchInput.value.toLowerCase();
        productCards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const description = card.querySelector('.product-description').textContent.toLowerCase();
            const features = card.querySelector('.product-features').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm) || features.includes(searchTerm)) {
                card.style.display = ''; // Show the card
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
    });
});

// Assuming you already have filter buttons working, you might need to adjust their data-filter values
// to match the new categories like 'gaming', 'smart-home', 'laptops'.