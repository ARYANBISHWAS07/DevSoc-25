from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import base64
import cv2
import numpy as np
import pickle
import mediapipe as mp
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (Change this for production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)
# Load ML Model
model_dict = pickle.load(open('./model/colab_model.p', 'rb'))
model = model_dict['model']

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

# Pydantic model for request validation
class ImageRequest(BaseModel):
    image: str  # Base64 encoded image

def process_image(image_base64):
    try:
        # Decode Base64 image
        image_data = base64.b64decode(image_base64.split(",")[1])
        np_arr = np.frombuffer(image_data, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # Convert to RGB for MediaPipe
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Process image with MediaPipe
        results = hands.process(frame_rgb)

        # Extract hand landmarks
        data_aux = []
        x_, y_ = [], []

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                for i in range(len(hand_landmarks.landmark)):
                    x = hand_landmarks.landmark[i].x
                    y = hand_landmarks.landmark[i].y
                    x_.append(x)
                    y_.append(y)

                for i in range(len(hand_landmarks.landmark)):
                    x = hand_landmarks.landmark[i].x
                    y = hand_landmarks.landmark[i].y
                    data_aux.append(x - min(x_))
                    data_aux.append(y - min(y_))

            if len(data_aux) == 42:
                # Make prediction
                prediction = model.predict([np.asarray(data_aux)])
                predicted_character = prediction[0]
                return predicted_character

        return "No hand detected"
    
    except Exception as e:
        print(f"❌ Error processing image: {e}")
        return "Error"

@app.post("/image")
async def receive_image(request: ImageRequest):
    if not request.image:
        raise HTTPException(status_code=400, detail="No image provided")

    # Process image and get prediction
    prediction = process_image(request.image)
    return {"prediction": prediction}

# Run the API
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
