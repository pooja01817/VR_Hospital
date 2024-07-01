from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import io
import subprocess
import logging
from predict import SurgicalPredictor  # Import the SurgicalPredictor class
import os

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

uploaded_image = None
stored_string = None
unreal_engine_opened = False  # Flag to track if Unreal Engine is already open

@app.post("/upload-image/")
async def upload_image(file: UploadFile = File(...)):
    global uploaded_image, stored_string, unreal_engine_opened
    uploaded_image = await file.read()
    stored_string = file.filename

    # Open Unreal Engine only if it's not already open
    if not unreal_engine_opened:
        open_inreal = "C:\\pooja\\UnrealProjects\\MyProject3\\MyProject3.uproject"
        subprocess.Popen(open_inreal, shell=True)
        unreal_engine_opened = True  # Set the flag to indicate Unreal Engine is open

    return {"message": "Image uploaded successfully"}

@app.get("/get-image/")
async def get_image():
    if uploaded_image is None:
        raise HTTPException(status_code=404, detail="Image not found")

    return StreamingResponse(io.BytesIO(uploaded_image), media_type="image/jpeg")

@app.get("/get-name/")
async def get_string():
    if uploaded_image is None:
        raise HTTPException(status_code=404, detail="Image not found")

    # Save the uploaded image to a temporary file
    temp_image_path = "temp_image.jpg"
    with open(temp_image_path, "wb") as temp_image:
        temp_image.write(uploaded_image)

    # Use the SurgicalPredictor class to predict the image
    predictor = SurgicalPredictor("C:\\Users\\manda\\Downloads\\model\\model")
    predicted_label, predictions = predictor.predict_image(temp_image_path)

    # Return the predicted label along with the stored string
    return {"string": stored_string, "predicted_label": predicted_label}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
