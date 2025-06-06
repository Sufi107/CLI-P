// Terminal functionality and command processing
class Terminal {
    constructor() {
        this.before = document.getElementById("before");
        this.command = document.getElementById("typer");
        this.textarea = document.getElementById("texter");
        this.terminal = document.getElementById("terminal");
        this.liner = document.getElementById("liner");
        
        this.commands = [];
        this.git = 0;
        this.pw = false;
        
        this.init();
    }
    
    init() {
        // Initialize terminal
        this.textarea.value = "";
        this.command.innerHTML = this.textarea.value;
        
        // Add event listeners
        window.addEventListener("keydown", (e) => this.handleKeyDown(e));
        
        // Focus textarea
        this.focusInput();
        
        // Show welcome message after loading
        setTimeout(() => {
            this.showWelcomeMessage();
        }, 1000);
    }
    
    showWelcomeMessage() {
        const welcome = [
            '<span class="index">Mohammed Sufiyan - Cloud Engineer Portfolio ©️ 2025</span>',
            "<br>",
            "<div class='ascii-art'>",
            " ██████  ██████  ███    ███ ███    ███  █████  ███    ██ ██████      ██      ██ ███    ██ ███████ ",
            "██      ██    ██ ████  ████ ████  ████ ██   ██ ████   ██ ██   ██     ██      ██ ████   ██ ██      ",
            "██      ██    ██ ██ ████ ██ ██ ████ ██ ███████ ██ ██  ██ ██   ██     ██      ██ ██ ██  ██ █████   ",
            "██      ██    ██ ██  ██  ██ ██  ██  ██ ██   ██ ██  ██ ██ ██   ██     ██      ██ ██  ██ ██ ██      ",
            " ██████  ██████  ██      ██ ██      ██ ██   ██ ██   ████ ██████      ███████ ██ ██   ████ ███████ ",
            "<br>",
            "██████   ██████  ██████  ████████ ███████  ██████  ██      ██  ██████  ",
            "██   ██ ██    ██ ██   ██    ██    ██      ██    ██ ██      ██ ██    ██ ",
            "██████  ██    ██ ██████     ██    █████   ██    ██ ██      ██ ██    ██ ",
            "██      ██    ██ ██   ██    ██    ██      ██    ██ ██      ██ ██    ██ ",
            "██       ██████  ██   ██    ██    ██       ██████  ███████ ██  ██████  ",
            "</div>",
            "<br>",
            '<span class="color2">🚀 Welcome to my Interactive Terminal Portfolio!</span>',
            '<span class="color2">✨ Enhanced with modern features and responsive design</span>',
            '<span class="color2">💡 Type</span> <span class="command">\'help\'</span><span class="color2"> to explore available commands</span>',
            '<span class="info">🔍 Use Tab for command suggestions • 🎨 Toggle theme with the moon icon</span>',
            "<br>"
        ];
        
        this.loopLines(welcome, "", CONFIG.TYPING_SPEED);
    }
    
    handleKeyDown(e) {
        this.focusInput();
        
        // Handle Ctrl+R (reload confirmation)
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            if (confirm("Are you sure you want to reload the terminal?")) {
                location.reload();
            }
            return;
        }
        
        // Handle Ctrl+L (clear)
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            this.executeCommand('clear');
            return;
        }
        
        // Handle Tab (command suggestions)
        if (e.key === 'Tab') {
            e.preventDefault();
            this.handleTabCompletion();
            return;
        }
        
        // Handle Enter (execute command)
        if (e.key === 'Enter') {
            e.preventDefault();
            this.executeCurrentCommand();
            return;
        }
        
        // Handle Arrow Up (previous command)
        if (e.key === 'ArrowUp' && this.git > 0) {
            e.preventDefault();
            this.git--;
            this.setCurrentCommand(this.commands[this.git] || "");
            return;
        }
        
        // Handle Arrow Down (next command)
        if (e.key === 'ArrowDown' && this.git < this.commands.length) {
            e.preventDefault();
            this.git++;
            this.setCurrentCommand(this.commands[this.git] || "");
            return;
        }
        
        // Handle Escape (clear suggestions)
        if (e.key === 'Escape') {
            this.hideSuggestions();
            return;
        }
    }
    
    handleTabCompletion() {
        const currentInput = this.textarea.value.trim();
        const suggestions = getCommandSuggestions(currentInput);
        
        if (suggestions.length === 1) {
            // Auto-complete if only one suggestion
            this.setCurrentCommand(suggestions[0]);
            this.hideSuggestions();
        } else if (suggestions.length > 1) {
            // Show suggestions
            this.showSuggestions(suggestions);
        }
    }
    
    showSuggestions(suggestions) {
        const suggestionsContainer = document.getElementById('suggestions');
        suggestionsContainer.innerHTML = '';
        
        suggestions.forEach((suggestion, index) => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.textContent = suggestion;
            item.onclick = () => {
                this.setCurrentCommand(suggestion);
                this.hideSuggestions();
            };
            suggestionsContainer.appendChild(item);
        });
        
        suggestionsContainer.classList.add('show');
    }
    
    hideSuggestions() {
        const suggestionsContainer = document.getElementById('suggestions');
        suggestionsContainer.classList.remove('show');
    }
    
    setCurrentCommand(cmd) {
        this.textarea.value = cmd;
        this.command.innerHTML = cmd;
        // Move cursor to end
        this.textarea.setSelectionRange(cmd.length, cmd.length);
    }
    
    executeCurrentCommand() {
        const cmd = this.command.innerHTML.trim();
        
        if (cmd) {
            // Add to history
            this.commands.push(cmd);
            if (this.commands.length > CONFIG.MAX_HISTORY) {
                this.commands.shift();
            }
            this.git = this.commands.length;
            
            // Save to localStorage
            State.commandHistory = this.commands;
            localStorage.setItem('command-history', JSON.stringify(this.commands));
            
            // Display command
            this.addLine(`<span id="prompt">(guest@sufiyan.dev) - $</span> <span class='previous-command'>${cmd}</span>`, "no-animation", 0);
            
            // Execute command
            this.executeCommand(cmd.toLowerCase());
        }
        
        // Clear input
        this.command.innerHTML = "";
        this.textarea.value = "";
        this.hideSuggestions();
    }
    
    executeCommand(cmd) {
        if (COMMANDS[cmd]) {
            const output = COMMANDS[cmd].execute();
            this.loopLines(output, "color2 margin", CONFIG.TYPING_SPEED);
        } else {
            // Check for partial matches or suggestions
            const suggestions = getCommandSuggestions(cmd);
            if (suggestions.length > 0) {
                const output = [
                    `<span class="error">Command '${cmd}' not found.</span>`,
                    `<span class="info">Did you mean: ${suggestions.slice(0, 3).map(s => `<span class="command">${s}</span>`).join(', ')}?</span>`,
                    `<span class="info">Type <span class="command">help</span> for available commands.</span>`
                ];
                this.loopLines(output, "error", 100);
            } else {
                this.addLine(`<span class="error">Command '${cmd}' not found. Type <span class="command">help</span> for available commands.</span>`, "error", 100);
            }
        }
    }
    
    addLine(text, style, time) {
        const processedText = this.processText(text);
        
        setTimeout(() => {
            const next = document.createElement("p");
            next.innerHTML = processedText;
            next.className = style;
            
            this.before.parentNode.insertBefore(next, this.before);
            this.scrollToBottom();
        }, time);
    }
    
    loopLines(lines, style, time) {
        lines.forEach((line, index) => {
            this.addLine(line, style, index * time);
        });
    }
    
    processText(text) {
        // Convert spaces to non-breaking spaces for proper formatting
        let processed = "";
        for (let i = 0; i < text.length; i++) {
            if (text.charAt(i) === " " && text.charAt(i + 1) === " ") {
                processed += "&nbsp;&nbsp;";
                i++;
            } else {
                processed += text.charAt(i);
            }
        }
        return processed;
    }
    
    scrollToBottom() {
        window.scrollTo(0, document.body.scrollHeight);
    }
    
    focusInput() {
        this.textarea.focus();
    }
    
    typeIt(from, e) {
        e = e || window.event;
        const tw = from.value;
        if (!this.pw) {
            this.command.innerHTML = this.nl2br(tw);
        }
        
        // Show suggestions as user types
        if (tw.length > 0) {
            const suggestions = getCommandSuggestions(tw);
            if (suggestions.length > 0 && tw.length > 1) {
                this.showSuggestions(suggestions);
            } else {
                this.hideSuggestions();
            }
        } else {
            this.hideSuggestions();
        }
    }
    
    nl2br(txt) {
        return txt.replace(/\n/g, '');
    }
}

// Initialize terminal when DOM is loaded
let terminal;
document.addEventListener('DOMContentLoaded', () => {
    terminal = new Terminal();
});

// Global functions for backward compatibility
function focusInput() {
    if (terminal) {
        terminal.focusInput();
    }
}

function typeIt(from, event) {
    if (terminal) {
        terminal.typeIt(from, event);
    }
}

function handleKeyDown(from, event) {
    if (terminal) {
        terminal.handleKeyDown(event);
    }
}