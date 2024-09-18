import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify'; // Import dompurify for sanitizing HTML
import Header from './Header';
import Footer from './Footer';
import './Home.css'

const Privacy = () => {
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the privacy policy from the API
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await axios.get('https://api.hirdayam.com/api/getSettings', {
          params: {
            key: 'about_us',
          },
        });
        // Set the privacy policy data with some allowed HTML tags
        const sanitizedTerms = DOMPurify.sanitize(response.data.data.about_us || 'No terms and conditions found.', {
          ALLOWED_TAGS: ['p', 'b', 'i', 'strong', 'ul', 'li', 'ol', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], // Include heading tags

        });
        
        setAbout(sanitizedTerms);
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
      <Header />
      <>
      <h1 className='top text-center '>About Hirdayam</h1>
        <div className='mt-4' dangerouslySetInnerHTML={{ __html: about }}></div>
      </>
      <Footer />
    </>
  );
};

export default Privacy;
