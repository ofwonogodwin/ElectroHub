// Theme toggle functionality
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Load saved theme or default to dark
        this.currentTheme = localStorage.getItem('electrohub-theme') || 'dark';
        this.applyTheme(this.currentTheme);
        
        // Set up event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('electrohub-theme', this.currentTheme);
    }

    applyTheme(theme) {
        const body = document.body;
        const themeIcon = document.getElementById('theme-icon');

        if (theme === 'light') {
            // Add light theme class
            body.classList.add('light-theme');
            body.classList.remove('bg-dark-bg', 'text-white');
            body.classList.add('bg-gray-50', 'text-gray-900');
            
            // Update navigation
            this.updateNavigation('light');
            
            // Update sections and cards
            this.updateElements('light');
            
            // Update icon
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun text-xl';
            }
        } else {
            // Remove light theme class
            body.classList.remove('light-theme');
            body.classList.remove('bg-gray-50', 'text-gray-900');
            body.classList.add('bg-dark-bg', 'text-white');
            
            // Update navigation
            this.updateNavigation('dark');
            
            // Update sections and cards
            this.updateElements('dark');
            
            // Update icon
            if (themeIcon) {
                themeIcon.className = 'fas fa-moon text-xl';
            }
        }
    }

    updateNavigation(theme) {
        const nav = document.querySelector('nav');
        if (nav) {
            if (theme === 'light') {
                nav.classList.remove('bg-dark-secondary/95', 'border-neon-blue/20');
                nav.classList.add('bg-white/95', 'border-gray-200');
            } else {
                nav.classList.remove('bg-white/95', 'border-gray-200');
                nav.classList.add('bg-dark-secondary/95', 'border-neon-blue/20');
            }
        }
    }

    updateElements(theme) {
        // Update cards and sections
        const darkSecondaryElements = document.querySelectorAll('.bg-dark-secondary');
        const darkAccentElements = document.querySelectorAll('.bg-dark-accent');
        const grayElements = document.querySelectorAll('.text-gray-300');
        const whiteTextElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');

        if (theme === 'light') {
            // Update dark secondary elements
            darkSecondaryElements.forEach(element => {
                element.classList.add('bg-white', 'border', 'border-gray-200');
                element.style.backgroundColor = '#ffffff';
            });

            // Update dark accent elements  
            darkAccentElements.forEach(element => {
                element.classList.add('bg-gray-50', 'border', 'border-gray-200');
                element.style.backgroundColor = '#f9fafb';
            });

            // Update text colors
            grayElements.forEach(element => {
                element.style.color = '#6b7280';
            });

            whiteTextElements.forEach(element => {
                if (element.classList.contains('text-white')) {
                    element.style.color = '#1f2937';
                }
            });

        } else {
            // Revert to dark theme
            darkSecondaryElements.forEach(element => {
                element.classList.remove('bg-white', 'border', 'border-gray-200');
                element.style.backgroundColor = '';
            });

            darkAccentElements.forEach(element => {
                element.classList.remove('bg-gray-50', 'border', 'border-gray-200');
                element.style.backgroundColor = '';
            });

            // Revert text colors
            grayElements.forEach(element => {
                element.style.color = '';
            });

            whiteTextElements.forEach(element => {
                element.style.color = '';
            });
        }

        // Update forms and inputs
        this.updateForms(theme);
    }

    updateForms(theme) {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (theme === 'light') {
                input.classList.remove('bg-dark-accent', 'border-gray-600', 'text-white');
                input.classList.add('bg-white', 'border-gray-300', 'text-gray-900');
            } else {
                input.classList.remove('bg-white', 'border-gray-300', 'text-gray-900');
                input.classList.add('bg-dark-accent', 'border-gray-600', 'text-white');
            }
        });
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
