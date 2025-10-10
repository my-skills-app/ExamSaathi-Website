// Platform detection function
function getPlatform() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Windows
    if (/windows phone/i.test(userAgent)) return 'windows-phone';
    if (/win/i.test(userAgent)) return 'windows';
    
    // Android
    if (/android/i.test(userAgent)) return 'android';
    
    // iOS/iPadOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'ios';
    }
    
    // macOS
    if (/Mac/i.test(userAgent)) return 'macos';
    
    // Linux
    if (/Linux/i.test(userAgent)) return 'linux';
    
    // Default
    return 'desktop';
}

// Update download button based on platform
function updateDownloadButton() {
    const button = document.getElementById('platform-button');
    if (!button) return;
    
    const platform = getPlatform();
    const iconMap = {
        'windows': 'windows',
        'macos': 'apple',
        'android': 'android',
        'ios': 'apple',
        'linux': 'linux',
        'windows-phone': 'windows',
        'desktop': 'download'
    };
    
    const textMap = {
        'windows': 'Download for Windows',
        'macos': 'Download for macOS',
        'android': 'Get it on Google Play',
        'ios': 'Download on the App Store',
        'linux': 'Download for Linux',
        'windows-phone': 'Get for Windows Phone',
        'desktop': 'Download Now'
    };
    
    const icon = iconMap[platform] || 'download';
    const text = textMap[platform] || 'Download Now';
    
    button.innerHTML = `<i class="fab fa-${icon}"></i> ${text}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const appGrid = document.getElementById('app-grid');
    const API_URL = 'https://api.asmultiverse.com/get-apps';
    
    // Update download button based on platform
    updateDownloadButton();

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Fetch and display apps
    async function fetchAndDisplayApps() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Network response was not ok.');
            const result = await response.json();

            if (result.success && result.data) {
                appGrid.innerHTML = result.data.map(app => `
                    <div class="app-card">
                        <img src="${app.icon}" alt="${app.title} Icon" class="app-icon">
                        <h3>${app.title}</h3>
                        <p>${app.subtitle}</p>
                        <div class="app-meta">
                            <span><i class="fas fa-star"></i> 5.0</span>
                            <span><i class="fas fa-download"></i> ${app.downloads}</span>
                        </div>
                        <a href="${app.url}" class="view-app-btn" target="_blank">Download</a>
                    </div>
                `).join('');
            } else {
                appGrid.innerHTML = '<p>No apps found.</p>';
            }
        } catch (error) {
            console.error('Failed to fetch apps:', error);
            appGrid.innerHTML = '<p>Error loading apps. Please try again later.</p>';
        }
    }

    fetchAndDisplayApps();
});
