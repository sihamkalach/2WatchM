from rest_framework import serializers
from moviesApp.models import CustomUser, Genre, Movie, Rating
from django.contrib.auth import get_user_model

# Get the CustomUser model
CustomUser = get_user_model()

# Serializer for CustomUser
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'age', 'gender', 'occupation', 'zip_code']
        extra_kwargs = {'password': {'write_only': True}}  # Hide password in responses

# Serializer for Genre
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name', 'image']

# Serializer for Movie
class MovieSerializer(serializers.ModelSerializer):
    movie_genre = GenreSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ['id', 'movie_id', 'movie_title', 'movie_genre', 'image_url']

# Serializer for Rating
class RatingSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    movie = MovieSerializer(read_only=True)

    class Meta:
        model = Rating
        fields = ['id', 'user', 'movie', 'rating', 'timestamp']
