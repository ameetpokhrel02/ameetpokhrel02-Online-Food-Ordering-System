from django.db import models

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to='products/')
    description = models.TextField()
    category = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Blog(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to='blog/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
