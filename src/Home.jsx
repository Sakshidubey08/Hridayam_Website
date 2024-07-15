import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import group from './images/Group2.png'
import slider from './images/image 120.png'
import slider1 from './images/group3.png'
import slider2 from './images/image 123.png'
import icon5 from './images/icon5.png'
import icon6 from './images/icon6.png'
import icon7 from './images/icon7.png'
import image1 from './images/image 2.png'
import image2 from './images/image 3.png'
import image3 from './images/image 4.png'
import image4 from './images/image 6.png'
import image5 from './images/image 7.png'
import image6 from './images/image 8.png'
import image7 from './images/image 5.png'
import image8 from './images/image 9.png'
import image9 from './images/image 13.png'
import image10 from './images/image 14.png'
import image11 from './images/image15.png'
import image12 from './images/image 13 (3).png'
import image13 from './images/image15.png'
import image14 from './images/image 16.png'
import image15 from './images/transparent.png'
import image16 from './images/image 15 1.png'
import image17 from './images/image 124.png'
import image18 from './images/image19.png'
import image19 from './images/image20.png'
import image20 from './images/image21.png'
import image21 from './images/image22.png'
import image22 from './images/image23.png'
import image23 from './images/image 24.png'
import image24 from './images/image25.png'
import image25 from './images/image 125.png'
import image26 from './images/image 126.png'
import image27 from './images/image 16 (2).png'
import image28 from './images/bag.png'
import image29 from './images/image 13 (4).png'
import image30 from './images/image 24 (1).png'
import image31 from './images/image 124 (1).png'
import image32 from './images/Rectangle.png'
import group2 from './images/Group (6).png'
import group4 from './images/Group4.png'
import group5 from './images/group9.png'
import Footer from './Footer.jsx';
import { Link } from 'react-router-dom';
import group1 from './images/Group (5).png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import Slider from './Slider.jsx'
import TopPick from './TopPick.jsx'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.css';
import Header from './Header.jsx';




const Home = ({ handleFavoriteClick, handleFavoriteClick1, handleFavoriteClick2 }) => {
  const cardsData = [
    { id: 1, title: 'OUTDOOR <br/> DECOR', imageUrl: image1 },
    { id: 2, title: 'WALL <br/> DECOR', imageUrl: image2 },
    { id: 3, title: 'KITCHEN <br/> DECOR', imageUrl: image3 },
    { id: 4, title: 'BATHROOM <br/> DECOR', imageUrl: image4 },
    { id: 5, title: 'PRAYER <br/>  ESSENTIALS', imageUrl: image5 },
    { id: 6, title: 'WALL LIGHT <br/> DECOR', imageUrl: image6 },
    { id: 7, title: 'CORPORATE <br/>GIFTS', imageUrl: image7 },
    { id: 8, title: 'ACRYLIC <br/> FRAME', imageUrl: image8 }
  ];


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
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    switch (id) {
      case 1:
        navigate('/product3');
        break;
      case 2:
        navigate('/product4');
        break;
      case 3:
        navigate('/product1');
        break;
      case 4:
        navigate('/product5');
        break;
      case 5:
        navigate('/product6');
        break;
      case 6:
        navigate('/product2');
        break;
      case 7:
        navigate('/product7');
        break;
      case 8:
        navigate('/product8');
        break;
      default:
        break;
    }
  };

  const [cards1, setCards1] = useState([
    { id: 1, imageUrl: image18, price: '&#8377;1,200', height: '200px', description: "Double Canopy Umbrella" },
    { id: 2, imageUrl: image19, price: '&#8377;4,200', description: "Water Bottle" },
    { id: 3, imageUrl: image20, price: '&#8377;800', description: "Fogg Deodorant Men" },
    { id: 4, imageUrl: image21, price: '&#8377;499', description: "Men Plain Slim Fit Shirt" },
    { id: 5, imageUrl: image22, price: '&#8377;80', description: "Men White Shoes" },
    { id: 6, imageUrl: image10, price: '&#8377;1,500', description: "Brass Diya" },
    { id: 7, imageUrl: image23, price: '&#8377;200', description: "Skybags" },
    { id: 8, imageUrl: image17, price: '&#8377;1,400', description: "Decor Fountain" },
  ]);
  const [cards2, setCards2] = useState([
    { id: 1, imageUrl: image24, price: '&#8377;1,200', height: '200px', description: "Double Canopy Umbrella" },
    { id: 2, imageUrl: image25, price: '&#8377;4,200', description: "Water Bottle" },
    { id: 3, imageUrl: image26, price: '&#8377;800', description: "Fogg Deodorant Men" },
    { id: 4, imageUrl: image27, price: '&#8377;499', description: "Men Plain Slim Fit Shirt" },
    { id: 5, imageUrl: image28, price: '&#8377;80', description: "Men White Shoes" },
    { id: 6, imageUrl: image29, price: '&#8377;1,500', description: "Brass Diya" },
    { id: 7, imageUrl: image30, price: '&#8377;200', height: '110px', description: "Skybags", position: 50 },
    { id: 8, imageUrl: image31, price: '&#8377;1,400', height: '150px', description: "Decor Fountain", position: 28 },
  ]);
  const [cards3, setCards3] = useState([
    { id: 1, imageUrl: image24, price: '&#8377;1,200', height: '200px', description: "Double Canopy Umbrella" },
    { id: 2, imageUrl: image25, price: '&#8377;4,200', description: "Water Bottle" },
    { id: 3, imageUrl: image26, price: '&#8377;800', description: "Fogg Deodorant Men" },
    { id: 4, imageUrl: image27, price: '&#8377;499', description: "Men Plain Slim Fit Shirt" },
    { id: 5, imageUrl: image28, price: '&#8377;80', description: "Men White Shoes" },
    { id: 6, imageUrl: image29, price: '&#8377;1,500', description: "Brass Diya" },
    { id: 7, imageUrl: image30, price: '&#8377;200', height: '110px', description: "Skybags", position: 50 },
    { id: 8, imageUrl: image31, price: '&#8377;1,400', height: '150px', description: "Decor Fountain", position: 28 },
  ]);

  const [favoriteCards, setFavoriteCards] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const handleFavoriteButtonClick = (id, e) => {
    e.stopPropagation(); // Prevent event propagation
    setFavoriteCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    e.preventDefault();
    const selectedCard = cards.find(card => card.id === id);
    if (selectedCard) {
      setWishlist([...wishlist, selectedCard]);
    }
  };
  const [favoriteCards1, setFavoriteCards1] = useState({});

  const handleFavoriteButtonClick1 = (cardId) => {
    setFavoriteCards1((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));

    if (handleFavoriteClick1) {
      handleFavoriteClick1(cardId);
    }
  };
  const [favoriteCards2, setFavoriteCards2] = useState({});

  const handleFavoriteButtonClick2 = (cardId) => {
    setFavoriteCards2((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));

    if (handleFavoriteClick2) {
      handleFavoriteClick2(cardId);
    }
  };
  const [showLoadMore, setShowLoadMore] = useState(true);

  const handleLoadMore = () => {

    setCards(prevCards => [
      ...prevCards,
      { id: 9, imageUrl: image9, price: ' &#8377;45' },
      { id: 10, imageUrl: image9, price: '$55' },
      { id: 11, imageUrl: image9, price: '$70' },
      { id: 12, imageUrl: image9, price: '$80' },

    ]);
    setShowLoadMore(false); // Disable load more button after adding cards (for demo)
  };

  const [showLoadMore1, setShowLoadMore1] = useState(true);

  const handleLoadMore1 = () => {
    setCards1(prevCards => [
      ...prevCards,
      { id: 9, imageUrl: image9, price: ' &#8377;45' },
      { id: 10, imageUrl: image9, price: '$55' },
      { id: 11, imageUrl: image9, price: '$70' },
      { id: 12, imageUrl: image9, price: '$80' },

    ]);
    setShowLoadMore1(false); // Disable load more button after adding cards (for demo)
  };
  const [showLoadMore2, setShowLoadMore2] = useState(true);

  const handleLoadMore2 = () => {
    setCards2(prevCards => [
      ...prevCards,
      { id: 9, imageUrl: image9, price: ' &#8377;45' },
      { id: 10, imageUrl: image9, price: '$55' },
      { id: 11, imageUrl: image9, price: '$70' },
      { id: 12, imageUrl: image9, price: '$80' },

    ]);
    setShowLoadMore2(false);
  };
  const [showLoadMore3, setShowLoadMore3] = useState(true);
  const handleLoadMore3 = () => {
    setCards3(prevCards => [
      ...prevCards,
      { id: 9, imageUrl: image9, price: ' &#8377;45' },
      { id: 10, imageUrl: image9, price: '$55' },
      { id: 11, imageUrl: image9, price: '$70' },
      { id: 12, imageUrl: image9, price: '$80' },

    ]);
    setShowLoadMore3(false);
  };

  return (
    <>
      <Header />
      <div class="menu-container">
        <div class="menu-item">
          <div class="menu-heading">Corporate Gifting</div>
          <div class="submenu">
            <div class="submenu-item">Drinkware</div>
            <div class="submenu-item">Handbag</div>
            <div class="submenu-item">Chocolate</div>
            <div class="submenu-item">Backpacks</div>
            <div class="submenu-item">Smartwatches</div>
            <div class="submenu-item">Branded apparel</div>
          </div>
        </div>
        <div class="menu-item">
          <div class="menu-heading">Home Decorations</div>
          <div class="submenu2">
            <div class="submenu-item">
              <div class="submenu-heading">Hall Decor</div>
              <div class="sub-points">
                <div class="sub-point">Wall Scenery</div>
                <div class="sub-point">Sofas </div>
                <div class="sub-point">Pendulum Clocks</div>
                <div class="sub-point">LED Mirror</div>
              </div>
            </div>
            <div class="submenu-item">
              <div class="submenu-heading">Kitchen Decor</div>
              <div class="sub-points">
                <div class="sub-point">Dinnerware sits</div>
                <div class="sub-point">Coasters & Trivets</div>
                <div class="sub-point">Curtains</div>
                <div class="sub-point">Curtains</div>
                <div class="sub-point">Tea Cups & Saucer Sets</div>
              </div>
            </div>
            <div class="submenu-item">
              <div class="submenu-heading">Table Decor</div>
              <div class="sub-points">
                <div class="sub-point">Decorative Boxes</div>
                <div class="sub-point">Desk Organizers</div>
                <div class="sub-point">Pen Stands</div>
                <div class="sub-point">Bookends</div>
                <div class="sub-point">Accessory Holders</div>

              </div>
            </div>
            <div class="submenu-item">
              <div class="submenu-heading">Kids Decor</div>
              <div class="sub-points">
                <div class="sub-point">Wall Shelves</div>
                <div class="sub-point">Clocks</div>
                <div class="sub-point">Wall Art </div>
                <div class="sub-point">Height Chart</div>
                <div class="sub-point">Bookends</div>
                <div class="sub-point">Picture Frames</div>

              </div>
            </div>
            <div class="submenu-item">
              <div class="submenu-heading">Festival Decor</div>
              <div class="sub-points">
                <div class="sub-point">Tarans </div>
                <div class="sub-point">Rangolis</div>
                <div class="sub-point">Christmas Decoration</div>
              </div>
            </div>
          </div>
        </div>
        <div class="menu-item">
          <div class="menu-heading">Birthday Celebration</div>
          <div class="submenu">
            <div class="submenu-item">Baloons</div>
            <div class="submenu-item">Happy Birthday Banner</div>
            <div class="submenu-item">Foil Curtain</div>
            <div class="submenu-item">Cupcake Stand</div>
            <div class="submenu-item">Paper Hat</div>
            <div class="submenu-item">Decoration</div>

          </div>
        </div>
        <div class="menu-item">
          <div class="menu-heading">Acrylic Photoframe</div>
          <div class="submenu">
            <div class="submenu-item">Acrylic Photo frame</div>
          </div>
        </div>
      </div>
      <div className='swiper-background relative top-4'>
        <img src={group} alt="" className='group hidden md:block' />

        <div className="w-full max-w-[70rem] mx-auto px-4">
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper w-full h-full"
          >
            <SwiperSlide>
              <img src={slider} className="block w-full h-auto max-h-[60vh] object-cover" alt="slide1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={slider1} className="block w-full h-auto max-h-[60vh] object-cover" alt="slide2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={slider2} className="block w-full h-auto max-h-[60vh] object-cover" alt="slide3" />
            </SwiperSlide>
          </Swiper>

          <div className='image-box bg-white flex z-10 justify-around items-center absolute left-0 right-0 mx-auto md:left-auto md:right-auto top-[13.3rem] md:top-[13.3rem]'>
            <div className='image-item'>
              <img src={icon5} alt="" className='box-image' />
              <p className='image-description text-sm md:text-base'>1 million + customer</p>
            </div>
            <div className='image-item'>
              <img src={icon6} alt="" className='box-image' />
              <p className='image-description text-sm md:text-base'>3 days return</p>
            </div>
            <div className='image-item'>
              <img src={icon7} alt="" className='box-image' />
              <p className='image-description text-sm md:text-base'>Free Shipping</p>
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-4 sm:mx-8 md:mx-20 mt-52">
        {cardsData.map((card) => (
          <div key={card.id} className="relative bg-gray-200 w-full h-52 sm:h-54 md:h-80 lg:h-82 lg:w-53">
            <img  src={card.imageUrl} className="object-cover w-full h-full" alt={card.title} />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <h5 style={{fontFamily:'Rosarivo'}} className="text-white text-center text-2xl pt-60" dangerouslySetInnerHTML={{ __html: card.title }}></h5>
            </div>
          </div>
        ))}
      </div>


      <div className='selling'>
        <h1 className='best'>Best Selling</h1>
        <h1 className='top'>Top Rated and Bestselling</h1>
        <div className="card-container">
          {cards.map(card => (
            <div key={card.id} className="card-wrapper"
              style={{ cursor: 'pointer' }}>
              <div className="card1">
                <div className="card-header">
                  <img src={card.imageUrl} alt="product" style={{ height: card.height }} className="card-image1" onClick={() => handleCardClick(card.id)} />
                  <button
                    className="favorite-btn"
                    onClick={(e) => handleFavoriteButtonClick(card.id, e)}
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      background: 'none',
                      padding: '5px',
                    }}
                  >
                    <i
                      className={`fa-heart ${favoriteCards[card.id] ? 'fas' : 'far'}`}
                      style={{ color: favoriteCards[card.id] ? 'red' : '#23387A', fontSize: '24px' }}
                    ></i>
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
        {showLoadMore && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
      <div>
        <img src={group1} className="group1" alt="Group Image" /></div>
      <div className="relative ">
        
        <div className="promo-content bg-[#9CA5C3] text-white p-6 md:p-8 lg:p-10 max-w-screen-lg mx-auto relative z-10">
          <div className="discount-text text-2xl md:text-3xl lg:text-4xl text-left mb-4 md:mb-6 lg:mb-8">
            Get Discount 20% off
          </div>
          <div className="subscribe-form flex flex-col md:flex-row items-left justify-start gap-4 mb-4 md:mb-6">
            <input type="email" placeholder="Enter your email address" className="w-full md:w-64 lg:w-80 h-10 px-4 border border-gray-300 text-gray-900" />
            <button className="subscribe-button h-10 px-6 bg-[#23387A] text-white    hover:bg-[#1d2a5f]">
              Subscribe
            </button>
          </div>
          <p className="promo-paragraph text-sm md:text-base lg:text-lg leading-relaxed ml-[32rem] text-left">
            The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers.
          </p>
        </div>
      </div>

       <div className='selling mt-96'>
        <h3 className='best'>New Arrivals</h3>
        <h1 className='top'>Discover the Latest Trends</h1>
        <div className="card-container">
          {cards1.map(card => (
            <div key={card.id} className="card-wrapper">
              <div className="card1">
                <div className="card-header">
                  <img src={card.imageUrl} alt="product" style={{ height: card.height }} className="card-image1" />
                  <button
                    className="favorite-btn"
                    onClick={() => handleFavoriteButtonClick1(card.id)}
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      background: 'none',
                      padding: '5px',

                    }}
                  >
                    <i
                      className={`fa-heart ${favoriteCards1[card.id] ? 'fas' : 'far'}`}
                      style={{ color: favoriteCards1[card.id] ? 'red' : '#23387A', fontSize: '24px' }}
                    ></i>
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

        {showLoadMore1 && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={handleLoadMore1}>
              Load More
            </button>
          </div>
        )}
      </div> 
      <div>
        <img src={group2} className='group2' />
        <div className='selling1'>
          <h3 className='best'>Customizable Products</h3>
          <h1 className='top'>Looking for Personal Touch</h1>
          <div className="card-container">
            {cards2.map(card => (
              <div key={card.id} className="card-wrapper">
                <div className="card1">
                  <div className="card-header">
                    <img src={card.imageUrl} alt="product" style={{ height: card.height, position: 'relative', top: `${card.position}px` }} className="card-image1" />
                    <button
                      className="favorite-btn"
                      onClick={() => handleFavoriteButtonClick2(card.id)}
                      style={{
                        cursor: 'pointer',
                        border: 'none',
                        background: 'none',
                        padding: '5px',
                      }}
                    >
                      <i
                        className={`fa-heart ${favoriteCards2[card.id] ? 'fas' : 'far'}`}
                        style={{ color: favoriteCards2[card.id] ? 'red' : '#23387A', fontSize: '24px' }}
                      ></i>
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

          {showLoadMore2 && (
            <div className="load-more-container">
              <button className="load-more-btn" onClick={handleLoadMore2}>
                Load More
              </button>
            </div>
          )}
        </div>
        <div>
          <img src={group4} alt="" className='group4' />
        </div>
      </div>
      <div className='selling2 mt-24'>
        <h3 className='best'>Limited Period Offer</h3>
        <h1 className='top'>Coming Soon - Pre Book Now!</h1>
        <div className="card-container">
          {cards2.map(card => (
            <div key={card.id} className="card-wrapper">
              <div className="card1">
                <div className="card-header">
                  <img src={card.imageUrl} alt="product" style={{ height: card.height, position: 'relative', top: `${card.position}px` }} className="card-image1" />
                  <button
                    className="favorite-btn"
                    onClick={() => handleFavoriteButtonClick2(card.id)}
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      background: 'none',
                      padding: '5px',

                    }}
                  >
                    <i
                      className={`fa-heart ${favoriteCards2[card.id] ? 'fas' : 'far'}`}
                      style={{ color: favoriteCards2[card.id] ? 'red' : '#23387A', fontSize: '24px' }}
                    ></i>
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

        {showLoadMore3 && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={handleLoadMore3}>
              Load More
            </button>
          </div>
        )}
      </div>
      <div>
        <img src={group} className='group6' />
        <Slider />
        <h3 className='best2'>Why Choose Us</h3>
        <h1 className='top2'>Trust and Quality You Can Rely On</h1>
      </div>
      <div className="content">
        <img src={image32} className="leftImage" alt="Left Side" />
        <div className="rightContent">
          <div className="headingSection">
            <h2>Unmatched Quality</h2>
            <p>We pride ourselves on delivering the highest quality products. Our<br /> corporate gifting items and custom acrylic photo frames are crafted with <br />meticulous attention to detail, ensuring a premium look and feel that<br /> stands out.</p>
          </div>
          <div className="headingSection">
            <h2>Customization Options</h2>
            <p>We understand that every client has unique needs. That’s why we offer<br /> extensive customization options. From personalized corporate gifts to<br /> bespoke acrylic photo frames, we work closely with you to bring your<br /> vision to life.
            </p>
          </div>
          <div className="headingSection">
            <h2>Fast Turnaround Times</h2>
            <p>We know that time is of the essence. Our efficient production process<br /> ensures quick turnaround times without compromising on quality.<br /> Whether you need a last-minute corporate gift or a custom photo frame,<br /> we’ve got you covered.</p>
          </div>
          <div className="headingSection">
            <h2>Eco-Friendly Practices</h2>
            <p>We care about the environment. Our sustainable practices and eco-<br />friendly materials ensure that our products are not only beautiful but also <br />environmentally responsible. By choosing us, you contribute to a greener<br /> future.</p>
          </div>
          <div className="headingSection">
            <h2>Trusted by Leading Brands</h2>
            <p>We have had the privilege of working with some of the top brands in the<br /> industry. Our reputation for excellence and reliability has made us the<br /> preferred choice for corporate gifting and custom photo framing<br /> solutions.</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className='best3'>Offers</h3>
        <h1 className='top3'>Top Picks for Winters</h1>
        <TopPick />
      </div>

      {/* <img src={group5} className='group5' />  */}
       <Footer /> 

    </>
  );
}

export default Home;
