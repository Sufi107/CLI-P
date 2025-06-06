// URL handler for routing and navigation
class URLHandler {
    constructor() {
        this.init();
    }
    
    init() {
        // Handle URL parameters and routing
        this.handleURLParams();
        this.setupPopState();
    }
    
    handleURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const command = urlParams.get('cmd');
        
        if (command) {
            // Execute command from URL parameter
            setTimeout(() => {
                if (terminal) {
                    terminal.executeCommand(command.toLowerCase());
                }
            }, 2000);
        }
    }
    
    setupPopState() {
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.command) {
                if (terminal) {
                    terminal.executeCommand(event.state.command);
                }
            }
        });
    }
    
    updateURL(command) {
        const newURL = new URL(window.location);
        newURL.searchParams.set('cmd', command);
        history.pushState({ command }, '', newURL);
    }
}

// Initialize URL handler
document.addEventListener('DOMContentLoaded', () => {
    new URLHandler();
});