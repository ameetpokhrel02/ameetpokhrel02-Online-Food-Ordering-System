from django.shortcuts import render
from rest_framework import generics
from .models import Product, Blog
from .serializers import ProductSerializer, BlogSerializer

# Create your views here.

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class BlogListCreateView(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
