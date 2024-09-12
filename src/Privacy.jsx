import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
const Privacy = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the privacy policy from the API
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await axios.get('https://api.hirdayam.com/api/getSettings', {
          params: {
            key: 'privacy_policy',
          },
        });
        // Set the privacy policy data
        setPrivacyPolicy(response.data.data.privacy_policy || 'No privacy policy found.');
      } catch (err) {
        // Handle errors
        setError('Failed to load privacy policy');
      } finally {
        // Stop loading once data is fetched
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <Header/>
    <div>
      <p>{privacyPolicy}</p>
    </div>
    <Footer/>
    </>
  );
};

export default Privacy;
