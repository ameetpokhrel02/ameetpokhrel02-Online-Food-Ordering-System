import React from 'react';
import FoodGrid from '../components/FoodGrid';
import FoodCard from '../components/FoodCard';

const Menu: React.FC = () => {
  const handleOrder = () => {
    // Handle order logic
  };

  return (
    <FoodGrid>
      <FoodCard
        title="Classic Biryani"
        price={22}
        description="Aromatic rice dish with tender meat and spices"
        onOrder={handleOrder}
      />
      {/* Add more FoodCard components as needed */}
    </FoodGrid>
  );
};

export default Menu;