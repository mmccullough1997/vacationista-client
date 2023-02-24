import { useEffect } from 'react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
// import getAutocompleteRecommendations from '../utils/data/autocompleteData';
// import getRecommendations from '../utils/data/recommendationData';

function Home() {
  const { user } = useAuth();

  useEffect(() => {
    // getRecommendations('spain').then((resp) => console.warn('yelp recommendations:', resp));
    // getAutocompleteRecommendations('spa').then((resp) => console.warn('autocomplete recommendations:', resp));
  }, []);

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
      <h1>Hello {user.displayName}! </h1>
      <p>Click the button below to logout!</p>
      <button className="btn btn-danger btn-lg copy-btn" type="button" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}

export default Home;
