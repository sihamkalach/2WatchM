from keras.layers import TFSMLayer
import os
from django.conf import settings
import tensorflow as tf

# Point d'entrée du modèle exporté
MODEL_PATH = "C:\\Users\\hp\\Desktop\\2WatchM\\Backend\\venv\\watchm\\moviesApp\\brute_force_model"

try:
    brute_force_model = TFSMLayer(MODEL_PATH, call_endpoint="serving_default")
except Exception as e:
    brute_force_model = None
    print(f"[ERROR] Failed to load BruteForce model: {e}")

def recommend_movies_for_user(user_id: int, top_k: int = 5):
    if not brute_force_model:
        raise ImproperlyConfigured("BruteForce model not loaded.")

    user_tensor = tf.constant([str(user_id)])
    predictions = brute_force_model(user_tensor)

    # Extraire les movie IDs depuis la sortie du modèle
    raw_movie_ids = predictions['output_2'].numpy()[0]  # shape: (10,) b'strings'
    recommended_ids = [int(mid.decode("utf-8")) for mid in raw_movie_ids]
    recommended_ids = [str(movie)for movie in recommended_ids]
    print(f"[INFO] Recommended movie IDs for user {user_id}: {recommended_ids}")
    return recommended_ids