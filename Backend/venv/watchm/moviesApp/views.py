from django.http import HttpResponse
from django.shortcuts import render
from data.import_data import import_genres, import_movies, import_users, import_ratings
from rest_framework.decorators import api_view , permission_classes
from django.contrib.auth.decorators import login_required
from rest_framework import generics
from django.shortcuts import redirect
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from moviesApp.models import Movie, Genre , Rating
from moviesApp.serializers import MovieSerializer, GenreSerializer , CustomUserSerializer , RatingSerializer
from rest_framework.views import APIView
from moviesApp.recommender import recommend_movies_for_user
# Function to import genres via URL
# User 
User = get_user_model()
def import_genres_view(request):
    import_genres()
    return HttpResponse("Genres imported successfully!")

# Function to import movies via URL
def import_movies_view(request):
    import_movies()
    return HttpResponse("Movies imported successfully!")

# Function to import users via URL
def import_users_view(request):
    import_users()
    return HttpResponse("Users imported successfully!")

# Function to import ratings via URL
def import_ratings_view(request):
    import_ratings()
    return HttpResponse("Ratings imported successfully!")

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]
    
class UserDetailView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
class UserDashboardView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user

        #prepare user data
        user_data = {
            'id': user.id,
            'username': user.username,
            'is_staff': user.is_staff,
            'is_active': user.is_active
        }

        return Response(user_data)

class UserRatedMoviesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        # Fetch user's ratings, ordered by rating descending
        user_ratings = Rating.objects.filter(user=user).select_related('movie').order_by('-rating')
        serializer = RatingSerializer(user_ratings, many=True)
        return Response(serializer.data)

# Recommender 
class RecommendMoviesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id
        
        # Obtenir les recommandations
        recommended_ids = recommend_movies_for_user(user_id)
        recommended_movies_qs = Movie.objects.filter(movie_id__in=recommended_ids)

        # Sérialiser les recommandations
        serializer = MovieSerializer(recommended_movies_qs, many=True)

        # Récupérer les movie_id déjà notés par l'utilisateur
        rated_ids = list(
            Rating.objects.filter(user=request.user)
            .values_list('movie__movie_id', flat=True)
        )

        # Log pour debug
        movie_ids = [movie['movie_id'] for movie in serializer.data]
        print(f"[INFO] Recommended movies for user {user_id}: {movie_ids}")
        print(f"[INFO] Rated movie IDs for user {user_id}: {rated_ids}")

        return Response({
            "user_id": user_id,
            "recommendations": serializer.data,
            "rated_ids": rated_ids
        })
@login_required
def google_login_callback(request):
    user = request.user
    social_accounts = SocialAccount.objects.filter(user = user)
    print('Social Account for user:',social_accounts)
    social_account = social_accounts.first()
    if not social_account:
        print('No social account for user: ',user)
        return redirect('http://localhost:5173/login/callback/?error=NoSocialAccount')
    token = SocialToken.objects.filter(account = social_account,account__providers = 'google').first()
    if token : 
        print(f'Google token found : {token.token}')
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return redirect(f'http://localhost:5173/login/callback/?access_token={access_token}')
    else : 
        print('No Google Token found for user : ',user)
        return redirect(f'http://localhost:5173/login/callback/?error=NoGoogleToken')
@csrf_exempt
def validate_google_token(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            google_access_token = data.get('access_token')
            print(google_access_token)
            if not google_access_token :
                return JsonResponse({'detail':'Access Token is missing'},status=400)
            return JsonResponse({'valid': True})
        except json.JSONDecodeError :
            return JsonResponse({'detail':'invalid Json'},status=400)
    return JsonResponse({'detail':'Method not Allowed'},status=405)
# ----------------  THOSE VIEWS ARE PUBLIC  ---------------- 
# View to get all genres
@api_view(['GET'])
@permission_classes([AllowAny])
def getGenres(request):
    # Retrieve all genres from the database
    genres = Genre.objects.all()
    # Serialize the genre data
    serializer = GenreSerializer(genres, many=True)
    # Return a response with the serialized genre data
    return Response(serializer.data)

# View to get all movies
@api_view(['GET'])
@permission_classes([AllowAny])
def getMovies(request):
    # Retrieve all movies from the database
    movies = Movie.objects.all()
    # Serialize the movie data
    serializer = MovieSerializer(movies, many=True)
    # Return a response with the serialized movie data
    return Response(serializer.data)
@permission_classes([AllowAny])
@api_view(['GET'])
def getMoviesByGenre(request, genre_name):
    try:
        # Find the genre by the genre_name
        genre = Genre.objects.get(name=genre_name)
        
        # Get all movies that belong to this genre
        movies = genre.movie_set.all()  # 'movie_set' is automatically created by Django for reverse relationships
        
        # Serialize the movie data
        serializer = MovieSerializer(movies, many=True)
        
        # Return the serialized data
        return Response(serializer.data)

    except Genre.DoesNotExist:
        # If the genre doesn't exist, return a 404 error
        return Response({"error": "Genre not found"}, status=status.HTTP_404_NOT_FOUND)
@api_view(['GET'])
@permission_classes([AllowAny])
def get_movie_detail(request, movie_id):
    try:
        # Find the movie by its ID
        movie = Movie.objects.get(movie_id=movie_id)
        
        # Serialize the movie data
        serializer = MovieSerializer(movie)
        
        # Return the serialized data
        return Response(serializer.data)

    except Movie.DoesNotExist:
        # If the movie doesn't exist, return a 404 error
        return Response({"error": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)
 
