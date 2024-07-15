import React, { useState }from 'react';
import { useParams } from 'react-router-dom';
import './Home.css';
import image9 from './images/image 13.png'
import image10 from './images/image 14.png'
import image11 from './images/image15.png'
import image12 from './images/image 13 (3).png'
import image13 from './images/image15.png'
import image14 from './images/image 16.png'
import image15 from './images/transparent.png'
import image16 from './images/image 15 1.png'
import image17 from './images/image 124.png'
import pinterest from './images/PinterestLogo.png'
import instagram from './images/InstagramLogo.png'
import facebook from './images/FacebookLogo.png'
import XLogo from './images/XLogo.png'
import location from './images/location.png'
import logo from './images/hridayam logo.png'
import search from './images/search.png'
import heart from './images/Heart.png'
import icon2 from './images/icon2.png'
import icon3 from './images/icon3.png'
import { Link } from 'react-router-dom';

const CardDetail = () => {
  const [cards, setCards] = useState([
    { id: 1, imageUrl: image9, price: '&#8377;1,200', description: "Veneer Wall Light" },
    { id: 2, imageUrl: image10, price: '&#8377;4,200', description: "Brass Diya" },
    { id: 3, imageUrl: image12, price: '&#8377;800', description: "Structured Curved Bill Cap" },
    { id: 4, imageUrl: image13, price: '&#8377;499', description: "Personalized Notebooks" },
    { id: 5, imageUrl: image14, price: '&#8377;80', height: '160px', description: "Win Connect Ball Pen Blue" },
    { id: 6, imageUrl: image15, price: '&#8377;1,500', description: "Acrylic Photo Frame A4" },
    { id: 7, imageUrl: image16, price: '&#8377;200', description: "Mug, dark turquoise" },
    { id: 8, imageUrl: image17, price: '&#8377;1,400', description: "Decor Fountain" },
  ]);
  const { id } = useParams();
  const [selectedCardId, setSelectedCardId] = useState(null);

  const handleCardClick = (id) => {
    setSelectedCardId(id);
  };

 
  // Fetch or retrieve card details based on id
  // You can use the id to fetch details from an API or state

  return (
    <>
     <div className="home-container">
        <div className="blue-background">
          <div className="images-container">
            <img src={pinterest} alt="Image 1" className="image" />
            <img src={instagram} alt="Image 2" className="image" />
            <img src={facebook} alt="Image 3" className="image" />
            <img src={XLogo} alt="Image 4" className="image" />
          </div>
          <div className="center-text">
            Free Shipping On All Us Orders Over Rs 499
          </div>
          <div className="locate-store">
            <img src={location} alt="Locate Icon" className="icon" />
            <span className='locate'>Locate Store</span>
          </div>
        </div>
      </div>
      <div className="navbar-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="search-container">
          <img src={search} alt="Search Icon" className="search-icon" />
          <input type="text" className="search-input" placeholder="Search product..." />
        </div>
        <div className="nav-img">
          <img src={heart} alt="heart" className="image" />
          <img src={icon2} alt="icon" className="image" />
          <img src={icon3} alt="icon 3" className="image" />
        </div>
      </div>
     <div>
      
      <p>Card ID: {id}</p>
      <div>
      
    </div>{cards
        .filter(card => selectedCardId === null || card.id === selectedCardId)
        .map(card => (
          <div key={card.id} className="card-wrapper">
            <div className="card1">
              <div className="card-header">
                <Link to={`/card/${card.id}`}>
                  <img 
                    src={card.imageUrl} 
                    alt="product" 
                    style={{ height: card.height }} 
                    className="card-image1" 
                    onClick={() => handleCardClick(card.id)} 
                  />
                </Link>
                <button
                  className="favorite-btn"
                  style={{
                    cursor: 'pointer',
                    border: 'none',
                    background: 'none',
                    padding: '5px',
                  }}
                  onClick={() => handleCardClick(card.id)}
                >
                  {/* Add your icon or favorite button content here */}
                </button>
              </div>
            </div>
            <div className="card-info">
              <p className="image-description">{card.description}</p>
              <p className='price'><span dangerouslySetInnerHTML={{ __html: card.price }} /></p>
            </div>
          </div>
        ))}
    </div>
    </>
  );
};

export default CardDetail;
