from django.contrib import admin
from .models import Genre, Movie, Rating
from django.contrib.auth import get_user_model

User = get_user_model()
admin.site.register(Genre)
admin.site.register(Movie)
admin.site.register(Rating)
admin.site.register(User)