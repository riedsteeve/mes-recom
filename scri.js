document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const productSearch = document.getElementById('productSearch');
    const productsGrid = document.getElementById('productsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const backToTopButton = document.getElementById('backToTop');
    const currentYearSpan = document.getElementById('current-year');
    const greetingElement = document.getElementById('greeting');

    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Dynamic Greeting
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting;
        if (hour < 12) {
            greeting = "Bonjour !";
        } else if (hour < 18) {
            greeting = "Bon après-midi !";
        } else {
            greeting = "Bonsoir !";
        }
        greetingElement.textContent = greeting;
    }

    // Theme Toggle
    const applyTheme = (theme) => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const icon = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        if (themeToggle) themeToggle.querySelector('i').className = icon;
        if (themeToggleMobile) themeToggleMobile.querySelector('i').className = icon;
    };

    const toggleTheme = () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    };

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.querySelector('i').classList.toggle('fa-bars');
            navToggle.querySelector('i').classList.toggle('fa-times');
        });

        // Close menu when a link is clicked (for smooth scroll)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.querySelector('i').classList.remove('fa-times');
                    navToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // Smooth Scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Product Search and Filter Logic
    const filterProducts = () => {
        const searchTerm = productSearch ? productSearch.value.toLowerCase() : '';
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';

        if (productsGrid) {
            Array.from(productsGrid.children).forEach(card => {
                const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
                const description = card.querySelector('.product-description')?.textContent.toLowerCase() || '';
                const category = card.dataset.category || '';

                const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
                const matchesFilter = activeFilter === 'all' || category === activeFilter;

                if (matchesSearch && matchesFilter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    };

    if (productSearch) {
        productSearch.addEventListener('keyup', filterProducts);
    }

    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterProducts();
            });
        });
    }

    // Back to Top Button visibility
    const toggleBackToTop = () => {
        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }
    };

    window.addEventListener('scroll', toggleBackToTop);

    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initial filter on page load (useful if filters are pre-selected or search bar has content)
    filterProducts();
});

// Function for buttons that scroll to a specific section (e.g., "See my discoveries")
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}