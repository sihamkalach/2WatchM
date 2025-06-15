from django.urls import path ,include
from moviesApp import views
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
urlpatterns = [
    path('import/genres/', views.import_genres_view, name='import_genres'),
    path('import/movies/', views.import_movies_view, name='import_movies'),
    path('import/users/', views.import_users_view, name='import_users'),
    path('import/ratings/', views.import_ratings_view, name='import_ratings'),
    path('api/movies',views.getMovies,name='getMovies'),
    path('api/genres',views.getGenres,name='getGenres'),
    path('api/genres/<str:genre_name>/movies/',views.getMoviesByGenre, name='getMoviesByGenre'),
    path('api/movie/<str:movie_id>/', views.get_movie_detail, name='get_movie_detail'),
    path('api/user-rated-movies/', views.UserRatedMoviesAPIView.as_view(), name='user-rated-movies'),
    path('api/recommendations/', views.RecommendMoviesView.as_view(), name='recommendations'),
    path('accounts/',include('allauth.urls')),
    path('api-auth/',include('rest_framework.urls')),
    path('auth/user/register/', views.UserCreate.as_view(),name='user_create'),
    path('auth/token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('auth/token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path('callback/', views.google_login_callback,name='callback'),
    path('auth/user/',views.UserDetailView.as_view(),name='user-detail'),
    path('auth/google/validate_token',views.validate_google_token,name='validate-token'),
    path('dashboard/', views.UserDashboardView.as_view(), name='dashboard'),
]