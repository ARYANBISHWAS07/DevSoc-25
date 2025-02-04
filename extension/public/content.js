console.log("Extension Loaded - Capturing and Sending Images to Backend");

let videoElem;
let canvas, ctx;

// Function to create a video element
function createVideoElement() {
    if (videoElem) return;
    
    videoElem = document.createElement("video");
    videoElem.style.position = "fixed";
    videoElem.style.bottom = "10px";
    videoElem.style.right = "10px";
    videoElem.style.width = "300px";
    videoElem.style.height = "200px";
    videoElem.style.border = "2px solid black";
    videoElem.style.zIndex = "999999";
    videoElem.autoplay = true;
    videoElem.controls = true;
    
    document.body.appendChild(videoElem);
}

// Start capturing screen and sending frames to backend
async function startCapture() {
    console.log("Starting capture...");
    createVideoElement();

    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        videoElem.srcObject = stream;

        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");

        // Store meeting start time in chrome.storage.local
        const startTime = new Date().toISOString();
        chrome.storage.local.set({ meetingStartTime: startTime }, () => {
            console.log("Meeting Start Time Stored:", startTime);
        });

        videoElem.onloadedmetadata = () => {
            console.log("Video loaded, sending frames to backend...");

            setInterval(() => {
                if (!videoElem.videoWidth || !videoElem.videoHeight) {
                    console.warn(" Video not ready yet.");
                    return;
                }

                canvas.width = videoElem.videoWidth;
                canvas.height = videoElem.videoHeight;
                ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);

                const imageData = canvas.toDataURL("image/jpeg"); // Convert frame to Base64
                sendImageToBackend(imageData);
            }, 1000);  // Send image every 1 second to reduce API load
        };
    } catch (error) {
        console.error(" Error starting screen capture:", error);
    }
}

// Send captured image to backend API
async function sendImageToBackend(imageData) {
    console.log(" Sending image to backend...");

    try {
        const response = await fetch("http://localhost:5000/image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ image: imageData })
        });

        const result = await response.json();
        console.log(" Received prediction from backend:", result.current_word);
        console.log("Total words:", result.final_text);

        showPrediction(result.prediction);
    } catch (error) {
        console.error(" Error sending image to backend:", error);
    }
}

// Display the prediction on the screen
function showPrediction(predictedCharacter) {
    let predictionElem = document.getElementById("hand-sign-text");
    if (!predictionElem) {
        predictionElem = document.createElement("div");
        predictionElem.id = "hand-sign-text";
        predictionElem.style.position = "fixed";
        predictionElem.style.bottom = "50px";
        predictionElem.style.right = "10px";
        predictionElem.style.fontSize = "24px";
        predictionElem.style.color = "white";
        predictionElem.style.backgroundColor = "black";
        predictionElem.style.padding = "10px";
        predictionElem.style.borderRadius = "5px";
        predictionElem.style.zIndex = "999999";
        document.body.appendChild(predictionElem);
    }
    console.log(predictedCharacter);
    predictionElem.innerText = `Predicted Sign: ${predictedCharacter}`;
}

// Stop capture and send MOM data to backend
function stopCapture() {
    console.log("Stopping capture");
    
    chrome.storage.local.get("meetingStartTime", (data) => {
        const startTime = data.meetingStartTime ? new Date(data.meetingStartTime) : null;
        const endTime = new Date();
        let meetingDuration = 0;

        if (startTime) {
            meetingDuration = Math.floor((endTime - startTime) / 1000 / 60); // Convert milliseconds to minutes
            console.log("Meeting Duration (minutes):", meetingDuration);
        } else {
            console.warn("Meeting Start Time Not Found");
        }

        chrome.storage.sync.get("email", async (emailData) => {
            console.log("User email:", emailData.email);
            const email = emailData.email || "unknown@example.com"; // Default if email is not found

            if (videoElem && videoElem.srcObject) {
                let tracks = videoElem.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                videoElem.srcObject = null;
                videoElem.remove();
                videoElem = null;
            }

            // Prepare MOM data
            const momData = {
                email: email,
                meeting_date: startTime ? startTime.toISOString().split("T")[0] : endTime.toISOString().split("T")[0], // Extract YYYY-MM-DD
                meeting_time: startTime ? startTime.toLocaleTimeString() : endTime.toLocaleTimeString(),
                meeting_duration: meetingDuration, // Calculated duration
            };

            try {
                console.log("Sending MOM data to backend...");
                const response = await fetch("http://localhost:5000/sendmom", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(momData)
                });

                const result = await response.json();
                console.log("MOM saved response:", result);
            } catch (error) {
                console.error("Error sending MOM data to backend:", error);
            }
        });

        // Remove the start time from storage after sending the data
        chrome.storage.local.remove("meetingStartTime");
    });
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "startCapture") {
        startCapture();
    } else if (message.action === "stopCapture") {
        stopCapture();
    }
});
