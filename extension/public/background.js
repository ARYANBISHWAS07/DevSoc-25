function startCapture() {
    console.log("Capture started!");
}

function stopCapture() {
    console.log("Capture stopped!");
}

// Listen for messages from popup (App.js)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startCapture") {
        startCapture();
    }
    if (message.action === "stopCapture") {
        stopCapture();
    }
});
