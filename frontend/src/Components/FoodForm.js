import React, { useState } from 'react';
import './FoodForm.css'; 
import axios from 'axios';

const FoodForm = ({ email }) => {
  const [preferences, setPreferences] = useState({
    foodType: 'northIndian', // Default value
    drinkStatus: 'nonAlcohol', // Default value
    datePreferences: [
      { date: '2024-09-27', veg: true },
      { date: '2024-09-28', veg: true },
      { date: '2024-09-29', veg: true }
    ]
  });

  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDatePreferenceChange = (index, value) => {
    setPreferences(prevState => {
      const newDatePreferences = [...prevState.datePreferences];
      newDatePreferences[index].veg = value === 'true';
      return { ...prevState, datePreferences: newDatePreferences };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://connectapi.eduskillsfoundation.org/api/auth/update', {
        email,
        preferences
      });
      setSubmissionStatus('success');
    } catch (error) {
      console.error('Failed to update food preferences:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="food-form">
      {submissionStatus === 'success' ? (
        <p>Thank You</p>
      ) : (
        <>
          <h2>Food Preferences</h2>
          <form onSubmit={handleSubmit}>
            <h3>Cuisine Preference</h3>
            <label>
              Food Type:
              <select
                name="foodType"
                value={preferences.foodType}
                onChange={handleChange}
              >
                <option value="northIndian">North Indian</option>
                <option value="southIndian">South Indian</option>
              </select>
            </label>
  
            <h3>Drink Preference</h3>
            <label>
              Drink Status:
              <select
                name="drinkStatus"
                value={preferences.drinkStatus}
                onChange={handleChange}
              >
                <option value="alcohol">Alcohol</option>
                <option value="nonAlcohol">Non-Alcohol</option>
              </select>
            </label>
  
            <h3>Date-wise Food Preference</h3>
            {preferences.datePreferences.map((item, index) => (
              <div key={index}>
                <label>{item.date}</label>
                <select
                  value={item.veg}
                  onChange={(e) => handleDatePreferenceChange(index, e.target.value)}
                >
                  <option value="true">Veg</option>
                  <option value="false">Non-Veg</option>
                </select>
              </div>
            ))}
  
            <button type="submit">Submit</button>
          </form>
        </>
      )}
      {submissionStatus === 'error' && (
        <p>Failed to update food preferences. Please try again.</p>
      )}
    </div>
  );
  
};

export default FoodForm;
