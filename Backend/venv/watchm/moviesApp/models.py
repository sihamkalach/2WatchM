from django.db import models
from django.contrib.auth.models import AbstractUser
# Movie Genre Model 
class Genre(models.Model):
    name = models.CharField(max_length=255)
    image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name
# Movie Model
class Movie(models.Model):
    movie_id = models.CharField(max_length=255, unique=True)
    movie_title = models.CharField(max_length=255)
    movie_genre = models.ManyToManyField(Genre)
    image_url = models.URLField(blank=True, null=True)
    def __str__(self):
        return self.movie_title
#User Model
class CustomUser(AbstractUser):
    age = models.IntegerField(null=True)
    gender = models.CharField(max_length=10)
    occupation = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=10)
    
    def __str__(self):
        return self.username
#Rating Model
class Rating(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rating = models.FloatField()
    timestamp = models.IntegerField()

    def __str__(self):
        return f"Rating by {self.user} for {self.movie}"

