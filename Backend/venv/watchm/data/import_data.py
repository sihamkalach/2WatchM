import json
import os
from django.conf import settings
from moviesApp.models import Genre, Movie, Rating, CustomUser  # Adjust the import paths
from django.db import IntegrityError


# Load JSON file helper function
def load_json_file(filename):
    with open(filename, 'r') as file:
        return json.load(file)

# Function to import genres
def import_genres():
    genres_data = load_json_file(os.path.join(settings.BASE_DIR, 'data', 'movie_genre.json'))
    for genre in genres_data:
        Genre.objects.create(id=genre['id'], name=genre['name'], image=genre['image'])

# Function to import movies
def import_movies():
    movies_data = load_json_file(os.path.join(settings.BASE_DIR, 'data', 'movies_data.json'))
    for movie in movies_data:
        movie_obj = Movie.objects.create(
            movie_id=movie['movie_id'],
            movie_title=movie['movie_title'],
            image_url=movie['image_url']
        )
        movie_obj.movie_genre.set(movie['movie_genre'])  # Setting ManyToMany relation

# Function to import users
# Function to import users
def import_users():
    users_data = load_json_file(os.path.join(settings.BASE_DIR, 'data', 'users_data.json'))

    for user in users_data:
        try:
            # Check if the user already exists by their unique ID
            existing_user = CustomUser.objects.filter(id=user['id']).first()
            
            if existing_user:
                # If user exists, update their details (if needed)
                existing_user.username = user['name']
                existing_user.email = user['email']
                existing_user.password = user['password']  # Ensure proper handling of password hashing
                existing_user.is_active = user['is_active']
                existing_user.age = user['age']
                existing_user.gender = user['gender']
                existing_user.occupation = user['occupation']
                existing_user.zip_code = user['zip_code']
                existing_user.save()  # Save the updates
            else:
                # If the user doesn't exist, create a new one
                CustomUser.objects.create(
                    id=user['id'],
                    username=user['name'],
                    email=user['email'],
                    password=user['password'],  # Ensure you're securely handling passwords
                    is_active=user['is_active'],
                    age=user['age'],
                    gender=user['gender'],
                    occupation=user['occupation'],
                    zip_code=user['zip_code']
                )
        except IntegrityError as e:
            # Handle any integrity errors (e.g., if there's a unique constraint issue)
            print(f"Error importing user {user['id']}: {e}")

# Function to import ratings
def import_ratings():
    ratings_data = load_json_file(os.path.join(settings.BASE_DIR, 'data', 'ratings_data.json'))
    for rating in ratings_data:
        user = CustomUser.objects.get(id=rating['user_id'])
        movie = Movie.objects.get(movie_id=rating['movie_id'])
        Rating.objects.create(
            user=user,
            movie=movie,
            rating=rating['rating'],
            timestamp=rating['timestamp']
        )
