from django.test import TestCase
from .models import Product, Blog

# Create your tests here.

class ProductModelTest(TestCase):
    def test_create_product(self):
        product = Product.objects.create(
            name='Test Product',
            price=9.99,
            image='products/test.jpg',
            description='Test description',
            category='TestCat'
        )
        self.assertEqual(product.name, 'Test Product')

class BlogModelTest(TestCase):
    def test_create_blog(self):
        blog = Blog.objects.create(
            title='Test Blog',
            content='Test content',
            image='blog/test.jpg'
        )
        self.assertEqual(blog.title, 'Test Blog')
