import React from 'react';
import RequirementsCard from '../Components/studyRequirementsCard'
import Paypal from '../Components/PayPal';
import FeedbackListViewer from '../Components/Ethics/RatingFeedBackViewer'

const Home: React.FC = () => {
  return (

    <div>
      <div>
        <FeedbackListViewer/>
        <h1>Home Page</h1>
        <p>Welcome to the home page!</p>
      </div>

    </div>
  );
};

export default Home;