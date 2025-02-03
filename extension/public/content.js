console.log("Content script loaded!");

let videoElem;

// Function to create and insert a video element dynamically
function createVideoElement() {
    if (videoElem) return; // Prevent duplicate elements

    videoElem = document.createElement("video");
    videoElem.style.position = "fixed";
    videoElem.style.bottom = "10px";
    videoElem.style.right = "10px";
    videoElem.style.width = "300px";
    videoElem.style.height = "200px";
    videoElem.style.border = "2px solid black";
    videoElem.style.zIndex = "999999"; // Ensure it stays on top
    videoElem.autoplay = true;
    videoElem.controls = true;

    document.body.appendChild(videoElem);
}

const displayMediaOptions = {
    video: {
        displaySurface: "window",
    },
    audio: false,
};

async function startCapture() {
    console.log("Starting capture");
    try {
        createVideoElement(); // Ensure the video element exists
        const stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        videoElem.srcObject = stream;
    } catch (err) {
        console.error("Error starting screen capture:", err);
    }
}

function stopCapture() {
    console.log("Stopping capture");
    if (videoElem && videoElem.srcObject) {
        let tracks = videoElem.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoElem.srcObject = null;
        videoElem.remove();
        videoElem = null;
    }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startCapture") {
        startCapture();
    } else if (message.action === "stopCapture") {
        stopCapture();
    }
});
