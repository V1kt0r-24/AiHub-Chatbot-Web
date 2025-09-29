// Configuration file for custom domain navigation
const CONFIG = {
    // Replace 'yourdomain.com' with your actual domain
    BASE_DOMAIN: 'yourdomain.com',
    CHATBOT_SUBDOMAIN: 'chatbot',
    HUB_SUBDOMAIN: 'hub',
    
    // Fallback URLs for development/testing
    FALLBACK_URLS: {
        CHATBOT: 'https://proud-grass-019f46900.1.azurestaticapps.net',
        HUB: 'https://happy-dune-00f2d1f00.1.azurestaticapps.net'
    }
};

// Function to build URLs
function buildUrl(subdomain, useFallback = false) {
    if (useFallback || CONFIG.BASE_DOMAIN === 'yourdomain.com') {
        return subdomain === 'chatbot' ? 
            CONFIG.FALLBACK_URLS.CHATBOT : 
            CONFIG.FALLBACK_URLS.HUB;
    }
    return `https://${subdomain}.${CONFIG.BASE_DOMAIN}`;
}

// Function to navigate to external sites
function navigateToApp(appName) {
    let url;
    switch(appName) {
        case 'chatbot':
            url = buildUrl(CONFIG.CHATBOT_SUBDOMAIN);
            break;
        case 'hub':
            url = buildUrl(CONFIG.HUB_SUBDOMAIN);
            break;
        default:
            console.error('Unknown app name:', appName);
            return;
    }
    
    // Open in same tab for same domain, new tab for different domain
    if (url.includes(CONFIG.BASE_DOMAIN) && CONFIG.BASE_DOMAIN !== 'yourdomain.com') {
        window.location.href = url;
    } else {
        window.open(url, '_blank');
    }
}