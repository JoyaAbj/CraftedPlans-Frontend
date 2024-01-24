import React, { useState, useEffect } from 'react';

const PriceCalculation = ({ selectedCover, startDate, endDate, selectedAddOns }) => {
  const [basePrice, setBasePrice] = useState(10); // Base price for the cover
  const pagePrice = 0.015; // Price per added page
  let totalPrice = basePrice; // Move totalPrice to the outer scope

  useEffect(() => {
    // Calculate the total price based on the selected cover, dates, and add-ons

    if (selectedCover && selectedCover.category === 'cover') {
      // Add price of the selected cover if it belongs to the 'cover' category
      totalPrice += selectedCover.price || 0;
    }

    if (startDate && endDate) {
      // Calculate the number of days between start and end date
      const daysDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
      
      // Add additional price for added pages
      const addedPagesPrice = daysDifference * pagePrice * Object.keys(selectedAddOns).length;
      totalPrice += addedPagesPrice;
    }

    console.log('Total Price:', totalPrice);

  }, [selectedCover, startDate, endDate, selectedAddOns]);

  return (
    <div className='top-left-container'>
      <div className="square">
        <p className="price">{`$${totalPrice.toFixed(2)}`}</p>
      </div>
    </div>
  );
};

export default PriceCalculation;
