<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:000000,100:00FF41&height=180&section=header&text=IOT-SHIELD&fontSize=60&fontColor=00FF41&animation=fadeIn&fontAlignY=35&desc=Network%20Intrusion%20Detection%20for%20IoT%20%26%20Embedded%20Systems&descAlignY=55&descSize=16&descColor=00CC33" width="100%"/>

<img src="https://readme-typing-svg.demolab.com?font=Share+Tech+Mono&size=18&duration=3000&pause=1000&color=00FF41&center=true&vCenter=true&width=600&lines=Detects+malicious+network+traffic+in+real+time.;XGBoost+%7C+80.4%25+Accuracy+%7C+NSL-KDD;Django+REST+API+%2B+React+Dashboard." alt="Typing SVG" />

</div>

---

### What is this?

IOT-SHIELD checks whether network traffic is normal or an attack. You give it network parameters, it tells you if something looks suspicious — along with a confidence score and threat level (LOW / MEDIUM / HIGH).

It was built with IoT and embedded systems in mind, where detecting unusual network behaviour early matters.

---

### How it works

1. You enter network traffic parameters into the dashboard
2. The data is sent to a Django backend
3. An XGBoost ML model analyses it
4. You get back — Normal or Attack, confidence %, and threat level

---

### Model

- **Dataset:** NSL-KDD (125,973 training samples, 23 attack types)
- **Algorithm:** XGBoost Classifier
- **Accuracy:** 80.4% on test set

> The NSL-KDD test set is intentionally harder than the training data — this is a known characteristic of the dataset, not a model issue. 80% is consistent with research benchmarks on this dataset.

<div align="center">
<img src="assets/model_performance.png" width="85%"/>
</div>

---

### Stack

<div align="center">

![Python](https://img.shields.io/badge/Python-000000?style=for-the-badge&logo=python&logoColor=00FF41)
![Django](https://img.shields.io/badge/Django-000000?style=for-the-badge&logo=django&logoColor=00FF41)
![React](https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react&logoColor=00FF41)
![XGBoost](https://img.shields.io/badge/XGBoost-000000?style=for-the-badge&logoColor=00FF41)
![scikit-learn](https://img.shields.io/badge/scikit--learn-000000?style=for-the-badge&logo=scikit-learn&logoColor=00FF41)

</div>

---

### Project Structure

```
iot-shield/
├── ml_model/         # Jupyter notebook, trained model (.pkl), scaler
├── backend/          # Django REST API
├── frontend/         # React dashboard
├── data/             # NSL-KDD dataset
└── assets/           # Screenshots and plots
```

---

### Setup

**1. Clone the repo**
```bash
git clone https://github.com/sahana-iyer/iot-shield.git
cd iot-shield
```

**2. Install Python dependencies**
```bash
pip install django djangorestframework django-cors-headers xgboost scikit-learn pandas numpy
```

**3. Run the backend**
```bash
cd backend
python manage.py runserver
```

**4. Run the frontend**
```bash
cd frontend
npm install
npm start
```

**5. Open** `http://localhost:3000` and start analysing traffic.

---

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health/` | Check if the system is running |
| POST | `/api/predict/` | Submit traffic parameters for analysis |

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00FF41,100:000000&height=120&section=footer&animation=fadeIn" width="100%"/>

*Built by Sahana G Iyer*

</div>
