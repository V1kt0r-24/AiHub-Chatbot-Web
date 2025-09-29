// Access Control System for Chatbot
class AccessControl {
    constructor() {
        this.allowedOrigins = [
            'https://happy-dune-00f2d1f00.1.azurestaticapps.net',
            'https://hub.yourdomain.com', // Custom domain when configured
            'http://localhost', // For development
            'http://127.0.0.1'  // For development
        ];
        this.sessionKey = 'chatbot_access_token';
        this.init();
    }

    init() {
        // Check access immediately when page loads
        if (!this.checkAccess()) {
            this.denyAccess();
            return;
        }

        // Set up periodic checks
        this.startPeriodicCheck();
        
        // Monitor for URL manipulation
        this.monitorURLChanges();
    }

    checkAccess() {
        // Method 1: Check referrer
        const referrer = document.referrer;
        console.log('Referrer check:', referrer);
        
        if (referrer) {
            const referrerOrigin = new URL(referrer).origin;
            if (this.allowedOrigins.some(origin => 
                referrerOrigin === origin || referrerOrigin.startsWith(origin))) {
                console.log('✅ Access granted via referrer check');
                this.setAccessToken();
                return true;
            }
        }

        // Method 2: Check for valid access token
        const token = this.getAccessToken();
        if (token && this.validateToken(token)) {
            console.log('✅ Access granted via valid token');
            return true;
        }

        // Method 3: Check URL parameters (temporary access)
        const urlParams = new URLSearchParams(window.location.search);
        const accessKey = urlParams.get('access_key');
        if (accessKey && this.validateAccessKey(accessKey)) {
            console.log('✅ Access granted via access key');
            this.setAccessToken();
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
            return true;
        }

        console.log('❌ Access denied - no valid authentication method');
        return false;
    }

    validateAccessKey(key) {
        // Simple validation - in production, this should be more secure
        const validKeys = [
            'hub_access_' + new Date().toDateString().replace(/\s/g, '_'),
            'temp_access_chatbot_2024'
        ];
        return validKeys.includes(key);
    }

    setAccessToken() {
        const token = {
            timestamp: Date.now(),
            origin: document.referrer || 'direct',
            expires: Date.now() + (30 * 60 * 1000) // 30 minutes
        };
        sessionStorage.setItem(this.sessionKey, JSON.stringify(token));
    }

    getAccessToken() {
        try {
            const token = sessionStorage.getItem(this.sessionKey);
            return token ? JSON.parse(token) : null;
        } catch (e) {
            return null;
        }
    }

    validateToken(token) {
        if (!token || !token.timestamp || !token.expires) {
            return false;
        }
        
        // Check if token has expired
        if (Date.now() > token.expires) {
            sessionStorage.removeItem(this.sessionKey);
            return false;
        }
        
        return true;
    }

    denyAccess() {
        // Hide main content
        document.body.style.display = 'none';
        
        // Redirect to access denied page
        window.location.href = '/access-denied.html';
    }

    startPeriodicCheck() {
        setInterval(() => {
            if (!this.checkAccess()) {
                console.log('🔒 Access expired - redirecting');
                this.denyAccess();
            }
        }, 60000); // Check every minute
    }

    monitorURLChanges() {
        // Monitor for direct URL access attempts
        let lastPath = window.location.pathname;
        
        const observer = new MutationObserver(() => {
            if (window.location.pathname !== lastPath) {
                lastPath = window.location.pathname;
                if (!this.checkAccess()) {
                    this.denyAccess();
                }
            }
        });

        observer.observe(document, { subtree: true, childList: true });
    }

    // Method to generate access URL from hub
    static generateAccessURL(chatbotBaseURL) {
        const accessKey = 'hub_access_' + new Date().toDateString().replace(/\s/g, '_');
        return `${chatbotBaseURL}?access_key=${accessKey}`;
    }
}

// Initialize access control
const accessControl = new AccessControl();

// Prevent right-click and developer tools (basic protection)
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        console.log('🔒 Developer tools access blocked');
    }
});

// Export for use in other scripts
window.AccessControl = AccessControl;