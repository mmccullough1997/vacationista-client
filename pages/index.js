/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import getAutocompleteRecommendations from '../utils/data/autocompleteData';
import getRecommendations from '../utils/data/recommendationData';

function Home() {
  const { user } = useAuth();

  // User is signed in
  if (user) {
    useEffect(() => {
      getRecommendations('spain').then((resp) => console.warn('yelp recommendations:', resp));
      getAutocompleteRecommendations('spa').then((resp) => console.warn('autocomplete recommendations:', resp));
    }, [user]);

    return (
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Hello {user.first_name}! </h1>
        <p>Click the button below to logout!</p>
      </div>
    );
  }

  // User is not signed in
  useEffect(() => {
    console.warn('not signed in');
  }, [user]);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello</h1>
      <p>Click the button below to logout!</p>
    </div>
  );
}

export default Home;
