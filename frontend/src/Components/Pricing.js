// Pricing.js

import React from 'react';
import './Pricing.css';
import axios from 'axios';

function Pricing({ pricingPlans, email, onPaymentSuccess }) {
  const currentDate = new Date();

  const parseDate = (description) => {
    const dateMatch = description.match(/(\d{1,2})(?:st|nd|rd|th)? (\w+ \d{4})/g);
    if (!dateMatch) return null;

    const cleanDate = (dateStr) => {
      return dateStr.replace(/(\d{1,2})(?:st|nd|rd|th)/, '$1');
    };

    if (dateMatch.length === 1) {
      return new Date(cleanDate(dateMatch[0]));
    }

    if (dateMatch.length === 2) {
      const fromDate = new Date(cleanDate(dateMatch[0]));
      const toDate = new Date(cleanDate(dateMatch[1]));
      return { fromDate, toDate };
    }

    if (description.includes('on the event date')) {
      return new Date('2024-09-27');
    }

    return null;
  };

  const isCardEnabled = (description) => {
    const dateRange = parseDate(description);

    if (!dateRange) return false;

    if (dateRange instanceof Date) {
      return currentDate <= dateRange;
    }

    const { fromDate, toDate } = dateRange;
    return currentDate >= fromDate && currentDate <= toDate;
  };

  const updateDatabase = async (orderId, amount) => {
    try {
      await axios.post('https://connectapi.eduskillsfoundation.org/api/auth/update', { orderId, amount, email, status: 1, paycheck: 1 });
      alert('Database updated successfully!');
    } catch (error) {
      console.error('Failed to update the database:', error);
      alert('Failed to update the database.');
    }
  };

  const handleCardClick = async (priceWithGST) => {
    try {
      const basePrice = parseInt(priceWithGST.replace(/[^\d]/g, ''), 10);

      const { data: order } = await axios.post('https://connectapi.eduskillsfoundation.org/api/auth/createOrder', { amount: basePrice * 100 });

      const options = {
        key: 'rzp_live_ZZo4Op09maGDTv',
        amount: order.amount,
        currency: order.currency,
        name: 'Merchant Name',
        description: 'Purchase Description',
        order_id: order.id,
        handler: async (response) => {
          try {
            const { data } = await axios.post('https://connectapi.eduskillsfoundation.org/api/auth/verifyPayment', response);
            if (data.status === 'success') {
              alert('Payment Verified!');
              await updateDatabase(order.id, order.amount);
              // Notify parent component (e.g., Member.js) of successful payment
              onPaymentSuccess();
            } else {
              alert('Payment Verification Failed!');
            }
          } catch (error) {
            console.error('Payment verification request failed:', error);
            alert('Payment Verification Failed!');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Customer Address',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      alert('Payment initiation failed. Please try again later.');
    }
  };

  return (
    <div className="pricing-container">
      {pricingPlans.map((plan, index) => (
        <div
          key={index}
          className={`pricing-card ${plan.align === 'right' ? 'reverse' : ''} ${isCardEnabled(plan.description) ? '' : 'disabled'}`}
          onClick={() => isCardEnabled(plan.description) && handleCardClick(plan.price)}
        >
          <div className="card-content">
            <plan.Icon className="card-icon" />
            <div className="card-text">
              <h3>{plan.title}</h3>
              <p className="price">{plan.price}</p>
              <p>{plan.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Pricing;
