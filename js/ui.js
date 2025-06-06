// UI enhancements and theme management
class UIManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupTheme();
        this.setupFontSize();
        this.hideLoadingScreen();
        this.setupEventListeners();
    }
    
    setupTheme() {
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', State.currentTheme);
        this.updateThemeIcon();
    }
    
    setupFontSize() {
        // Apply saved font size
        document.body.className = `font-${State.currentFontSize}`;
    }
    
    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 2000);
    }
    
    setupEventListeners() {
        // Click outside to focus input
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#suggestions') && !e.target.closest('a')) {
                if (terminal) {
                    terminal.focusInput();
                }
            }
        });
        
        // Prevent context menu on terminal controls
        document.querySelectorAll('.control').forEach(control => {
            control.addEventListener('contextmenu', (e) => e.preventDefault());
        });
    }
    
    updateThemeIcon() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = State.currentTheme === 'dark' ? '☀️' : '🌙';
            themeToggle.title = `Switch to ${State.currentTheme === 'dark' ? 'light' : 'dark'} theme`;
        }
    }
}

// Theme management
function toggleTheme() {
    const themes = CONFIG.THEMES;
    const currentIndex = themes.indexOf(State.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    
    State.currentTheme = themes[nextIndex];
    document.documentElement.setAttribute('data-theme', State.currentTheme);
    localStorage.setItem('terminal-theme', State.currentTheme);
    
    // Update theme icon
    const uiManager = new UIManager();
    uiManager.updateThemeIcon();
    
    // Show theme change notification
    if (terminal) {
        terminal.addLine(`<span class="success">Theme switched to ${State.currentTheme} mode ✨</span>`, "info", 0);
    }
}

// Font size management
function cycleFontSize() {
    const sizes = CONFIG.FONT_SIZES;
    const currentIndex = sizes.indexOf(State.currentFontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    
    State.currentFontSize = sizes[nextIndex];
    document.body.className = `font-${State.currentFontSize}`;
    localStorage.setItem('terminal-font-size', State.currentFontSize);
    
    // Update button text
    const fontToggle = document.getElementById('font-size-toggle');
    if (fontToggle) {
        const sizeLabels = { small: 'A', medium: 'A', large: 'A' };
        fontToggle.textContent = sizeLabels[State.currentFontSize];
        fontToggle.style.fontSize = State.currentFontSize === 'small' ? '12px' : 
                                   State.currentFontSize === 'medium' ? '14px' : '16px';
    }
    
    // Show font size change notification
    if (terminal) {
        terminal.addLine(`<span class="success">Font size: ${State.currentFontSize} 📝</span>`, "info", 0);
    }
}

// Terminal window controls
function minimizeTerminal() {
    const container = document.getElementById('terminal-container');
    if (container) {
        container.style.transform = 'scale(0.8)';
        container.style.opacity = '0.7';
        
        setTimeout(() => {
            container.style.transform = 'scale(1)';
            container.style.opacity = '1';
        }, 300);
    }
    
    if (terminal) {
        terminal.addLine(`<span class="info">Terminal minimized (just kidding! 😄)</span>`, "info", 0);
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Fullscreen not supported:', err);
            if (terminal) {
                terminal.addLine(`<span class="warning">Fullscreen not supported in this browser 📱</span>`, "warning", 0);
            }
        });
    } else {
        document.exitFullscreen();
    }
    
    State.isFullscreen = !State.isFullscreen;
}

// Help modal management
function showHelpModal() {
    const modal = document.getElementById('help-modal');
    const helpContent = document.getElementById('help-content');
    
    if (modal && helpContent) {
        // Generate help content
        const categories = getCommandCategories();
        let content = '';
        
        Object.entries(categories).forEach(([category, commands]) => {
            const categoryNames = {
                personal: "👤 Personal Information",
                professional: "💼 Professional",
                projects: "🚀 Projects",
                system: "⚙️ System",
                fun: "🎮 Fun"
            };
            
            content += `<h3>${categoryNames[category] || category}</h3>`;
            content += '<ul>';
            commands.forEach(cmd => {
                content += `<li><strong>${cmd}</strong> - ${COMMANDS[cmd].description}</li>`;
            });
            content += '</ul>';
        });
        
        helpContent.innerHTML = content;
        modal.classList.add('show');
    }
}

function closeHelpModal() {
    const modal = document.getElementById('help-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+? or F1 for help
    if ((e.ctrlKey && e.key === '?') || e.key === 'F1') {
        e.preventDefault();
        showHelpModal();
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        closeHelpModal();
    }
    
    // Ctrl+Shift+T for theme toggle
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
    }
});

// Initialize UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UIManager();
});

// Click outside modal to close
document.addEventListener('click', (e) => {
    const modal = document.getElementById('help-modal');
    if (modal && e.target === modal) {
        closeHelpModal();
    }
});

// Export functions for global access
window.toggleTheme = toggleTheme;
window.cycleFontSize = cycleFontSize;
window.minimizeTerminal = minimizeTerminal;
window.toggleFullscreen = toggleFullscreen;
window.showHelpModal = showHelpModal;
window.closeHelpModal = closeHelpModal;