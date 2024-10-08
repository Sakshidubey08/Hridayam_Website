// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Header from './Header';
// import Footer from './Footer';
// const Privacy = () => {
//   const [terms, setTerms] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch the privacy policy from the API
//     const fetchPrivacyPolicy = async () => {
//       try {
//         const response = await axios.get('https://api.hirdayam.com/api/getSettings', {
//           params: {
//             key: 'terms_conditions',
//           },
//         });
//         // Set the privacy policy data
//         setTerms(response.data.data.terms_conditions || 'No terms and conditions found.');
//       } catch (err) {
//         // Handle errors
//         setError('Failed to load privacy policy');
//       } finally {
//         // Stop loading once data is fetched
//         setLoading(false);
//       }
//     };

//     fetchPrivacyPolicy();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <>
//     <Header/>
//     <div>
//       <p>{terms}</p>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default Privacy;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'
import DOMPurify from 'dompurify'; // Import dompurify for sanitizing HTML
import Header from './Header';
import Footer from './Footer';

const Privacy = () => {
  const [terms, setTerms] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the privacy policy from the API
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await axios.get('https://api.hirdayam.com/api/getSettings', {
          params: {
            key: 'terms_conditions',
          },
        });
        // Set the privacy policy data with some allowed HTML tags
        const sanitizedTerms = DOMPurify.sanitize(response.data.data.terms_conditions || 'No terms and conditions found.', {
          ALLOWED_TAGS: ['p', 'b', 'i', 'strong', 'ul', 'li', 'ol', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], // Include heading tags

        });
        
        setTerms(sanitizedTerms);
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
      <div>
      <h1 className='top text-center '>Terms and Condition</h1>
        <div className='mt-4' dangerouslySetInnerHTML={{ __html: terms }}></div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
