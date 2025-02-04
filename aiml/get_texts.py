from spellchecker import SpellChecker
import pickle
import time

import cv2
import mediapipe as mp
import numpy as np

model_dict = pickle.load(open('./model/new_model.p', 'rb'))
model = model_dict['model']

cap = cv2.VideoCapture(0)

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)
spell = SpellChecker()

def generate_text():
    recognized_text = ""
    last_recorded_time = time.time()
    sensible_words = [""]
    
    while True:
        data_aux = []
        x_ = []
        y_ = []

        ret, frame = cap.read()
        H, W, _ = frame.shape
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        results = hands.process(frame_rgb)
        current_time = time.time()

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:

                mp_drawing.draw_landmarks(
                    frame,  
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
                # current_time = time.time()

                prediction = model.predict([np.asarray(data_aux)])
                predicted_character = prediction[0]

                if len(recognized_text) == 0:
                    recognized_text += predicted_character
                    last_recorded_time = current_time
                else:
                    # if current_time - last_recorded_time > 3:
                    #     recognized_text += " "
                    
                    if 2 < current_time - last_recorded_time:
                        recognized_text += predicted_character
                        last_recorded_time = current_time
                
                # print(recognized_text)

                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), 4)
                cv2.putText(
                    frame,
                    predicted_character,
                    (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1.3, (0, 0, 0), 3,
                    cv2.LINE_AA
                )
        else:
            if len(recognized_text) != 0:
                if current_time - last_recorded_time > 2:
                    if recognized_text[-1] != " ":

                        recognized_text += " "
                        word = recognized_text.split(" ")
                        print(word)

                        corrected_word = spell.correction(word[-2])
                        if word is not None:
                            sensible_words.append(corrected_word)
                        else: sensible_words.append(word)
                        
                        last_recorded_time = current_time

        cv2.imshow('frame', frame)
        
        if cv2.waitKey(1) & 0xFF == 27:
            break
        
        if len(sensible_words) != 0:
            yield sensible_words.pop()

    cap.release()
    cv2.destroyAllWindows()

    # return sensible_words
    # return word


if __name__ == "__main__":
    for word in generate_text():
        print(word)