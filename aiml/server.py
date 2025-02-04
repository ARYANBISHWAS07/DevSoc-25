import base64
import time
import pickle
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import cv2
import mediapipe as mp
from spellchecker import SpellChecker
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# Load the hand sign recognition model
model_dict = pickle.load(open('./model/last_model.p', 'rb'))
model = model_dict['model']

# Initialize Mediapipe Hands
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

# Initialize spell checker
spell = SpellChecker()

app = FastAPI()

# Allow frontend requests (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (Change for production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

class ImageRequest(BaseModel):
    image: str  # Base64-encoded image

# State to track recognized text
recognized_text = ""
last_recorded_time = time.time()
MoM_raw = ""  # Stores the final sentence
flag = 1
count = 1


def process_image(image_data):
    """ Decodes base64 image, processes it using Mediapipe, and updates recognized text """

    global recognized_text, last_recorded_time, MoM_raw, flag, count

    try:
        # Decode base64 image
        image_bytes = base64.b64decode(image_data.split(",")[1])
        image_np = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(image_np, cv2.IMREAD_COLOR)

        if image is None:
            raise ValueError("Invalid image")

        H, W, _ = image.shape
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = hands.process(image_rgb)

        current_time = time.time()

        if not results.multi_hand_landmarks:
            # If no hand is detected for more than 2 seconds, finalize the word
            if len(recognized_text) != 0 and current_time - last_recorded_time > 2:
                corrected_word = spell.correction(recognized_text)
                
                if corrected_word:  # If spell correction is available
                    MoM_raw += " " + corrected_word
                # else:
                #     MoM_raw += " " + recognized_text  # Keep original word
                
                recognized_text = ""  # Reset for the next word
                last_recorded_time = current_time

            return {"current_word": recognized_text, "final_text": MoM_raw.strip()}

        data_aux = []
        x_, y_ = [], []

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(
                    image,  
                    hand_landmarks,  
                    mp_hands.HAND_CONNECTIONS,  
                    mp_drawing_styles.get_default_hand_landmarks_style(),
                    mp_drawing_styles.get_default_hand_connections_style())
            
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

            x1 = int(min(x_) * W) - 10
            y1 = int(min(y_) * H) - 10

            x2 = int(max(x_) * W) - 10
            y2 = int(max(y_) * H) - 10

            if len(data_aux) == 42:
                prediction = model.predict([np.asarray(data_aux)])
                predicted_character = prediction[0][0]
                
                print(predicted_character)
                # Add character to recognized text only if 0.5s has passed
                
                cv2.rectangle(image, (x1, y1), (x2, y2), (0, 0, 0), 4)
                cv2.putText(
                    image,
                    predicted_character,
                    (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1.3, (0, 0, 0), 3,
                    cv2.LINE_AA
                )
                
                if len(recognized_text) == 0 or recognized_text[-1] != predicted_character:
                    if not flag:
                        recognized_text += predicted_character
                        last_recorded_time = current_time
                        flag = 1
                    else:
                        flag -= 1
            cv2.imwrite(f'./images/{count}.jpg',image)
            count += 1
            return {"current_word": recognized_text, "final_text": MoM_raw.strip()}
    
    except Exception as e:
        print("Error processing image:", str(e))
        return {"error": str(e), "current_word": recognized_text, "final_text": MoM_raw.strip()}


@app.post("/image")
async def receive_image(request: ImageRequest):
    """ Receives base64 image, processes it, and returns the recognized word """

    try:
        recognized_data = process_image(request.image)
        return JSONResponse(content=recognized_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Run using: uvicorn server:app --host 0.0.0.0 --port 5000
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
