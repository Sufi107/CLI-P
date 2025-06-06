// Configuration settings for the terminal
const CONFIG = {
    // Terminal settings
    TYPING_SPEED: 50,
    MAX_HISTORY: 50,
    
    // Theme settings
    THEMES: ['dark', 'light', 'matrix', 'retro'],
    DEFAULT_THEME: 'dark',
    
    // Font settings
    FONT_SIZES: ['small', 'medium', 'large'],
    DEFAULT_FONT_SIZE: 'medium',
    
    // Personal information
    PERSONAL_INFO: {
        name: 'Mohammed Sufiyan',
        title: 'Cloud Engineer Intern',
        email: 'sufiyan@example.com',
        location: 'India',
        github: 'https://github.com/sufi107',
        linkedin: 'https://linkedin.com/in/mohammed-sufiyan',
        website: 'https://sufiyan.dev'
    },
    
    // Professional information
    PROFESSIONAL_INFO: {
        experience: '1+ years in Cloud Engineering',
        skills: [
            'AWS (EC2, S3, Lambda, CloudFormation)',
            'Docker & Kubernetes',
            'Terraform & Infrastructure as Code',
            'CI/CD Pipelines (Jenkins, GitHub Actions)',
            'Python, JavaScript, Bash',
            'Linux System Administration',
            'Monitoring & Logging (CloudWatch, ELK Stack)'
        ],
        certifications: [
            'AWS Cloud Practitioner (In Progress)',
            'Docker Certified Associate (Planned)'
        ]
    },
    
    // Projects
    PROJECTS: [
        {
            name: 'Cloud Infrastructure Automation',
            description: 'Automated AWS infrastructure deployment using Terraform',
            tech: ['Terraform', 'AWS', 'Python'],
            link: 'https://github.com/sufi107/cloud-automation'
        },
        {
            name: 'Containerized Web Application',
            description: 'Dockerized MERN stack application with CI/CD pipeline',
            tech: ['Docker', 'Node.js', 'MongoDB', 'GitHub Actions'],
            link: 'https://github.com/sufi107/containerized-app'
        },
        {
            name: 'Terminal Portfolio',
            description: 'Interactive terminal-style portfolio website',
            tech: ['JavaScript', 'CSS3', 'HTML5'],
            link: 'https://github.com/sufi107/terminal-portfolio'
        }
    ],
    
    // Social links
    SOCIAL_LINKS: {
        github: 'https://github.com/sufi107',
        linkedin: 'https://linkedin.com/in/mohammed-sufiyan',
        twitter: 'https://twitter.com/sufiyan_dev',
        email: 'mailto:sufiyan@example.com'
    }
};

// Application state
const State = {
    currentTheme: localStorage.getItem('terminal-theme') || CONFIG.DEFAULT_THEME,
    currentFontSize: localStorage.getItem('terminal-font-size') || CONFIG.DEFAULT_FONT_SIZE,
    commandHistory: JSON.parse(localStorage.getItem('command-history')) || [],
    isFullscreen: false,
    lastCommand: '',
    sessionStartTime: new Date()
};

// Export for global access
window.CONFIG = CONFIG;
window.State = State;