from keras.models import load_model
from keras.preprocessing import image
import numpy as np

class SurgicalPredictor:
    def __init__(self, model_path):
        self.model = load_model(model_path)
        self.class_labels = ['Curved Mayo Scissor', 'Scalpel', 'Straight Dissection Clamp', 'Straight Mayo Scissor']

    def predict_image(self, image_path):
        img = image.load_img(image_path, target_size=(331, 331))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0

        predictions = self.model.predict(img_array)
        predicted_class = np.argmax(predictions)
        predicted_label = self.class_labels[predicted_class]

        return predicted_label, predictions

if __name__ == "__main__":
    # Example usage
    model_path = 'C:\\Users\\manda\\Downloads\\model\\model'
    image_path = 'C:\\Users\\manda\\OneDrive\\Documents\\python_projct\\tesouracurva1.jpg'

    predictor = SurgicalPredictor(model_path)
    predicted_label, predictions = predictor.predict_image(image_path)
    print(f'Predicted Label: {predicted_label}')
