chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed - Setting up Alarm");

    // Set an alarm to fire every 30 seconds
    chrome.alarms.create("keepActive", {
        periodInMinutes: 0.5 // 30 seconds
    });
});

// Listen for the alarm and do nothing (just to keep the service worker alive)
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "keepActive") {
        console.log("Keeping service worker active...");
    }
});

// Listen for messages from the website
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    if (request.jwt) {
        console.log("Received JWT from Website:", request.jwt);
        
        // Store the JWT in chrome.storage
        chrome.storage.sync.set({ email: request.jwt }, () => {
            console.log("JWT saved successfully");
            sendResponse({ success: true, message: "Token has been stored" });
        });

        return true; // Ensures sendResponse works asynchronously
    } else {
        sendResponse({ success: false, message: "No token received" });
    }
});
