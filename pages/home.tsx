import React from 'react';
import RequirementsCard from '../Components/studyRequirementsCard'
import Paypal from '../Components/PayPal';

const Home: React.FC = () => {
  return (

    <div>
      <div>
        <Paypal studyId={'jd1kQsORcZkDgQnlZTjt'} ResearcherId={'9XCri3v9uFTN5RgDQVszan3iKp23'} department={'Computer Science'} participantId={'PNeqhkPm0Le0LcfOK1caYeVoCYB3'}/>
        <h1>Home Page</h1>
        <p>Welcome to the home page!</p>
      </div>

    </div>
  );
};

export default Home;