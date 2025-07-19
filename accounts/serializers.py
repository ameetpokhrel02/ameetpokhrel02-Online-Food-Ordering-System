from rest_framework import serializers
from .models import Product, Blog


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = __import__('accounts.models', fromlist=['ContactMessage']).ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__' 