import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useLocation, useNavigate } from 'react-router-dom';
import './AllP.css';
import Footer from './Footer';
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const categoryIds = query.get('ids')?.split(',');
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.hirdayam.com/api/getcategoryuser');
        const result = await response.json();

        console.log('Full Category API response:', result);

        if (result?.status && result?.data?.length > 0) {
          const allCategories = result.data;

          const filteredCategories = allCategories.filter(category => categoryIds.includes(category._id));

          console.log('Filtered Categories:', filteredCategories);
          setCategories(filteredCategories);
        } else {
          console.error('API response does not contain valid data or categories array.');
          setError('No categories found');
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setError('Error fetching categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  const handleCategoryClick = (category_id) => {
    navigate(`/category-products/${category_id}`); // Redirect to the products page with the selected category ID
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <Header />
      <div className="main-container">
        <div className='cards-container1'>
          
          {categories.map((category) => (
          <div
          key={category._id}
          className="card-wrapper"
          
        >
                <div className="card1">

                  <div className="card-header w-32 h-56 md:h-72   md:w-full">
                    {category.image ? (
                      
                      <img
                        src={category.image}
                        alt={category.name}
                        className="card-image1"
                        onClick={() => handleCategoryClick(category._id)} // Click event to navigate
                      />
                    ) : (
                      <div style={{ width: '100%', height: '150px', backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
                        <p>No Image Available</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="card-info">
                  <p className="image-description">{category.name}</p>
                </div>
              </div>
            
          ))}
          
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Category;
