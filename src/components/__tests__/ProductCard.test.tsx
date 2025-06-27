import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../../context/CartContext';
import ProductCard from '../ProductCard';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 99.99,
  image: 'test-image.jpg',
  description: 'Test description',
  category: 'Test Category'
};

describe('ProductCard', () => {
  const renderWithCart = (component: React.ReactNode) => {
    return render(
      <CartProvider>
        {component}
      </CartProvider>
    );
  };

  it('renders product information correctly', () => {
    renderWithCart(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toBeInTheDocument();
  });

  it('adds product to cart when Add to Cart button is clicked', () => {
    renderWithCart(<ProductCard product={mockProduct} />);
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);
    
    // Verify cart state or UI updates
    expect(screen.getByText(/added to cart/i)).toBeInTheDocument();
  });

  it('handles image loading error gracefully', () => {
    const productWithInvalidImage = {
      ...mockProduct,
      image: 'invalid-image.jpg'
    };
    
    renderWithCart(<ProductCard product={productWithInvalidImage} />);
    
    const image = screen.getByAltText(mockProduct.name);
    fireEvent.error(image);
    
    expect(image).toHaveAttribute('src', 'fallback-image.jpg');
  });
}); 