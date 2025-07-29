// Projects data embedded directly to avoid CORS issues
const projectsData = [
    {
        "id": 1,
        "type": "project",
        "title": "E-Commerce Platform",
        "subtitle": "Full-Stack Web Application",
        "description": "A comprehensive e-commerce platform built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Implemented responsive design and optimized for performance.",
        "image": "/placeholder.svg?height=200&width=300&text=E-Commerce+Platform",
        "githubLink": "https://github.com/yourusername/ecommerce-platform",
        "deploymentLink": "https://your-ecommerce-demo.vercel.app",
        "techStack": ["React", "Node.js", "MongoDB", "Express", "Stripe", "JWT", "Tailwind CSS"]
    },
    {
        "id": 2,
        "type": "project",
        "title": "AI Chat Application",
        "subtitle": "Real-time Messaging with AI Integration",
        "description": "An intelligent chat application that integrates AI-powered responses with real-time messaging. Features include group chats, file sharing, emoji reactions, and smart AI assistance for enhanced user experience.",
        "image": "/placeholder.svg?height=200&width=300&text=AI+Chat+App",
        "githubLink": "https://github.com/yourusername/ai-chat-app",
        "deploymentLink": "https://your-chat-app.vercel.app",
        "techStack": ["Next.js", "Socket.io", "OpenAI API", "PostgreSQL", "Prisma", "TypeScript"]
    },
    {
        "id": 3,
        "type": "publication",
        "title": "Machine Learning in Web Development",
        "subtitle": "Published in Tech Journal 2024",
        "description": "An in-depth analysis of how machine learning algorithms can be integrated into modern web development workflows. The paper explores practical implementations, performance considerations, and future trends in ML-powered web applications.",
        "image": "/placeholder.svg?height=200&width=300&text=ML+Research+Paper",
        "githubLink": "",
        "deploymentLink": "https://techjournal.com/ml-web-development-2024"
    },
    {
        "id": 4,
        "type": "project",
        "title": "Data Visualization Dashboard",
        "subtitle": "Interactive Analytics Platform",
        "description": "A powerful data visualization dashboard that transforms complex datasets into interactive charts and graphs. Built with D3.js and React, it provides real-time analytics, customizable widgets, and export functionality for business intelligence.",
        "image": "/placeholder.svg?height=200&width=300&text=Data+Dashboard",
        "githubLink": "https://github.com/yourusername/data-viz-dashboard",
        "deploymentLink": "https://your-dashboard.vercel.app",
        "techStack": ["React", "D3.js", "Python", "FastAPI", "PostgreSQL", "Chart.js"]
    },
    {
        "id": 5,
        "type": "publication",
        "title": "Sustainable Software Architecture",
        "subtitle": "IEEE Conference Proceedings 2024",
        "description": "Research paper focusing on sustainable software development practices and their impact on system performance and environmental footprint. Presents novel approaches to green computing in enterprise applications.",
        "image": "/placeholder.svg?height=200&width=300&text=Sustainable+Architecture",
        "githubLink": "",
        "deploymentLink": "https://ieeexplore.ieee.org/document/sustainable-arch-2024"
    },
    {
        "id": 6,
        "type": "project",
        "title": "Mobile Fitness Tracker",
        "subtitle": "Cross-Platform Mobile Application",
        "description": "A comprehensive fitness tracking application built with React Native. Features workout planning, progress tracking, social challenges, and integration with wearable devices. Includes offline functionality and data synchronization.",
        "image": "/placeholder.svg?height=200&width=300&text=Fitness+Tracker",
        "githubLink": "https://github.com/yourusername/fitness-tracker",
        "deploymentLink": "https://play.google.com/store/apps/details?id=com.yourapp.fitness",
        "techStack": ["React Native", "Firebase", "Redux", "Node.js", "MongoDB", "Push Notifications"]
    }
];

// Initialize projects data
function loadProjectsData() {
    renderCards();
}

// Render cards
function renderCards() {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';

    projectsData.forEach((project, index) => {
        const card = createCard(project, index);
        container.appendChild(card);
    });
}

// Create individual card
function createCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.index = index;

    const techStackHTML = project.type === 'project' && project.techStack ? 
        `<div class="tech-stack">
            ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>` : '';

    const linksHTML = `
        <div class="card-links">
            ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="card-link">GitHub</a>` : ''}
            ${project.deploymentLink ? `<a href="${project.deploymentLink}" target="_blank" class="card-link">${project.type === 'project' ? 'Live Demo' : 'Read Paper'}</a>` : ''}
        </div>
    `;

    card.innerHTML = `
        <div class="card-content">
            <div class="card-header">
                <div>
                    <h3 class="card-title">${project.title}</h3>
                    <p class="card-subtitle">${project.subtitle}</p>
                </div>
            </div>
            <img src="${project.image}" alt="${project.title}" class="card-image">
            <div class="card-description">${project.description}</div>
            ${techStackHTML}
            ${linksHTML}
        </div>
    `;

    return card;
}

// Navigation functions
function returnToMap() {
    localStorage.setItem('returnFromProfile', 'true');
    window.location.href = 'index.html';
}

function showTooltip() {
    document.getElementById('backBtnTooltip').style.display = 'block';
}

function hideTooltip() {
    document.getElementById('backBtnTooltip').style.display = 'none';
}

// Contact Info Modal
function showContactModal() {
    document.getElementById('contactModal').classList.add('active');
}

function hideContactModal() {
    document.getElementById('contactModal').classList.remove('active');
}

// Tooltip for contact
function showContactTooltip() {
    document.getElementById('contactBtnTooltip').style.display = 'block';
}

function hideContactTooltip() {
    document.getElementById('contactBtnTooltip').style.display = 'none';
}

// Tooltip for menu
function showMenuHoverTip() {
    document.getElementById('profileMenuHoverTip').style.display = 'block';
}

function hideMenuHoverTip() {
    document.getElementById('profileMenuHoverTip').style.display = 'none';
}

function toggleMenuDropdown(event) {
    event.stopPropagation();
    const tooltip = document.getElementById('profileMenuTooltip');
    const isActive = tooltip.style.display === 'block';
    tooltip.style.display = isActive ? 'none' : 'block';
}

// Event listeners
window.addEventListener('click', function(e) {
    const modal = document.getElementById('contactModal');
    if (modal && modal.classList.contains('active') && e.target === modal) {
        hideContactModal();
    }
});

window.addEventListener('click', function(e) {
    const tooltip = document.getElementById('profileMenuTooltip');
    if (tooltip && tooltip.style.display === 'block' && !tooltip.contains(e.target)) {
        tooltip.style.display = 'none';
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadProjectsData);