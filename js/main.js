// Main application initialization and coordination
class PortfolioTerminal {
    constructor() {
        this.version = '2.0.0';
        this.author = 'Mohammed Sufiyan';
        this.init();
    }
    
    init() {
        this.setupGlobalErrorHandling();
        this.setupPerformanceMonitoring();
        this.setupAnalytics();
        this.logWelcomeMessage();
    }
    
    setupGlobalErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Terminal Error:', e.error);
            this.showErrorMessage('An unexpected error occurred. Please refresh the page.');
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
            this.showErrorMessage('A network error occurred. Please check your connection.');
        });
    }
    
    setupPerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Terminal loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
        });
    }
    
    setupAnalytics() {
        // Track command usage (privacy-friendly)
        const originalExecuteCommand = terminal?.executeCommand;
        if (originalExecuteCommand) {
            terminal.executeCommand = function(cmd) {
                // Log command usage (no personal data)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'command_executed', {
                        'command_name': cmd,
                        'custom_parameter': 'terminal_interaction'
                    });
                }
                return originalExecuteCommand.call(this, cmd);
            };
        }
    }
    
    showErrorMessage(message) {
        if (terminal) {
            terminal.addLine(`<span class="error">⚠️ ${message}</span>`, "error", 0);
        }
    }
    
    logWelcomeMessage() {
        console.log(`
╭─────────────────────────────────────────────────╮
│  Mohammed Sufiyan - Terminal Portfolio v${this.version}  │
│  Enhanced Interactive Command Line Experience   │
│                                                 │
│  🚀 Features:                                   │
│  • Responsive design                            │
│  • Theme switching                              │
│  • Command suggestions                          │
│  • Command history                              │
│  • Keyboard shortcuts                           │
│                                                 │
│  💡 Type 'help' to get started!                │
╰─────────────────────────────────────────────────╯
        `);
    }
}

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioTerminal();
});

// Utility functions for backward compatibility and global access
function $(elid) {
    return document.getElementById(elid);
}

// Enhanced clipboard functionality
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        if (terminal) {
            terminal.addLine(`<span class="success">✅ Copied to clipboard!</span>`, "success", 0);
        }
        return true;
    } catch (err) {
        console.error('Failed to copy: ', err);
        if (terminal) {
            terminal.addLine(`<span class="error">❌ Failed to copy to clipboard</span>`, "error", 0);
        }
        return false;
    }
}

// Share functionality
async function sharePortfolio() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Mohammed Sufiyan - Cloud Engineer Portfolio',
                text: 'Check out this interactive terminal portfolio!',
                url: window.location.href
            });
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        // Fallback to clipboard
        copyToClipboard(window.location.href);
    }
}

// Export functions for global access
window.copyToClipboard = copyToClipboard;
window.sharePortfolio = sharePortfolio;

// Add some fun console messages
console.log('%c🚀 Welcome to Mohammed Sufiyan\'s Terminal Portfolio!', 'color: #61AFEF; font-size: 16px; font-weight: bold;');
console.log('%c💡 Tip: Try typing "starwars" or "matrix" for some fun!', 'color: #98C379; font-size: 12px;');
console.log('%c🔧 Built with vanilla JavaScript, CSS3, and lots of ☕', 'color: #E5C07B; font-size: 12px;');