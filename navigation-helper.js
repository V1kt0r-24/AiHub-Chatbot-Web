// Domain connectivity checker
function checkDomainConnectivity() {
    const status = {
        currentDomain: window.location.hostname,
        isCustomDomain: !window.location.hostname.includes('azurestaticapps.net'),
        targetUrls: {
            chatbot: buildUrl(CONFIG.CHATBOT_SUBDOMAIN),
            hub: buildUrl(CONFIG.HUB_SUBDOMAIN)
        }
    };
    
    console.log('Domain Status:', status);
    return status;
}

// Test navigation without actually navigating
function testNavigation(appName) {
    const url = appName === 'chatbot' ? 
        buildUrl(CONFIG.CHATBOT_SUBDOMAIN) : 
        buildUrl(CONFIG.HUB_SUBDOMAIN);
    
    console.log(`Would navigate to: ${url}`);
    
    // You can test if URL is reachable
    fetch(url, { method: 'HEAD', mode: 'no-cors' })
        .then(() => console.log(`✅ ${url} is reachable`))
        .catch(err => console.log(`❌ ${url} may not be reachable:`, err));
}

// Auto-detect environment and show appropriate UI
function initializeNavigation() {
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname.includes('azurestaticapps.net');
    
    if (isDevelopment) {
        console.log('🚧 Development mode - using fallback URLs');
        // You might want to show a notice to users
        const notice = document.createElement('div');
        notice.style.cssText = `
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 10px;
            margin: 10px;
            border-radius: 5px;
            font-size: 14px;
        `;
        notice.innerHTML = '⚠️ Development mode: External links will open in new tabs';
        document.body.insertBefore(notice, document.body.firstChild);
    }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', initializeNavigation);