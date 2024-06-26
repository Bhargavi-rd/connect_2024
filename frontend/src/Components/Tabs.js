import React, { useState } from 'react';
import Member from './Member';
import Pricing from './Pricing';
import './Tabs.css';
import { ReactComponent as SuperEarlyBirdIcon } from '../assets/earlybirds/SuperEarlyBird.svg';
import { ReactComponent as EarlyBirdIcon } from '../assets/earlybirds/EarlyBird.svg';
import { ReactComponent as StandardIcon } from '../assets/earlybirds/Standard.svg';
import { ReactComponent as OnEventDateIcon } from '../assets/earlybirds/OnEventDate.svg';

function Tabs() {
  const [activeTab, setActiveTab] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleEmailVerification = (isVerified) => {
    setIsEmailVerified(isVerified);
    if (!isVerified) {
      setActiveTab('nonmember');
    }
  };


  const nonMemberPricingPlans = [
    { title: 'Super Early Bird', price: '\u20B9 5000+GST', description: 'Available from 26th June 2024 till 31st July 2024', Icon: SuperEarlyBirdIcon, align: 'left' },
    { title: 'Early Bird', price: '\u20B9 6000+GST', description: 'Available from 1st August 2024 till 31st August 2024', Icon: EarlyBirdIcon, align: 'right' },
    { title: 'Standard', price: '\u20B9 7000+GST', description: 'Available from 1st September 2024 till 15th September 2024', Icon: StandardIcon, align: 'left' },
    { title: 'On Event Date', price: '\u20B9 8000+GST', description: 'Available on the event date', Icon: OnEventDateIcon, align: 'right' },
  ];

  const researchPricingPlans = [
    { title: 'Early Bird', price: '\u20B9 4000+GST', description: 'Available from 26th June 2024 till 31st July 2024', Icon: EarlyBirdIcon, align: 'right' },
    { title: 'Standard', price: '\u20B9 5000+GST', description: 'Available from 1st August 2024 till 31st August 2024', Icon: StandardIcon, align: 'left' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'member':
        return <Member onEmailVerification={handleEmailVerification} />;
      case 'nonmember':
        return <Pricing pricingPlans={nonMemberPricingPlans} />;
      case 'research':
        return <Pricing pricingPlans={researchPricingPlans} />;
      default:
        return <></>;
    }
  };

  return (
    <div className="tabs">
      <div className="tab-buttons">
        <button className={`tab-button ${activeTab === 'member' ? 'active' : ''}`} onClick={() => setActiveTab('member')}>Member</button>
        <button className={`tab-button ${activeTab === 'nonmember' ? 'active' : ''}`} onClick={() => setActiveTab('nonmember')}>Nonmember</button>
        <button className={`tab-button ${activeTab === 'research' ? 'active' : ''}`} onClick={() => setActiveTab('research')}>Research Paper</button>
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Tabs;
