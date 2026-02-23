from django.shortcuts import render

# Create your views here.
import pickle
import numpy as np
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os

# Load model and scaler
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, '..', 'ml_model', 'iot_shield_model.pkl')
SCALER_PATH = os.path.join(BASE_DIR, '..', 'ml_model', 'scaler.pkl')

with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

with open(SCALER_PATH, 'rb') as f:
    scaler = pickle.load(f)

FEATURES = [
    'duration', 'protocol_type', 'service', 'flag', 'src_bytes', 'dst_bytes',
    'land', 'wrong_fragment', 'urgent', 'hot', 'num_failed_logins', 'logged_in',
    'num_compromised', 'root_shell', 'su_attempted', 'num_root', 'num_file_creations',
    'num_shells', 'num_access_files', 'num_outbound_cmds', 'is_host_login',
    'is_guest_login', 'count', 'srv_count', 'serror_rate', 'srv_serror_rate',
    'rerror_rate', 'srv_rerror_rate', 'same_srv_rate', 'diff_srv_rate',
    'srv_diff_host_rate', 'dst_host_count', 'dst_host_srv_count',
    'dst_host_same_srv_rate', 'dst_host_diff_srv_rate',
    'dst_host_same_src_port_rate', 'dst_host_srv_diff_host_rate',
    'dst_host_serror_rate', 'dst_host_srv_serror_rate',
    'dst_host_rerror_rate', 'dst_host_srv_rerror_rate'
]

class PredictView(APIView):
    def post(self, request):
        try:
            data = request.data
            features = [float(data.get(f, 0)) for f in FEATURES]
            features_scaled = scaler.transform([features])
            prediction = model.predict(features_scaled)[0]
            probability = model.predict_proba(features_scaled)[0]

            return Response({
                'status': 'ATTACK DETECTED' if prediction == 1 else 'NORMAL TRAFFIC',
                'prediction': int(prediction),
                'confidence': f"{max(probability):.2%}",
                'threat_level': 'HIGH' if probability[1] > 0.8 else 'MEDIUM' if probability[1] > 0.5 else 'LOW'
            })

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class HealthView(APIView):
    def get(self, request):
        return Response({
            'status': 'IOT-SHIELD ACTIVE',
            'model': 'XGBoost',
            'accuracy': '80.4%',
            'dataset': 'NSL-KDD'
        })
