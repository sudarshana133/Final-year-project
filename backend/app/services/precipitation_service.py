import os
import pickle

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SARIMA_MODEL_PATH = os.path.join(BASE_DIR, "../ml_models/sarima_model.pkl")
GLOBAL_WARMING_TREND_MODEL_PATH = os.path.join(BASE_DIR, "../ml_models/GlobalWarmingTrend.pkl")

def get_sarima_forecast(steps=12):
    with open(SARIMA_MODEL_PATH, 'rb') as file:
        model = pickle.load(file)
    
    forecast = model.get_forecast(steps=steps).predicted_mean
    
    return forecast.tolist()

def get_global_warming_trend():
    with open(GLOBAL_WARMING_TREND_MODEL_PATH, 'rb') as file:
        model = pickle.load(file)
    
    return str(model)

if __name__ == "__main__":
    sarima_data = get_sarima_forecast(steps=12)
    print("SARIMA Forecast:", sarima_data)
    
    global_warming_data = get_global_warming_trend()
    print("Global Warming Trend Model Data:", global_warming_data)