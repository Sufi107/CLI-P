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
            achievements = [
    "<br>",
    "Azure Fundamentals",
    "   - Issuing Organization: Microsoft",
    "   - Issue Date: May 30, 2024",
    "<br>",
    "Azure AI Fundamentals",
    "   - Issuing Organization: Microsoft",
    "   - Issue Date: December, 2024",
    "<br>",
    "Data Science Methodology",
    "   - Issuing Organization: IBM",
    "   - Issue Date: March, 2025",
    "   - Credential ID: DS0103EN",
    "<br>"
];

clear = [
    "<br>",
    "The terminal has been cleared and is ready for your next command!",
    "<br>"
];

contact = [
    "<br>",
    "Contact Information:",
    "- Email: <a href='mailto:mohsufiyan.107@gmail.com' target='_blank' class='underlined-link'>mohsufiyan.107@gmail.com</a>",
    "- LinkedIn: <a href='https://www.linkedin.com/in/MohammedSufiyan107/' target='_blank' class='underlined-link'>SufiyanMohammed</a>",
    "- X: <a href='https://Instagram.com/msufiyan_107' target='_blank' class='underlined-link'>@msufiyan_107</a>",
    "<br>"
];

education = [
    "<br>",
    "Education:",
    "- Degree: BSc. (Honors) Cloud Computing and Big Data",
    "- University: Reva University",
    "- Graduation Year: 2025",
    "<br>"
];

experience = [
    "<br>",
    "Professional Experience:",
    "- Job Title: Cloud Intern",
    "- Company: Plasmid Innovation Private Limited",
    "- Duration: May 2024 - Present",
    "   - Collaborating with Cloud teams.",
    "   - Implementing automation tools to streamline cloud deployments.",
    "<br>"
];

header = [
    '<span class="index">Mohammed Sufiyan. All rights reserved ©️ 2025.</span>',
    "<br>",
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
    "<br>",
    '<span class="color2">Welcome to Command Line based Portfolio; Your Interactive Web Terminal Experience.</span>',
    '<span class="color2">Explore the capabilities of this portfolio terminal. Type</span> <span class="command">\'help\'</span><span class="color2"> for a list of available commands.</span>',
    "<br>"
];

help = [
    "<br>",
    "Available Commands:",
    "- achievements: Highlight notable achievements, awards, or certifications.",
    "- clear: Clears the terminal.",
    "- contact: Display contact information for easy communication.",
    "- education: Provide details about educational background.",
    "- experience: Share information about professional work experience.",
    "- help: Display a help menu with available commands.",
    "- header: Display the header information with the Command Line based Portfolio banner.",
    "- projects: List coding projects with descriptions and links.",
    "- resume: Display or link to a downloadable resume.",
    "- skills: Showcase technical skills, programming languages, and tools.",
    "- social: Show links to social media profiles.",
    "- whoami: Display personal information and a brief introduction.",
    "<br>"
];

projects = [
    "<br>",
    "Projects:",
    "1. Command Line based Portfolio",
    "   - A sleek terminal-based portfolio styled with the one dark theme.",
    "   - Link: <a href='https://github.com/Sufi107/CLI-P' target='_blank' class='underlined-link'>GitHub</a>",
    "2. Todo List",
    "   - A serverless todo list application built with React and Firebase.",
    "   - Link: <a href='https://github.com/Sufi107/TODO-LIST' target='_blank' class='underlined-link'>GitHub</a>",
    "3. Face Rekognition",
    "   - A face recognition application using Python and OpenCV.",
    "   - Link: <a href='https://github.com/Sufi107/face-rekognition-main' target='_blank' class='underlined-link'>GitHub</a>",
    "<br>"
];


resume = [
    "<br>",
    "Download my resume:",
    "- Link: <a href='https://drive.google.com/file/d/1MDQoVsa5yeZ5Ne5U5SAYhKc2FOdM869D/view?usp=drivesdk' target='_blank' class='underlined-link'>Download Resume</a>",
    "<br>"
];


skills = [
    "<br>",
    "Technical Skills:",
    "- Programming Languages: JavaScript, Python, HTML, CSS, etc.",
    "- Web Technologies: HTML, CSS, React, Node.js, etc.",
    "- Tools: Git, VSCode, Docker, etc.",
    "<br>"
];

social = [
    "<br>",
    "Connect with me on social media:",
    "- Discord: <a href='https://discord.com/users/1172427603513196565' target='_blank' class='underlined-link'>@scaar0_25044</a>",
    "- GitHub: <a href='https://github.com/Sufi107/' target='_blank' class='underlined-link'>@Sufi107</a>",
    "- Instagram: <a href='https://www.instagram.com/msufiyan_107/' target='_blank' class='underlined-link'>@msufiyan_107</a>",
    "- LinkedIn: <a href='https://www.linkedin.com/in/MohammedSufiyan107/' target='_blank' class='underlined-link'>in/MohammedSufiyan107</a>",
    "<br>"
];


whoami = [
    "<br>",
    "Welcome to CLI based Portfolio.",
    "I'm Mohammed Sufiyan, a passionate Cloud Specialist.",
    "This is my interactive terminal-based portfolio.",
    "<br>"
];

// Secret Commands
starwars = [
    "<br>",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⠀⢀⣤⣤⣤⣤⣤⣤⣤⠀⠀⠀⠀⢠⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣼⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣟⠛⠛⠛⠛⠛⣿⣿⣿⣿⡟⠛⠛⠛⠛⠛⢠⣿⣿⣿⣿⠿⣿⣿⣿⣿⡀⠀⠀⢸⣿⣿⣿⣿⡏⠉⠉⢉⣿⣿⣿⣿⡇⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣷⡀⠀⠀⠀⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⣾⣿⣿⣿⡟⠀⢻⣿⣿⣿⣧⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀⠀⠀⠀⠀",
    "⣤⣤⣤⣤⣤⣤⣤⣤⣤⣬⣿⣿⣿⣿⣿⣷⠀⠀⠀⣿⣿⣿⣿⡇⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣤⣤⣤⣤⣤⣤",
    "⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⣿⣿⣿⣿⡇⠀⠀⠀⢀⣿⣿⣿⣿⡿⠿⠿⠿⠿⣿⣿⣿⣿⡀⢸⣿⣿⣿⣿⡇⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿",
    "⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠟⠛⠁⠀⠀⠀⠀⠿⠿⠿⠿⠇⠀⠀⠀⠸⠿⠿⠿⠟⠀⠀⠀⠀⠀⠻⠿⠿⠿⠇⠸⠿⠿⠿⠿⠇⠀⠀⠙⠛⠿⠿⠿⠿⠿⠿⠿⠿",
    "⢻⣿⣿⣿⣿⡄⢠⣿⣿⣿⣿⣿⡆⠀⣾⣿⣿⣿⡟⠀⢀⣾⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣦⣄⠀⠀⠀⠀⣠⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿",
    "⠈⣿⣿⣿⣿⣷⣼⣿⣿⣿⣿⣿⣿⣸⣿⣿⣿⣿⠁⠀⣼⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⣿⣿⣿⣿⣿⠿⠿⢿⣿⣿⣿⣿⣇⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿",
    "⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⢠⣿⣿⣿⣿⠏⢿⣿⣿⣿⣇⠀⠀⠀⣿⣿⣿⣿⣿⣀⣀⣀⣼⣿⣿⣿⡟⠀⠀⢹⣿⣿⣿⣿⣿⣄⠀⠀⠀⠀⠀",
    "⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⣾⣿⣿⣿⣟⣀⣸⣿⣿⣿⣿⡀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠙⢿⣿⣿⣿⣿⣧⠀⠀⠀⠀",
    "⠀⠀⠘⣿⣿⣿⣿⣿⣿⠋⣿⣿⣿⣿⣿⣿⠇⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣶⣶⣶⣶⣶⣶⣾⣿⣿⣿⣿⣿⠇⠀⠀⠀",
    "⠀⠀⠀⢻⣿⣿⣿⣿⡏⠀⢹⣿⣿⣿⣿⡟⠀⢀⣿⣿⣿⣿⡟⠛⠛⠛⠛⣿⣿⣿⣿⡆⠀⣿⣿⣿⣿⣿⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀⠀⠀⠀",
    "⠀⠀⠀⠈⠉⠉⠉⠉⠀⠀⠀⠉⠉⠉⠉⠁⠀⠈⠉⠉⠉⠉⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠀⠉⠉⠉⠉⠉⠀⠀⠀⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀  ",
    "<br>"
];

jokes = [
    "<br>",
    "1. What do you call a fake noodle? An Impasta.",
    "2. What do you call a cow during an earthquake? A milkshake.",
    "3. What do you call a cow with five legs? A cow.",
    "<br>"
];

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