import React, { useState } from 'react';
import './Member.css';
import Pricing from './Pricing';
import FoodForm from './FoodForm'; // Assuming you have a FoodForm component

import { ReactComponent as SuperEarlyBirdIcon } from '../assets/earlybirds/SuperEarlyBird.svg';
import { ReactComponent as EarlyBirdIcon } from '../assets/earlybirds/EarlyBird.svg';
import { ReactComponent as StandardIcon } from '../assets/earlybirds/Standard.svg';
import { ReactComponent as OnEventDateIcon } from '../assets/earlybirds/OnEventDate.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const MemberNonComplimentaryPricingPlans = [
  { title: 'Super Early Bird', price: '\u20B9 3000+GST', description: 'Available from 26th June 2024 till 31st July 2024', Icon: SuperEarlyBirdIcon, align: 'left' },
  { title: 'Early Bird', price: '\u20B9 4000+GST', description: 'Available from 1st August 2024 till 31st August 2024', Icon: EarlyBirdIcon, align: 'right' },
  { title: 'Standard', price: '\u20B9 5000+GST', description: 'Available from 1st September 2024 till 15th September 2024', Icon: StandardIcon, align: 'left' },
  { title: 'On Event Date', price: '\u20B9 6000+GST', description: 'Available on the event date', Icon: OnEventDateIcon, align: 'right' },
];

function Member({ onEmailVerification }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    phoneNo: '',
    email: '',
    instituteName: ''
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [redirectToPricing, setRedirectToPricing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupReg, setShowPopupReg] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Track registration success

  const handleEmailVerification = async () => {
    try {
      const response = await fetch('https://connectapi.eduskillsfoundation.org/api/auth/verifyEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const responseData = await response.json();
      if (responseData.status) {
        if (responseData.data.rows.status === 1 && responseData.data.result.mem === '1') {
          setIsEmailVerified(true);
          setError('');
          setShowPopup(true);  // Show popup on successful complimentary package verification
          handlePopupOpen();
          onEmailVerification(true);
        } else if (responseData.data.rows.status === 2 && responseData.data.result.mem === 1) {
          setIsEmailVerified(true);
          setRedirectToPricing(true);
        }
      } else {
        setError('Invalid email address.');
        onEmailVerification(false);
      }
    } catch (error) {
      setError('An error occurred during verification. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(name === 'email' ? value : email); // Sync the email field
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://connectapi.eduskillsfoundation.org/api/auth/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.status) {
        setRegistrationSuccess(true); // Set registration success flag
        setShowPopupReg(true); // Show popup on successful registration
        setRedirectToPricing(false); // Ensure redirectToPricing is set to false
      } else {
        setError(data.message || 'An error occurred during registration.');
      }
    } catch (error) {
      setError('An error occurred during registration. Please try again.');
    }
  };
  
  const handlePopupClose = () => {
    setShowPopup(false);
    setShowPopupReg(false);
  };

  const handlePopupOpen = () => {
    setShowPopup(true);
  };

  const handlePaymentSuccess = () => {
    setRedirectToPricing(false); // Ensure redirectToPricing is set to false
  };

  return (
    <div className={`member-tab ${showPopup ? 'popup-visible' : ''}`}>
      <div className="background-container">
        {!isEmailVerified ? (
          <div className="email-verification">
            <h3>Email Verification</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              name="email"
              onChange={handleChange}
            />
            {error && <p className="error">{error}</p>}
            <button onClick={handleEmailVerification}>Verify</button>
          </div>
        ) : redirectToPricing ? (
          <Pricing pricingPlans={MemberNonComplimentaryPricingPlans} email={email} onPaymentSuccess={handlePaymentSuccess} />
        ) : (
          !registrationSuccess ? (
            <div className="registration-form">
              <h3>Registration Form</h3>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Name:
                  <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                  Designation:
                  <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
                </label>
                <label>
                  Phone Number:
                  <input type="number" name="phoneNo" value={formData.phoneNo} onChange={handleChange} />
                </label>
                <label>
                  Email:
                  <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                  Institute Name:
                  <input type="text" name="instituteName" value={formData.instituteName} onChange={handleChange} />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit">Register</button>
              </form>
            </div>
          ) : (
            <div className="food-form">
              <h3>Food Preferences</h3>
              <FoodForm email={email} /> {/* Render FoodForm component */}
            </div>
          )
        )}
      </div>
      {showPopupReg && (
        <>
          <div className="backdrop" />
          <div className="popup">
            <FontAwesomeIcon icon={faCheckCircle} size="3x" color="#4CAF50" />
            <h1>Congratulations</h1>
            <p>You have successfully Registered</p>
            <button onClick={handlePopupClose}>Close</button>
          </div>
        </>
      )}
      {showPopup && (
        <>
          <div className="backdrop" />
          <div className="popup">
            <FontAwesomeIcon icon={faCheckCircle} size="3x" color="#4CAF50" />
            <h1>Congratulations</h1>
            <p>You have successfully availed Complimentory Package!</p>
            <button onClick={handlePopupClose}>Close</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Member;
