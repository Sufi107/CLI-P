// Command definitions and implementations
const COMMANDS = {
    help: {
        description: 'Show available commands',
        category: 'system',
        execute: () => {
            const categories = getCommandCategories();
            const output = [
                '<span class="command">📋 Available Commands:</span>',
                '<br>'
            ];
            
            Object.entries(categories).forEach(([category, commands]) => {
                const categoryNames = {
                    personal: "👤 Personal Information",
                    professional: "💼 Professional",
                    projects: "🚀 Projects", 
                    system: "⚙️ System",
                    fun: "🎮 Fun"
                };
                
                output.push(`<span class="color2">${categoryNames[category]}:</span>`);
                commands.forEach(cmd => {
                    output.push(`  <span class="command">${cmd}</span> - ${COMMANDS[cmd].description}`);
                });
                output.push('<br>');
            });
            
            output.push('<span class="info">💡 Use Tab for auto-completion • ↑↓ for command history</span>');
            return output;
        }
    },
    
    about: {
        description: 'Learn about Mohammed Sufiyan',
        category: 'personal',
        execute: () => [
            '<span class="command">👋 About Mohammed Sufiyan</span>',
            '<br>',
            `<span class="color2">Name:</span> ${CONFIG.PERSONAL_INFO.name}`,
            `<span class="color2">Title:</span> ${CONFIG.PERSONAL_INFO.title}`,
            `<span class="color2">Location:</span> ${CONFIG.PERSONAL_INFO.location}`,
            '<br>',
            '<span class="color2">Bio:</span>',
            'Passionate Cloud Engineer Intern with expertise in AWS, Docker, and Infrastructure as Code.',
            'Currently focused on building scalable cloud solutions and automating deployment pipelines.',
            'Always eager to learn new technologies and contribute to innovative projects.',
            '<br>',
            '<span class="info">💡 Type <span class="command">skills</span> to see technical expertise</span>'
        ]
    },
    
    skills: {
        description: 'View technical skills and expertise',
        category: 'professional',
        execute: () => {
            const output = [
                '<span class="command">🛠️ Technical Skills</span>',
                '<br>',
                '<span class="color2">Cloud Platforms:</span>'
            ];
            
            CONFIG.PROFESSIONAL_INFO.skills.forEach(skill => {
                output.push(`  • ${skill}`);
            });
            
            output.push('<br>', '<span class="color2">Certifications:</span>');
            CONFIG.PROFESSIONAL_INFO.certifications.forEach(cert => {
                output.push(`  • ${cert}`);
            });
            
            return output;
        }
    },
    
    projects: {
        description: 'Explore my projects',
        category: 'projects',
        execute: () => {
            const output = [
                '<span class="command">🚀 Featured Projects</span>',
                '<br>'
            ];
            
            CONFIG.PROJECTS.forEach((project, index) => {
                output.push(
                    `<span class="color2">${index + 1}. ${project.name}</span>`,
                    `   ${project.description}`,
                    `   <span class="info">Tech:</span> ${project.tech.join(', ')}`,
                    `   <span class="underlined-link" onclick="window.open('${project.link}', '_blank')">🔗 View Project</span>`,
                    '<br>'
                );
            });
            
            return output;
        }
    },
    
    contact: {
        description: 'Get in touch with me',
        category: 'personal',
        execute: () => [
            '<span class="command">📧 Contact Information</span>',
            '<br>',
            `<span class="underlined-link" onclick="window.open('${CONFIG.SOCIAL_LINKS.email}')">📧 Email</span>`,
            `<span class="underlined-link" onclick="window.open('${CONFIG.SOCIAL_LINKS.linkedin}', '_blank')">💼 LinkedIn</span>`,
            `<span class="underlined-link" onclick="window.open('${CONFIG.SOCIAL_LINKS.github}', '_blank')">🐙 GitHub</span>`,
            `<span class="underlined-link" onclick="window.open('${CONFIG.SOCIAL_LINKS.twitter}', '_blank')">🐦 Twitter</span>`,
            '<br>',
            '<span class="info">Feel free to reach out for collaboration opportunities!</span>'
        ]
    },
    
    resume: {
        description: 'Download my resume',
        category: 'professional',
        execute: () => [
            '<span class="command">📄 Resume</span>',
            '<br>',
            '<span class="color2">Experience:</span> ' + CONFIG.PROFESSIONAL_INFO.experience,
            '<br>',
            '<span class="info">📥 Resume download will be available soon!</span>',
            '<span class="info">For now, please connect via LinkedIn or email.</span>'
        ]
    },
    
    clear: {
        description: 'Clear the terminal screen',
        category: 'system',
        execute: () => {
            setTimeout(() => {
                const terminal = document.getElementById("terminal");
                terminal.innerHTML = '<a id="before"></a>';
            }, 1);
            return [];
        }
    },
    
    history: {
        description: 'Show command history',
        category: 'system',
        execute: () => {
            const output = ['<span class="command">📜 Command History</span>', '<br>'];
            
            if (State.commandHistory.length === 0) {
                output.push('<span class="info">No commands in history yet.</span>');
            } else {
                State.commandHistory.slice(-10).forEach((cmd, index) => {
                    output.push(`${State.commandHistory.length - 10 + index + 1}. ${cmd}`);
                });
            }
            
            return output;
        }
    },
    
    theme: {
        description: 'Change terminal theme',
        category: 'system',
        execute: () => {
            toggleTheme();
            return [];
        }
    },
    
    date: {
        description: 'Show current date and time',
        category: 'system',
        execute: () => [
            '<span class="command">📅 Current Date & Time</span>',
            '<br>',
            new Date().toString(),
            '<br>',
            `<span class="info">Session started: ${State.sessionStartTime.toLocaleString()}</span>`
        ]
    },
    
    whoami: {
        description: 'Display current user',
        category: 'system',
        execute: () => [
            'guest@sufiyan.dev',
            '<span class="info">You are browsing Mohammed Sufiyan\'s portfolio terminal</span>'
        ]
    },
    
    // Fun commands
    matrix: {
        description: 'Enter the Matrix',
        category: 'fun',
        execute: () => {
            // Add matrix effect
            document.body.style.background = '#000';
            document.body.style.color = '#0f0';
            
            setTimeout(() => {
                document.body.style.background = '';
                document.body.style.color = '';
            }, 5000);
            
            return [
                '<span style="color: #0f0;">Wake up, Neo...</span>',
                '<span style="color: #0f0;">The Matrix has you...</span>',
                '<span style="color: #0f0;">Follow the white rabbit.</span>',
                '<br>',
                '<span class="info">🔴 Matrix mode activated for 5 seconds!</span>'
            ];
        }
    },
    
    starwars: {
        description: 'A long time ago in a galaxy far, far away...',
        category: 'fun',
        execute: () => [
            '<span class="command">🌟 Star Wars ASCII</span>',
            '<br>',
            '    _____ _______       _____  ',
            '   / ____|__   __|/\\   |  __ \\ ',
            '  | (___    | |  /  \\  | |__) |',
            '   \\___ \\   | | / /\\ \\ |  _  / ',
            '   ____) |  | |/ ____ \\| | \\ \\ ',
            '  |_____/   |_/_/    \\_\\_|  \\_\\',
            '<br>',
            '        ____    __    ____  ___      .______      _______.    ',
            '        \\   \\  /  \\  /   / /   \\     |   _  \\    /       |    ',
            '         \\   \\/    \\/   / /  ^  \\    |  |_)  |  |   (----`    ',
            '          \\            / /  /_\\  \\   |      /    \\   \\        ',
            '           \\    /\\    / /  _____  \\  |  |\\  \\----.\\   \\----.',
            '            \\__/  \\__/ /__/     \\__\\ | _| `._____|\\________|',
            '<br>',
            '<span class="info">May the Force be with you! 🚀</span>'
        ]
    },
    
    joke: {
        description: 'Tell a programming joke',
        category: 'fun',
        execute: () => {
            const jokes = [
                "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
                "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
                "Why do Java developers wear glasses? Because they can't C# 👓",
                "What's a programmer's favorite hangout place? Foo Bar! 🍺",
                "Why did the programmer quit his job? He didn't get arrays! 📊"
            ];
            
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            return [
                '<span class="command">😄 Programming Joke</span>',
                '<br>',
                randomJoke,
                '<br>',
                '<span class="info">Type <span class="command">joke</span> for another one!</span>'
            ];
        }
    }
};

// Helper functions
function getCommandCategories() {
    const categories = {};
    
    Object.entries(COMMANDS).forEach(([cmd, info]) => {
        const category = info.category || 'other';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(cmd);
    });
    
    return categories;
}

function getCommandSuggestions(input) {
    if (!input) return [];
    
    return Object.keys(COMMANDS).filter(cmd => 
        cmd.toLowerCase().startsWith(input.toLowerCase())
    ).sort();
}

// Export for global access
window.COMMANDS = COMMANDS;
window.getCommandCategories = getCommandCategories;
window.getCommandSuggestions = getCommandSuggestions;