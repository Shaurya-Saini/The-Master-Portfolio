// Projects data embedded directly to avoid CORS issues
const projectsData = [
    {
        "id": 1,
        "type": "project",
        "title": "Email Highlighter",
        "subtitle": "ML Powered Chrome Extension",
        "description": "Built a chrome extension to extract all mails in collage account and classify and highlight them using TensorFlowJS and an text classifier trained on self labeled dataset extracted using . Achieved over 88% accuracy on new data on the collage email.",
        "image": "assets/projects/email.png",
        "githubLink": "https://github.com/Shaurya-Saini/Email_Highlighter",
        // "deploymentLink": "https://your-ecommerce-demo.vercel.app",
        "techStack": ["Tensorflow", "TensorflowJS", "JavaScript", "Chrome Extension", "HTML", "CSS"]
    },
    {
        "id": 2,
        "type": "project",
        "title": "PrivGuard",
        "subtitle": "Digital Privacy App",
        "description": "Build a flutter application that is designed to help users analyze and protect their digitalprivacy using a locally stored TensorFlow lite named entity recognition model for scanning text based posts and also has encrypted local storage for securely store all media types. Now hosted as an open source project on IEEE-VIT’s GitHub page.",
        "image": "assets/projects/priv.png",
        "githubLink": "https://github.com/IEEE-VIT/priv-guard",
        // "deploymentLink": "https://your-chat-app.vercel.app",
        "techStack": ["Flutter", "TensorFlow", "TensorFlow Lite", "LocalStorage", "Encryption"]
    },
    {
        "id": 3,
        "type": "project",
        "title": "AirMouse",
        "subtitle": "Dual-Mode Wireless Human-Computer Interface",
        "description": "The Air Mouse is a wireless, dual-mode input device that enables cursor control, left/right clicks, scrolling, zooming, volume control, and tab/application switching through motion tracking and hand gesture recognition. It combines embedded sensor data and real-time computer vision for seamless human-computer interaction.",
        "image": "assets/projects/air.jpg",
        "githubLink": "https://github.com/Shaurya-Saini/AirMouse",
        // "deploymentLink": "https://your-dashboard.vercel.app",
        "techStack": ["ESP32", "MPU6050", "BLE", "OpenCV", "Flex Sensors", "MediaPipe"]
    },
    {
        "id": 4,
        "type": "publication",
        "title": "WEB SCRAPING: Extracting Data for AI and Beyond",
        "subtitle": "Published on Medium on March 2024",
        "description": "An article on web scraping in Python covering essential libraries like BeautifulSoup, Requests, and Selenium, along with data extraction techniques, advanced tools such as headers, sessions, and proxies, best practices, and ethical considerations. Published under Techloop, the official publication of IEEE VIT.",
        "image": "assets/projects/web.png",
        "githubLink": "",
        "deploymentLink": "https://medium.com/techloop/web-scraping-extracting-data-for-ai-and-beyond-without-getting-arrested-497058f9aa1f"
    },
    {
        "id": 6,
        "type": "project",
        "title": "Indian IT Companies: Revenue and Stock Price Analysis",
        "subtitle": "Data Analysis and Visualization",
        "description": "This project analyzes the relationship between revenue growth and stock price movements for five Indian IT companies—TCS, Infosys, Wipro, Persistent Systems, and Mphasis—from 2014 to 2024. It explores how revenue growth impacts stock performance and the influence of global events (e.g., COVID-19, economic slowdowns) on IT stock prices.",
        "image": "assets/projects/companies.png",
        "githubLink": "https://github.com/Shaurya-Saini/Indian-IT-Revenue-Stock-Analysis",
        // "deploymentLink": "https://play.google.com/store/apps/details?id=com.yourapp.fitness",
        "techStack": ["Pandas", "Numpy", "Matplotlib", "Seaborn", "Jupyter Notebook"]
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