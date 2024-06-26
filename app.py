import warnings
from sklearn.exceptions import InconsistentVersionWarning

warnings.filterwarnings("ignore", category=InconsistentVersionWarning)

import numpy as np
import pandas as pd
from flask import Flask, request, render_template, redirect, session, flash, url_for, jsonify
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.linear_model import LogisticRegression
from nltk.tokenize import sent_tokenize, word_tokenize
from pdfminer.high_level import extract_text
from pdfminer.high_level import extract_text
import nltk  
nltk.download('stopwords')
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize
from transformers import AutoModelForCausalLM, AutoTokenizer
from pymongo import MongoClient
import torch
import bcrypt
import pickle
import re
import os
import tempfile
import joblib
import csv



# Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load datasets
sym_des = pd.read_csv("datasets/symtoms_df.csv")
precautions = pd.read_csv("datasets/precautions_df.csv")
workout = pd.read_csv("datasets/workout_df.csv")
description = pd.read_csv("datasets/description.csv")
medications = pd.read_csv('datasets/medications.csv')
diets = pd.read_csv("datasets/diets.csv")

# Load model
svc = pickle.load(open('models/svc.pkl', 'rb'))

filename = 'models/diabetes-prediction-model.pkl'
classifier = pickle.load(open(filename, 'rb'))

filename_cancer = 'models/cancer-prediction-model.pkl'
classifier_cancer = pickle.load(open(filename_cancer, 'rb'))

filename_heart = 'models/heart-disease-prediction-model.pkl'
classifier_heart = pickle.load(open(filename_heart,'rb'))

filename_kidney = 'models/kidney_model.pkl'
classifier_kidney= pickle.load(open(filename_kidney,'rb'))


classifier_liver = joblib.load('models/liver-prediction-model.pkl')

# Helper functions
def helper(dis):
    desc = description[description['Disease'] == dis]['Description']
    desc = " ".join([w for w in desc])

    pre = precautions[precautions['Disease'] == dis][['Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4']]
    pre = [col for col in pre.values]

    med = medications[medications['Disease'] == dis]['Medication']
    med = [med for med in med.values]

    die = diets[diets['Disease'] == dis]['Diet']
    die = [die for die in die.values]

    wrkout = workout[workout['disease'] == dis]['workout']

    return desc, pre, med, die, wrkout

symptoms_dict = {'itching': 0, 'skin_rash': 1, 'nodal_skin_eruptions': 2, 'continuous_sneezing': 3, 'shivering': 4, 'chills': 5, 'joint_pain': 6, 'stomach_pain': 7, 'acidity': 8, 'ulcers_on_tongue': 9, 'muscle_wasting': 10, 'vomiting': 11, 'burning_micturition': 12, 'spotting_ urination': 13, 'fatigue': 14, 'weight_gain': 15, 'anxiety': 16, 'cold_hands_and_feets': 17, 'mood_swings': 18, 'weight_loss': 19, 'restlessness': 20, 'lethargy': 21, 'patches_in_throat': 22, 'irregular_sugar_level': 23, 'cough': 24, 'high_fever': 25, 'sunken_eyes': 26, 'breathlessness': 27, 'sweating': 28, 'dehydration': 29, 'indigestion': 30, 'headache': 31, 'yellowish_skin': 32, 'dark_urine': 33, 'nausea': 34, 'loss_of_appetite': 35, 'pain_behind_the_eyes': 36, 'back_pain': 37, 'constipation': 38, 'abdominal_pain': 39, 'diarrhoea': 40, 'mild_fever': 41, 'yellow_urine': 42, 'yellowing_of_eyes': 43, 'acute_liver_failure': 44, 'fluid_overload': 45, 'swelling_of_stomach': 46, 'swelled_lymph_nodes': 47, 'malaise': 48, 'blurred_and_distorted_vision': 49, 'phlegm': 50, 'throat_irritation': 51, 'redness_of_eyes': 52, 'sinus_pressure': 53, 'runny_nose': 54, 'congestion': 55, 'chest_pain': 56, 'weakness_in_limbs': 57, 'fast_heart_rate': 58, 'pain_during_bowel_movements': 59, 'pain_in_anal_region': 60, 'bloody_stool': 61, 'irritation_in_anus': 62, 'neck_pain': 63, 'dizziness': 64, 'cramps': 65, 'bruising': 66, 'obesity': 67, 'swollen_legs': 68, 'swollen_blood_vessels': 69, 'puffy_face_and_eyes': 70, 'enlarged_thyroid': 71, 'brittle_nails': 72, 'swollen_extremeties': 73, 'excessive_hunger': 74, 'extra_marital_contacts': 75, 'drying_and_tingling_lips': 76, 'slurred_speech': 77, 'knee_pain': 78, 'hip_joint_pain': 79, 'muscle_weakness': 80, 'stiff_neck': 81, 'swelling_joints': 82, 'movement_stiffness': 83, 'spinning_movements': 84, 'loss_of_balance': 85, 'unsteadiness': 86, 'weakness_of_one_body_side': 87, 'loss_of_smell': 88, 'bladder_discomfort': 89, 'foul_smell_of urine': 90, 'continuous_feel_of_urine': 91, 'passage_of_gases': 92, 'internal_itching': 93, 'toxic_look_(typhos)': 94, 'depression': 95, 'irritability': 96, 'muscle_pain': 97, 'altered_sensorium': 98, 'red_spots_over_body': 99, 'belly_pain': 100, 'abnormal_menstruation': 101, 'dischromic _patches': 102, 'watering_from_eyes': 103, 'increased_appetite': 104, 'polyuria': 105, 'family_history': 106, 'mucoid_sputum': 107, 'rusty_sputum': 108, 'lack_of_concentration': 109, 'visual_disturbances': 110, 'receiving_blood_transfusion': 111, 'receiving_unsterile_injections': 112, 'coma': 113, 'stomach_bleeding': 114, 'distention_of_abdomen': 115, 'history_of_alcohol_consumption': 116, 'fluid_overload.1': 117, 'blood_in_sputum': 118, 'prominent_veins_on_calf': 119, 'palpitations': 120, 'painful_walking': 121, 'pus_filled_pimples': 122, 'blackheads': 123, 'scurring': 124, 'skin_peeling': 125, 'silver_like_dusting': 126, 'small_dents_in_nails': 127, 'inflammatory_nails': 128, 'blister': 129, 'red_sore_around_nose': 130, 'yellow_crust_ooze': 131}
diseases_list = {15: 'Fungal infection', 4: 'Allergy', 16: 'GERD', 9: 'Chronic cholestasis', 14: 'Drug Reaction', 33: 'Peptic ulcer diseae', 1: 'AIDS', 12: 'Diabetes ', 17: 'Gastroenteritis', 6: 'Bronchial Asthma', 23: 'Hypertension ', 30: 'Migraine', 7: 'Cervical spondylosis', 32: 'Paralysis (brain hemorrhage)', 28: 'Jaundice', 29: 'Malaria', 8: 'Chicken pox', 11: 'Dengue', 37: 'Typhoid', 40: 'hepatitis A', 19: 'Hepatitis B', 20: 'Hepatitis C', 21: 'Hepatitis D', 22: 'Hepatitis E', 3: 'Alcoholic hepatitis', 36: 'Tuberculosis', 10: 'Common Cold', 34: 'Pneumonia', 13: 'Dimorphic hemmorhoids(piles)', 18: 'Heart attack', 39: 'Varicose veins', 26: 'Hypothyroidism', 24: 'Hyperthyroidism', 25: 'Hypoglycemia', 31: 'Osteoarthristis', 5: 'Arthritis', 0: '(vertigo) Paroymsal  Positional Vertigo', 2: 'Acne', 38: 'Urinary tract infection', 35: 'Psoriasis', 27: 'Impetigo'}

def get_predicted_value(patient_symptoms):
    input_vector = np.zeros(len(symptoms_dict))
    for symptom in patient_symptoms:
        if symptom in symptoms_dict:
            input_vector[symptoms_dict[symptom]] = 1

    input_vector = input_vector.reshape(1, -1)
    predicted_disease = svc.predict(input_vector)
    return diseases_list[int(predicted_disease[0])]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        symptoms = data.get("symptoms", [])

        if not symptoms:
            return jsonify({"error": "No symptoms provided"}), 400

        disease = get_predicted_value(symptoms)
        description, precautions, medications, diet, workout = helper(disease)

        # Convert lists to joined strings
        precautions = ', '.join([item for sublist in precautions for item in sublist])
        medications = ', '.join([med for med in medications])
        diet = ', '.join([die for die in diet])
        workout = ', '.join([wrk for wrk in workout])

        return jsonify({
            "disease": disease,
            "description": description,
            "precautions": precautions,
            "medications": medications,
            "diet": diet,
            "workout": workout
        })
    except Exception as e:
        return jsonify({"message": str(e)}), 500

# Doctor recommendation

def load_doctor_data():
    try:
        with open('datasets/doctors_dataset.csv', newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            return list(reader)
    except FileNotFoundError:
        print("Doctor data file not found.")
        return []
    except Exception as e:
        print(f"Error loading doctor data: {e}")
        return []
doctor_data = load_doctor_data()

def filter_doctors(city, state, disease):
    filtered_doctors = []
    for doctor in doctor_data:
        if (doctor['City'].lower() == city.lower() and 
            doctor['State'].lower() == state.lower() and 
            doctor['Disease'].lower() == disease.lower()):
            filtered_doctors.append({
                'Name': doctor['Name'],
                'State': doctor['State'],
                'City': doctor['City'],
                'Contact Info': doctor['Contact Number']
            })
    return filtered_doctors

@app.route('/recommend', methods=['POST'])
def recommend_doctors():
    data = request.get_json()
    city = data.get('city', '').strip()
    state = data.get('state', '').strip()
    disease = data.get('disease', '').strip()
    
    if not city or not state or not disease:
        return jsonify({'error': 'City, state, and disease are required fields'}), 400

    doctors = filter_doctors(city, state, disease)
    return jsonify({'doctors': doctors})

# summery text

def extract_text_from_pdf(pdf_file):
    with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
        pdf_file.save(tmp_file.name)
        return extract_text(tmp_file.name)

def preprocess_text(text):
    text = re.sub(r'\[[0-9]*\]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text

def sentence_similarity(sent1, sent2, stopwords=None):
    if stopwords is None:
        stopwords = set()
    words1 = [word.lower() for word in sent1 if word not in stopwords]
    words2 = [word.lower() for word in sent2 if word not in stopwords]
    all_words = list(set(words1 + words2))
    
    vector1 = [0] * len(all_words)
    vector2 = [0] * len(all_words)
    
    for word in words1:
        vector1[all_words.index(word)] += 1
    
    for word in words2:
        vector2[all_words.index(word)] += 1
    
    return cosine_similarity([vector1], [vector2])[0,0]

def generate_summary(text, top_n=5):
    sentences = sent_tokenize(text)
    clean_sentences = [word_tokenize(sentence) for sentence in sentences]
    stop_words = set(stopwords.words('english'))
    
    sentence_similarity_matrix = np.zeros((len(sentences), len(sentences)))
    for i in range(len(sentences)):
        for j in range(len(sentences)):
            if i == j:
                continue
            sentence_similarity_matrix[i][j] = sentence_similarity(clean_sentences[i], clean_sentences[j], stop_words)
    
    scores = np.sum(sentence_similarity_matrix, axis=1)
    ranked_sentences = [sentence for _, sentence in sorted(zip(scores, sentences), reverse=True)[:top_n]]

    # Improved formatting
    summary = []
    current_test = ""
    for sentence in ranked_sentences:
        if "Test Report Test Name" in sentence:
            current_test = sentence.split("Test Report Test Name")[1].split(":")[0].strip()
            summary.append(f"\n\n--- {current_test} ---")
        elif "Report Status" in sentence:
            summary.append(f"\n\nReport Status: {sentence.split('Report Status')[1].strip()}")
        elif "ResultsUnits" in sentence:
            summary.append(f"\n\nTest Results:")
            results = sentence.split("ResultsUnits")[1].strip()
            result_lines = results.split("*")
            for line in result_lines:
                if line.strip() != "":
                    summary.append(f"- {line.strip()}")
        else:
            summary.append(sentence)

    return summary



@app.route('/summary', methods=['POST'])
def summary():
    if request.method == 'POST':
        try:
            pdf_file = request.files['pdf_file']
            text = extract_text_from_pdf(pdf_file)
            preprocessed_text = preprocess_text(text)
            summarized_sentences = generate_summary(preprocessed_text)
            return jsonify({'summarized_text': summarized_sentences})
        except Exception as e:
            print("Error:", e)
            return jsonify({'error': 'An error occurred while processing the request'}), 500
    return jsonify({'summarized_text': []})

# diabetes



@app.route('/predict_diab', methods=['POST'])
def predict_diab():
    if request.method == 'POST':
        data = request.get_json()
        preg = int(data['pregnancies'])
        glucose = int(data['glucose'])
        bp = int(data['bloodpressure'])
        st = int(data['skinthickness'])
        insulin = int(data['insulin'])
        bmi = float(data['bmi'])
        dpf = float(data['dpf'])
        age = int(data['age'])
        
        data_array = np.array([[preg, glucose, bp, st, insulin, bmi, dpf, age]])
        my_prediction = classifier.predict(data_array)
        return jsonify({'prediction': int(my_prediction)})


@app.route('/predict_h', methods=['POST'])
def predict_h():
    if request.method == 'POST':
        data = request.get_json()
        Age = int(data['Age'])
        Sex = int(data['Sex'])
        ChestPainType = int(data['ChestPainType'])
        RestingBP = int(data['RestingBP'])
        Cholesterol = int(data['Cholesterol'])
        FastingBS = int(data['FastingBS'])
        RestingECG = int(data['RestingECG'])
        MaxHR = int(data['MaxHR'])
        ExerciseAngina = int(data['ExerciseAngina'])
        Oldpeak = int(data['Oldpeak'])
        ST_Slope = int(data['ST_Slope'])

        data_array = np.array([[Age, Sex, ChestPainType, RestingBP, Cholesterol, FastingBS, RestingECG, MaxHR, ExerciseAngina, Oldpeak, ST_Slope]])
        my_prediction_heart = classifier_heart.predict(data_array)
        
        print(my_prediction_heart)
        return jsonify({'prediction': int(my_prediction_heart)})

@app.route('/predict_b', methods=['POST'])
def predict_b():
    if request.method == 'POST':
        data = request.get_json()
        radius_mean = float(data['radius_mean'])
        texture_mean = float(data['texture_mean'])
        perimeter_mean = float(data['perimeter_mean'])
        area_mean = float(data['area_mean'])
        smoothness_mean = float(data['smoothness_mean'])
        compactness_mean = float(data['compactness_mean'])
        concavity_mean = float(data['concavity_mean'])
        concave_points_mean = float(data['concave_points_mean'])
        symmetry_mean = float(data['symmetry_mean'])
        
        data_array = np.array([[radius_mean, texture_mean, perimeter_mean, area_mean, smoothness_mean, compactness_mean, concavity_mean, concave_points_mean, symmetry_mean]])
        my_prediction_cancer = classifier_cancer.predict(data_array)
        return jsonify({'prediction': int(my_prediction_cancer[0])})

@app.route('/predict_k', methods=['POST'])
def predict_k():
    try:
        data = request.get_json() or request.form.to_dict()
        # Extract and convert data to the appropriate format
        bp = float(data['bp'])
        sg = float(data['sg'])
        al = float(data['al'])
        su = float(data['su'])
        rbc = float(data['rbc'])
        pc = float(data['pc'])
        
        # Perform prediction
        data_array = np.array([[bp, sg, al, su, rbc, pc]])
        my_prediction_kidney = classifier_kidney.predict(data_array)[0]
        
        return jsonify({'prediction': int(my_prediction_kidney)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict_l', methods=['POST'])
def predict_l():
    if request.method == 'POST':
        data = request.get_json()
        Age = data['Age']
        Gender = data['Gender']
        Total_Bilirubin = data['Total_Bilirubin']
        Direct_Bilirubin = data['Direct_Bilirubin']
        Alkaline_Phosphotase = data['Alkaline_Phosphotase']
        Alamine_Aminotransferase = data['Alamine_Aminotransferase']
        Aspartate_Aminotransferase = data['Aspartate_Aminotransferase']
        Total_Proteins = data['Total_Proteins']
        Albumin = data['Albumin']
        Albumin_and_Globulin_Ratio = data['Albumin_and_Globulin_Ratio']
        
        data_array = np.array([[Age, Gender, Total_Bilirubin, Direct_Bilirubin, Alkaline_Phosphotase, Alamine_Aminotransferase, Aspartate_Aminotransferase, Total_Proteins, Albumin_and_Globulin_Ratio]])
        my_prediction_liver = classifier_liver.predict(data_array)
        return jsonify({'prediction': int(my_prediction_liver[0])})


if __name__ == "__main__":
    app.run(debug=True)
