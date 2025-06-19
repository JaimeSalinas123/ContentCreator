document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('themeToggle')) {
        const toggleHTML = `
            <button id="themeToggle" class="nav-item">
                <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path id="moonIcon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    <path id="sunIcon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" style="display: none;" />
                </svg>
                <span id="themeText">Modo Oscuro</span>
            </button>
        `;
        
        const navRight = document.querySelector('.nav-right');
        if (navRight) {
            navRight.insertAdjacentHTML('beforeend', toggleHTML);
        }
    }

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        applySavedTheme();
    }

    function toggleTheme() {
        document.body.classList.toggle('light-mode');
        updateTheme();
    }

    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
        updateTheme();
    }

    function updateTheme() {
        const isLight = document.body.classList.contains('light-mode');
        
        document.getElementById('moonIcon').style.display = isLight ? 'none' : 'block';
        document.getElementById('sunIcon').style.display = isLight ? 'block' : 'none';
        
        document.getElementById('themeText').textContent = isLight ? 'Modo Claro' : 'Modo Oscuro';

        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }
});