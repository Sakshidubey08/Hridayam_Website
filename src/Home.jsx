import React, { useState, useEffect, useContext } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import group from './images/Group2.png'
import slider from './images/image 120.png'
import slider1 from './images/group3.png'
import slider2 from './images/image 123.png'
import icon5 from './images/icon5.png'
import icon6 from './images/icon6.png'
import icon7 from './images/icon7.png'
import image9 from './images/image 13.png'
import image10 from './images/image 14.png'
import image11 from './images/image15.png'
import image12 from './images/image 13 (3).png'
import image13 from './images/image15.png'
import image14 from './images/image 16.png'
import image15 from './images/transparent.png'
import image16 from './images/image 15 1.png'
import image17 from './images/image 124.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Slider2 from "react-slick";
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
import group2 from './images/Group (8).png'
import group4 from './images/Group4.png'
import group5 from './images/group9.png'
import headerslider from "./images/headerslide.svg"
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
import Catalog from './Catalog/Catalog.jsx';
import { WishlistContext } from './WishlistContext';
import axios from 'axios';
import { useProductContext } from './context/Bestproduct.jsx';
import SwiperCore from 'swiper';

SwiperCore.use([Navigation]);

const Home = ({ handleFavoriteClick, handleFavoriteClick1, handleFavoriteClick2 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, products } = useProductContext();
  
  // console.log(products)
  // const menuItems = [
  //   { heading: 'Corporate Gifting' },
  //   { heading: 'Home Decorations' },
  //   { heading: 'Birthday Celebration' },
  //   { heading: 'Birthday Celebration' },
  //   { heading: 'Birthday Celebration' },
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3; // Number of items to show at once

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, menuItems.length - itemsToShow));
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  // ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.hirdayam.com/api/getcategoryuser');
        const result = await response.json();
        if (result.status) {
          // Map the API data to the desired format for Swiper
          const categories = result.data.map(category => ({
            id: category._id,
            heading: category.name,
            image: category.image,
          }));
          setMenuItems(categories);
        } else {
          console.error('Failed to fetch categories:', result.message);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);
  const [menuItems, setMenuItems] = useState([]);
  const [subcategories, setSubcategories] = useState({}); // Store subcategories by category ID
  const [dropdownOpen, setDropdownOpen] = useState(null); // Track which dropdown is open
  // const handleHeadingClick = async (categoryId) => {
  //   setDropdownOpen(prev => (prev === categoryId ? null : categoryId)); // Toggle dropdown
  //   if (!subcategories[categoryId]) {
  //     try {
  //       const response = await fetch(`https://hridayam.dasoclothings.in/api/getSubCategoryByCategory?category_id=${categoryId}`);
  //       const result = await response.json();
  //       if (result.status) {
  //         setSubcategories(prev => ({
  //           ...prev,
  //           [categoryId]: result.data.map(subcategory => subcategory.name), // Store subcategory names
  //         }));
  //       } else {
  //         console.error('Failed to fetch subcategories:', result.message);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching subcategories:', error);
  //     }
  //   }
  // };
  const handleHeadingClick = async (categoryId) => {
    setDropdownOpen(prev => (prev === categoryId ? null : categoryId)); // Toggle dropdown
    if (!subcategories[categoryId]) {
      try {
        const response = await fetch(`https://api.hirdayam.com/api/getSubCategoryByCategory?category_id=${categoryId}`);
        const result = await response.json();
        if (result.status) {
          setSubcategories(prev => ({
            ...prev,
            [categoryId]: result.data // Ensure this is an array of subcategory objects
          }));
        } else {
          console.error('Failed to fetch subcategories:', result.message);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    }
  };
  
  const handleSubcategoryClick = async (subCategoryId) => {
    navigate(`/sub-category-products/${subCategoryId}`); // Navigate to products page
  };

  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios.get('https://api.hirdayam.com/api/getbestsellingproduct')
      .then(response => {
        const { data } = response;
        if (data.status) {
          // Format the data as required
          const formattedCards = data.data.map(product => ({
            id: product._id,
            imageUrl: product.image,
            price: `&#8377;${parseFloat(product.price).toFixed(2)}`,
            description: product.name,
          }));
          setCards(formattedCards);
        } else {
          // Handle error or empty state
          console.error('No data found');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  // const [cards, setCards] = useState([
  //   { id: 1, imageUrl: image9, price: '&#8377;1,200', description: "Veneer Wall Light" },
  //   { id: 2, imageUrl: image10, price: '&#8377;4,200', description: "Brass Diya" },
  //   { id: 3, imageUrl: image12, price: '&#8377;800', description: "Structured Curved Bill Cap" },
  //   { id: 4, imageUrl: image13, price: '&#8377;499', description: "Personalized Notebooks" },
  //   { id: 5, imageUrl: image14, price: '&#8377;80', height: '160px', description: "Win Connect Ball Pen Blue" },
  //   { id: 6, imageUrl: image15, price: '&#8377;1,500', description: "Acrylic Photo Frame A4" },
  //   { id: 7, imageUrl: image16, price: '&#8377;200', description: "Mug, dark turquoise" },
  //   { id: 8, imageUrl: image17, price: '&#8377;1,400', description: "Decor Fountain" },
  // ]);
  const [favoriteCards, setFavoriteCards] = useState(() => {
    // Load favoriteCards from localStorage when the component mounts
    const storedFavorites = localStorage.getItem('favoriteCards');
    return storedFavorites ? JSON.parse(storedFavorites) : {};
  });

  // const handleFavoriteButtonClick = (id, e, description) => {
  //   e.stopPropagation();

  //   setFavoriteCards((prev) => {
  //     const updatedFavorites = {
  //       ...prev,
  //       [id]: !prev[id],
  //     };

  //     const selectedCard = cards.find((card) => card.id === id);
  //     console.log(selectedCard.description + "slkdflsd")
  //     if (selectedCard) {
  //       const productToAdd = {
  //         id: selectedCard.id, // Use selectedCard instead of product
  //         name: description,
  //         price: selectedCard.price,
  //         image: selectedCard.imageUrl,

  //         // Use images if image is not defined
  //       };

  //       if (updatedFavorites[id]) {
  //         // Add to wishlist
  //         addToWishlist(productToAdd);

  //         setWishlist((prevWishlist) => [...prevWishlist, productToAdd]);
  //       } else {
  //         // Remove from wishlist
  //         setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));

  //       }
  //     }


  //     return updatedFavorites;
  //   });

  //   e.preventDefault();
  // };

  const handleFavoriteButtonClick = (id )=>{
    console.log(id+"lksdsdjf")
    addToWishlist(id)
  
    // setfavbutton(!favbutton)
  
  
  }

  useEffect(() => {
    // Store favoriteCards in localStorage whenever it changes
    localStorage.setItem('favoriteCards', JSON.stringify(favoriteCards));
  }, [favoriteCards]);



  const [favoriteCards1, setFavoriteCards1] = useState(() => {
    // Load favoriteCards from localStorage when the component mounts
    const storedFavorites1 = localStorage.getItem('favoriteCards');
    return storedFavorites1 ? JSON.parse(storedFavorites1) : {};
  });
  useEffect(() => {
    // Store favoriteCards in localStorage whenever it changes
    localStorage.setItem('favoriteCards', JSON.stringify(favoriteCards1));
  }, [favoriteCards1]);

  const handleFavoriteButtonClick1 = (id, e, description) => {
    e.stopPropagation();

    setFavoriteCards1((prev) => {
      const updatedFavorites = {
        ...prev,
        [id]: !prev[id],
      };

      const selectedCard = cards1.find((card) => card.id === id);
      console.log(selectedCard.description + "slkdflsd")
      if (selectedCard) {
        const productToAdd = {
          id: selectedCard.id, // Use selectedCard instead of product
          name: description,
          price: selectedCard.price,
          image: selectedCard.imageUrl,
        };

        if (updatedFavorites[id]) {
          // Add to wishlist
          addToWishlist(productToAdd);

          setWishlist((prevWishlist) => [...prevWishlist, productToAdd]);
        } else {
          // Remove from wishlist
          setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));

        }
      }


      return updatedFavorites;
    });

    e.preventDefault();
  };
  const navigate = useNavigate();
  const { addToWishlist, wishlistItems, removeFromWishlist } = useContext(WishlistContext);
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
        navigate('/acrylic3');
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
  const handleCardClick1 = (id) => {
    switch (id) {
      case 1:
        navigate('/prebook');
        break;
      case 2:
        navigate('/prebook1');
        break;
      case 3:
        navigate('/prebook2');
        break;
      case 4:
        navigate('/prebook3');
        break;
      case 5:
        navigate('/prebook4');
        break;
      case 6:
        navigate('/prebook5');
        break;
      case 7:
        navigate('/prebook7');
        break;
      case 8:
        navigate('/prebook6');
        break;
    }
  };
  const handleCardClick2 = (id) => {
    switch (id) {
      case 1:
        navigate('/customize1');
        break;
      case 2:
        navigate('/customize');
        break;
      case 3:
        navigate('/customize3');
        break;
      case 4:
        navigate('/customize4');
        break;
      case 5:
        navigate('/customize5');
        break;
      case 6:
        navigate('/customize6');
        break;
      case 7:
        navigate('/customize7');
        break;
      case 8:
        navigate('/customize8');
        break;
    }
  };
  const [showOther, setShowOther] = useState(false);

  const handleSelectChange = (event) => {
    if (event.target.value === 'other') {
      setShowOther(true);
    } else {
      setShowOther(false);
    }
  };
  const [showOther1, setShowOther1] = useState(false);

  const handleSelectChange1 = (event) => {
    if (event.target.value === 'other') {
      setShowOther1(true);
    } else {
      setShowOther1(false);
    }
  };
  // const handleCardClick4 = (id) => {
  //   switch (id) {
  //     case 11:
  //       navigate('/discover1');
  //       break;
  //     case 12:
  //       navigate('/discover2');
  //       break;
  //     case 13:
  //       navigate('/discover3');
  //       break;
  //     case 14:
  //       navigate('/discover4');
  //       break;
  //     case 15:
  //       navigate('/discover5');
  //       break;
  //     case 16:
  //       navigate('/product4');
  //       break;
  //     case 17:
  //       navigate('/discover6');
  //       break;
  //     case 18:
  //       navigate('/product8');
  //       break;
  //   }
  // };

  // const [cards1, setCards1] = useState([
  //   { id: 11, imageUrl: image18, price: '&#8377;1,200', height: '200px', description: "Double Canopy Umbrella" },
  //   { id: 12, imageUrl: image19, price: '&#8377;4,200', description: "Water Bottle" },
  //   { id: 13, imageUrl: image20, price: '&#8377;800', description: "Fogg Deodorant Men" },
  //   { id: 14, imageUrl: image21, price: '&#8377;499', description: "Men Plain Slim Fit Shirt" },
  //   { id: 15, imageUrl: image22, price: '&#8377;80', description: "Men White Shoes" },
  //   { id: 16, imageUrl: image10, price: '&#8377;1,500', description: "Brass Diya" },
  //   { id: 17, imageUrl: image23, price: '&#8377;200', description: "Skybags" },
  //   { id: 18, imageUrl: image17, price: '&#8377;1,400', description: "Decor Fountain" },
  // ]);
  const [cards1, setCards1] = useState([]);

  useEffect(() => {
    axios.get('https://api.hirdayam.com/api/getlatestTrendUser')
      .then(response => {
        const { data } = response;
        if (data.status && data.data.products) {
          // Access the products array inside data.data
          const formattedCards = data.data.products.map(product => ({
            id: product._id,
            imageUrl: product.image,
            price: `₹${parseFloat(product.price).toFixed(2)}`,
            description: product.name,
          
          }));
          setCards1(formattedCards);
        } else {
          // Handle error or empty state
          console.error('No data found');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // const [cards2, setCards2] = useState([
  //   { id: 1, imageUrl: 'https://i.pinimg.com/564x/ca/e6/9c/cae69c9b3349585dbaf4361bdfbbcba4.jpg', price: '&#8377;1,200', height: '200px', description: "Personalize Mugs" },
  //   { id: 2, imageUrl: 'https://i.pinimg.com/736x/d2/77/47/d27747315ce2522594ef94de4cddce11.jpg', price: '&#8377;4,200', description: "Gift Hamper" },
  //   { id: 3, imageUrl: 'https://i.pinimg.com/564x/d8/70/cc/d870ccde5b904a6373665143e31d50aa.jpg', price: '&#8377;800', description: "Fogg Deodorant Men" },
  //   { id: 4, imageUrl: 'https://i.pinimg.com/564x/61/f6/8f/61f68f3bb8a99a46feb2c4d7250e92d6.jpg', price: '&#8377;499', description: "Men Plain Slim Fit Shirt" },
  //   { id: 5, imageUrl: 'https://i.pinimg.com/564x/3f/1e/87/3f1e8712c53f32d0bb385b436d40004e.jpg', price: '&#8377;80', description: "Men White Shoes" },
  //   { id: 6, imageUrl: 'https://i.pinimg.com/564x/7d/bd/72/7dbd72694da94b1bb2e3dc89b0a8adec.jpg', price: '&#8377;1,500', description: "Brass Diya" },
  //   { id: 7, imageUrl: 'https://i.pinimg.com/564x/49/e1/44/49e1441c079a80a664f48f839aeebed1.jpg', price: '&#8377;200', description: "Skybags" },
  //   { id: 8, imageUrl: 'https://i.pinimg.com/564x/0d/78/a4/0d78a455237e6894ea6081881a3039ca.jpg', price: '&#8377;1,400', description: "Decor Fountain" },
  // ]);
  const [cards2, setCards2] = useState([]);
  useEffect(() => {
    axios.get('https://api.hirdayam.com/api/getlatestTrendUser')
      .then(response => {
        const { data } = response;
        if (data.status && data.data.products) {
          // Access the products array inside data.data
          const formattedCards = data.data.products.map(product => ({
            id: product._id,
            imageUrl: product.image,
            price: `₹${parseFloat(product.price).toFixed(2)}`,
            description: product.name,
          
          }));
          setCards2(formattedCards);
        } else {
          // Handle error or empty state
          console.error('No data found');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const [cards3, setCards3] = useState([]);
  useEffect(() => {
    axios.get('https://api.hirdayam.com/api/getPreBook')
      .then(response => {
        const { data } = response;
        if (data.status) {
          const formattedCards = data.data.map(product => ({
            id: product._id,
            imageUrl: product.image,
            price: `&#8377;${parseFloat(product.price).toFixed(2)}`,
            description: product.name,
            position: 0,
          }));
          setCards3(formattedCards);
        } else {
         
          console.error('No data found');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  // const [cards3, setCards3] = useState([
  //   { id: 1, imageUrl: image24, price: '&#8377;1,200', height: '200px', description: "Double Canopy Umbrella" },
  //   { id: 2, imageUrl: image25, price: '&#8377;4,200', description: "Water Bottle" },
  //   { id: 3, imageUrl: image26, price: '&#8377;800', description: "Fogg Deodorant Men" },
  //   { id: 4, imageUrl: image27, price: '&#8377;499', description: "Men Plain Slim Fit Shirt" },
  //   { id: 5, imageUrl: image28, price: '&#8377;80', description: "Men White Shoes" },
  //   { id: 6, imageUrl: image29, price: '&#8377;1,500', description: "Brass Diya" },
  //   { id: 7, imageUrl: image30, price: '&#8377;200', height: '110px', description: "Skybags", position: 50 },
  //   { id: 8, imageUrl: image31, price: '&#8377;1,400', height: '150px', description: "Decor Fountain", position: 28 },
  // ]);


  const [selectedColor1, setSelectedColor1] = useState('black');
  const [wishlist, setWishlist] = useState([]);
  // const handleFavoriteButtonClick = (id, e) => {
  //   e.stopPropagation();
  //   setFavoriteCards((prev) => ({
  //     ...prev,
  //     [id]: !prev[id],
  //   }));
  //   e.preventDefault();
  //   const selectedCard = cards.find(card => card.id === id);
  //   if (selectedCard) {
  //     setWishlist([...wishlist, selectedCard]);
  //   }
  //   const productToAdd = {
  //     id: selectedColor1, 
  //     name: product.name,
  //     price: 1200, 
  //     image: product.images[selectedColor1]
  //   };
  //   addToWishlist(productToAdd);
  //   navigate('/wishlist')
  // };
  // const handleFavoriteButtonClick = (id, e) => {
  //   e.stopPropagation();

  //   setFavoriteCards((prev) => {
  //     const updatedFavorites = {
  //       ...prev,
  //       [id]: !prev[id],
  //     };
  //     const selectedCard = cards.find((card) => card.id === id);

  //     if (selectedCard) {
  //       if (updatedFavorites[id]) {

  //         const productToAdd = {
  //           id: product.id, 
  //           name: product.name,
  //           price: product.price, 
  //           image: product.images
  //         };
  //         addToWishlist(productToAdd);
  //         setWishlist([...wishlist, productToAdd]);
  //       } else {
  //         setWishlist(wishlist.filter((item) => item.id !== id));
  //       }
  //     }

  //     return updatedFavorites;
  //   });

  //   e.preventDefault();
  // };

  // };


  // const [favoriteCards1, setFavoriteCards1] = useState({});
  const [favoriteCards2, setFavoriteCards2] = useState({});
  // const handleFavoriteButtonClick1 = (cardId) => {
  //   setFavoriteCards1((prevState) => ({
  //     ...prevState,
  //     [cardId]: !prevState[cardId],
  //   }));

  //   if (handleFavoriteClick1) {
  //     handleFavoriteClick1(cardId);
  //   }
  // };
  // const [favoriteCards1, setFavoriteCards1] = useState(() => {
  //   const storedFavorites = localStorage.getItem('favoriteCards2');
  //   return storedFavorites ? JSON.parse(storedFavorites) : {};
  // });

  const handleFavoriteButtonClick2 = (cardId) => {
    setFavoriteCards2((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));

    if (handleFavoriteClick2) {
      handleFavoriteClick2(cardId);
    }
  };
  // const handleFavoriteButtonClick2 = async (id) => {
  //   // Log the ID to ensure it's correct
  //   console.log(`Heart icon clicked with card id: ${id}`);

  //   // Find the selected card
  //   const selectedCard = cards3.find((card) => card.id === id);
  //   if (!selectedCard) {
  //     console.error('Card not found for id:', id);
  //     return;
  //   }

  //   const isFavorite = favoriteCards2[id] || false;

  //   try {
  //     if (isFavorite) {
  //       await removeFromWishlist(id);
  //     } else {
  //       await addToWishlist(selectedCard);
  //     }

  //     setFavoriteCards2((prev) => {
  //       const updatedFavoriteCards = {
  //         ...prev,
  //         [id]: !prev[id],
  //       };
  //       localStorage.setItem('favoriteCards2', JSON.stringify(updatedFavoriteCards));
  //       return updatedFavoriteCards;
  //     });
  //   } catch (error) {
  //     console.error('Error managing wishlist:', error);
  //   }
  // };

  const [showLoadMore, setShowLoadMore] = useState(true);

  const handleLoadMore = () => {

    setCards(prevCards => [
      ...prevCards,
      { id: 9, imageUrl: image9, price: ' &#8377;45' },
      { id: 10, imageUrl: image9, price: '$55' },
      { id: 11, imageUrl: image9, price: '$70' },
      { id: 12, imageUrl: image9, price: '$80' },

    ]);
    setShowLoadMore(false);
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
    setShowLoadMore1(false);
  };
  const [showLoadMore2, setShowLoadMore2] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      city: e.target.city.value,
      giftingFor: e.target.giftingFor.value,
      budget: e.target.budget.value,
      quantity: e.target.quantity.value,
    };

    // Process form data (e.g., send to a server or log to the console)
    console.log('Form data:', formData);

    // Simulate successful submission (replace this with your actual submission logic)
    setTimeout(() => {
      // After successful submission, redirect to the Thank You page
      navigate('/thank-you');
    }, 1000);

    // Optionally, you can close the modal immediately or after submission
    setIsModalOpen(false);
  };
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
  const [slides, setSlides] = useState([]);


  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('https://api.hirdayam.com/api/BannersforUser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }
  
        const result = await response.json();
  
        if (result && result.status && Array.isArray(result.data)) {
          setSlides(result.data);
        } else {
          console.error('Fetched data is not in the expected format:', result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchSlides();
  },[]);
  const handleSlideClick = (index) => {

    const pageRoutes = ['', '/product3', '/catalog1']; // Add more routes as needed
    if (index < pageRoutes.length) {
      navigate(pageRoutes[index]);
    }
  };
  return (
    <>
      <Header />

      <div class="menu-container  hidden md:flex">
        {/* <div class="menu-item">
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
        </div> */}
        {/* <Swiper

          slidesPerView={3} // Number of visible slides
          spaceBetween={20} // Space between slides
          navigation
          
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
              
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {menuItems.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="menu-item">
                <div className="menu-heading">{item.heading}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
       */}
    {/* <Swiper
  slidesPerView={3}
  spaceBetween={20}
  breakpoints={{
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  }}
>
  {menuItems.map((item) => (
    <SwiperSlide key={item.id}>
      <div className="menu-item" onMouseEnter={() => handleHeadingClick(item.id)}>
        <div className="menu-heading">
          {item.heading}
        </div>
        {subcategories[item.id] && (
          <div className="dropdown5">
            {subcategories[item.id].map((subName, index) => (
              <div key={index} className="dropdown-item5">
                {subName}
              </div>
            ))}
          </div>
        )}
      </div>
    </SwiperSlide>
  ))}
</Swiper> */}



<div className='decoration '>
    
      {menuItems.map((item) => (
        <div key={item.id} className="menu-item" onMouseEnter={() => handleHeadingClick(item.id)}>
        
          <div className="menu-heading">
            {item.heading}
          </div>
        
          {subcategories[item.id] && (
            <div className="dropdown5 ">
              {subcategories[item.id].map((subCategory) =>(
                <div 
                  key={subCategory._id} 
                  className="dropdown-item5"
                  onClick={() => handleSubcategoryClick(subCategory._id)} // Add onClick handler
                >
                  {subCategory.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
   
     
      <div class="menu-item">
      <Link to='/acrylic3'>    <div class="menu-heading">Acrylic Photoframe</div></Link>
       
      </div>
      <div class="menu-item">
        <div class="menu-heading" onClick={() => setIsModalOpen(true)}>Contact Us</div>
        {isModalOpen && (
          <div className="fixed z-20 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div
                className="inline-block align-bottom bg-white px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                style={{ maxWidth: '700px' }}
              >
                <div className="flex flex-col items-center justify-center">
                  <h1
                    className="leading-6 font-medium text-gray-900"
                    style={{ fontFamily: 'Poppins', fontWeight: 'bolder', fontSize: '18px' }}
                  >
                    Talk to Our Experts
                    <button
                      type="button"
                      className="absolute right-[-5.2rem] top-6 text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={() => setIsModalOpen(false)}
                    >
                      <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                  </h1>
                  <div className="mt-6 w-full">
                    <form className="w-full" onSubmit={handleSubmit}>
                      <div className="flex flex-col space-y-4">
                        <div className="flex space-x-4">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="firstName"
                            type="text"
                            placeholder="Enter Your First name"
                            required
                          />
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="lastName"
                            type="text"
                            placeholder="Enter Your Last name"
                            required
                          />
                        </div>
                        <div className="flex space-x-4">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            placeholder="Enter Your Business Email Address*"
                            required
                          />
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="text"
                            placeholder="Enter Your Phone number*"
                            required
                          />
                        </div>
                        <div className="flex space-x-4">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="city"
                            type="text"
                            placeholder="Enter your city*"
                            required
                          />
                          <select
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="giftingFor"
                            required
                          >
                            <option value="">Gifting For *</option>
                            <option value="internalEmployees">Internal Employees</option>
                            <option value="clientsCustomers">Clients/Customers</option>
                            <option value="vipCeo">VIP/CEO</option>
                            <option value="others">Others</option>
                          </select>
                        </div>
                        <div className="flex space-x-4">
                          <select
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="budget"
                            onChange={handleSelectChange1}
                            required

                          >
                            <option value="">Budget Per Gift *</option>
                            <option value="0-500">₹0 - ₹500</option>
                            <option value="500-1000">₹500 -₹1000</option>
                            <option value="2000-5000">₹2000-₹5000</option>
                            <option value="5000-10000">₹5000-₹10000</option>
                            <option value="other">Other</option>
                          </select>

                          {showOther1 && (
                            <input
                              type="text"
                              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                              id="other-budget"
                              name="other-budget"
                              placeholder="Please specify your budget"
                            />
                          )}
                          <select
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="quantity-select" name="quantity" onChange={handleSelectChange}
                            required
                          >
                            <option value="">Quantity Required *</option>
                            <option value="10-50">10-50pcs</option>
                            <option value="50-100">50-100pcs</option>
                            <option value="100-200">100-200pcs</option>
                            <option value="200-300">200-300pcs</option>
                            <option value="other">Other</option>
                          </select>
                          {showOther && (
                            <input
                              type="text"
                              id="other-quantity"
                              name="other-quantity"
                              placeholder="Please specify"
                              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                            />
                          )}
                        </div>
                        <div className="w-full">
                          <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="wishingMessage"
                            placeholder="Enter Your Wishing Message"
                            rows="2"
                            required
                          ></textarea>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="bg-[#23387A] w-full text-white font-medium py-3 px-4 rounded text-xs mt-6"
                      >
                        ENQUIRE NOW
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div >
      <div className=' md:hidden'>
      
      <Catalog/>
     </div>
      <div style={{backgroundImage:``}} className='swiper-background  bg-left-top bg-no-repeat    relative  md:top-5'>
        <img src={group} alt="" className='group '/>

        <div className="w-full max-w-[70rem]  md:mx-auto px-3  mt-14 md:mt-2 md:px-4">
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper w-full "
            
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}  onClick={() => handleSlideClick(index)}>
              <div className='hidden md:block'>
              <img src={slide.image} style={{display:"flex",height:"100%", width:"100%", objectFit:"cover"}} className="block w-full h-[800px] md:h-auto  object-cover" alt={`slide${index + 1}`} />

              </div>
                <div className=' md:hidden'>
                <img src={ headerslider} style={{height:"100%", width:"100%", objectFit:"cover"}} className={" hidden w-full h-[800px] md:h-auto  object-cover"} alt={`slide${index + 1}`} />

                </div>

              </SwiperSlide>
            ))}
          </Swiper>
          <div className='image-box  bg-white px-10  flex z-10 justify-around items-center absolute left-0 right-0  md:mx-auto md:left-auto md:right-auto  top-[20.3rem] md:top-[14.3rem]'>
            <div className='image-item   text-wrap'>
              <img src={icon5} alt="" className='box-image'/>
              <p className='image-description1     text-sm md:text-base mt-2'>1 Million <br className='block md:hidden'></br> + Customer</p>
            </div>
            <div className='image-item'>
              <img src={icon6} alt="" className='box-image' />
              <p className='image-description1 text-sm md:text-base mt-2'>3 Days <br className='block md:hidden'></br>  Return*</p>
            </div>
            <div className='image-item'>
              <img src={icon7} alt="" className='box-image' />
              <p className='image-description1 text-sm md:text-base mt-2'>Free <br className='block md:hidden'></br> Shipping</p>
            </div>
          </div>
        </div>
      </div>
     <div className=' hidden md:block'>
      <Catalog/>
     </div>
      

      <div className='selling'>
        <h1 className='best'>Best Selling</h1>
        <h1 className='top'>Top Rated and Bestselling</h1>
        <div className="card-container">
          {cards.map(card => (
           
            <div key={card.id} className="card-wrapper" style={{ cursor: 'pointer' }}>
              <div className="card1-product rounded-md">
                <div className="card-header w-36 h-56 md:h-72   md:w-full">
                <Link
            key={card.id}
            to={`/card/${card.id}`}
            className="card-link"
            onClick={(e) => e.stopPropagation()} // Prevent click on Link from triggering card's default action
          >
                  <img src={card.imageUrl} alt="product" style={{ height: card.height }} className="card-image1 w-23  object-contain m-0 p-0"  />
                </Link>
                  <button
                    className="favorite-btn "
                    onClick={(e) => handleFavoriteButtonClick(card.id)}
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      background: 'none',
                      padding: '5px',
                    }}
                  >
                    <i
                      className={`fa-heart ${wishlistItems.data.data.some(item=>item.product._id==card.id) ? 'fas' : 'far'}`}
                      style={{ color: wishlistItems.data.data.some(item=>item.product._id==card.id) ? 'red' : '#23387A', fontSize: '24px' }}
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
  {/* <div className='selling'>
        <h1 className='best'>Best Selling</h1>
        <h1 className='top'>Top Rated and Bestselling</h1>
        <div className="card-container">
          {cards.map(card => (
            <div key={card.id} className="card-wrapper"
              style={{ cursor: 'pointer' }}>
              <div className="card1-product rounded-md  ">
                <div className="card-header w-36 h-56 md:h-72   md:w-full">
                  <img src={card.imageUrl} alt="product" style={{ height: card.height }} className="card-image1 w-23  object-contain m-0 p-0  " onClick={() => handleCardClick(card.id)} />
                  <button
                    className="favorite-btn m-4 md:m-0"
                    onClick={(e) => handleFavoriteButtonClick(card.id, e ,card.description)}
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
                <p className="image-description w-36 md:w-full text-wrap md:text-nowrap text-center ">{card.description}</p>
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
      </div> */}
      <div>
        <img src={group1} className="group1" alt="Group Image" /></div>
      <div className="relative ">

        <div className="promo-content  bg-[#9CA5C3] text-white p-6 md:p-8 lg:p-10 max-w-screen-lg mx-auto relative z-10">
          <div className="discount-text text-center text-2xl md:text-3xl lg:text-4xl md:text-left mb-4 md:mb-6 lg:mb-8">
            Get Discount 20% off
          </div>
          <div className="subscribe-form flex  flex-col md:flex-row items-left justify-start gap-4 mb-4 md:mb-6">
            <input type="email" placeholder="Enter your email address" className="w-full md:w-64 lg:w-80 h-10 px-4 border border-gray-300 text-gray-900" />
            <button className="subscribe-button rounded-md md:rounded-none h-10 px-6 bg-[#23387A] text-white    hover:bg-[#1d2a5f]">
              Subscribe
            </button>
          </div>
          <p className="promo-paragraph pt-32 text-center md:pt-0 text-sm md:text-base lg:text-lg leading-relaxed  md:ml-[32rem] md:text-left">
            The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers.
          </p>
        </div>
      </div>

      <div className='selling md:mt-96 '>
        <h3 className='best '>New Arrivals</h3>
        <h1 className='top '>Discover the Latest Trends</h1>
        <div className="card-container">
          {cards1.map(card => (
            
            <div key={card.id} className="card-wrapper">
              <div className="card1-product rounded-md">
                <div className="card-header w-36 h-56 md:h-72   md:w-full">
                <Link
            key={card.id}
            to={`/card6/${card.id}`}
            className="card-link"
            onClick={(e) => e.stopPropagation()} // Prevent click on Link from triggering card's default action
          >
                  <img src={card.imageUrl} alt="product"  className="card-image1 w-23  object-contain m-0 p-0"  />
                  </Link>
                  <button
                    className="favorite-btn m-4 md:m-0"
                    onClick={(e) => handleFavoriteButtonClick(card.id)}
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      background: 'none',
                      padding: '5px',

                    }}
                  >
                    <i
                      className={`fa-heart ${wishlistItems.data.data.some(item=>item.product._id==card.id) ? 'fas' : 'far'}`}
                      style={{ color: wishlistItems.data.data.some(item=>item.product._id==card.id) ? 'red' : '#23387A', fontSize: '24px' }}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="card-info">
                <p className="image-description w-36 md:w-full text-wrap text-center">{card.description}</p>
                <p className='price '><span dangerouslySetInnerHTML={{ __html: card.price }} /></p>
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
        <div className='selling1 '>
          <h3 className='best'>Customizable Products</h3>
          <h1 className='top'>Looking for Personal Touch</h1>
          <div className="card-container">
            {cards2.map(card => (
              <div key={card.id} className="card-wrapper">
                <div className="card1-product rounded-md">
                  <div className="card-header w-36 h-56 md:h-72   md:w-full">
                  <Link
            key={card.id}
            to={`/card8/${card.id}`}
            className="card-link"
            onClick={(e) => e.stopPropagation()} // Prevent click on Link from triggering card's default action
          >
                    <img src={card.imageUrl} alt="product" style={{ height: card.height, position: 'relative', top: `${card.position}px` }} className="card-image1 w-23  object-contain m-0 p-0" onClick={() => handleCardClick2(card.id)} />
                    </Link>
                    <button
                      className="favorite-btn m-4 md:m-0"
                      onClick={() => handleFavoriteButtonClick(card.id)}
                      style={{
                        cursor: 'pointer',
                        border: 'none',
                        background: 'none',
                        padding: '5px',
                      }}
                    >
                      <i
                        className={`fa-heart  ${wishlistItems.data.data.some(item=>item.product._id==card.id) ? 'fas' : 'far'}`}
                        style={{ color:  wishlistItems.data.data.some(item=>item.product._id==card.id) ? 'red' : '#23387A', fontSize: '24px' }}
                      ></i>
                    </button>
                  </div>
                </div>
                <div className="card-info">
                  <p className="image-description text-wrap w-36 md:w-full text-center">{card.description}</p>
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

      <div className='selling2  mt-24'>
        <h3 className='best'>Limited Period Offer</h3>
        <h1 className='top'>Coming Soon - Pre Book Now!</h1>



        <div className="card-container">
          {cards3.map(card => (
            <Link
              key={card.id}
              to={`/card2/${card.id}`}
              className="card-link"
              onClick={(e) => e.stopPropagation()} // Prevent click on Link from triggering card's default action
            >
              <div className="card-wrapper">
                <div className="card1-product rounded-md">
                  <div className="card-header w-36 h-56 md:h-72   md:w-full">
                    <img
                      src={card.imageUrl}
                      alt="product"
                      style={{ height: card.height, position: 'relative', top: `${card.position}px` }}
                      className="card-image1 w-23  object-contain m-0 p-0"
                    />
                    <button
                      className="favorite-btn"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent the default button behavior
                        e.stopPropagation(); // Stop the event from propagating to the Link
                        handleFavoriteButtonClick(card.id)
                        // handleFavoriteButtonClick2(card.id, e);
                      }}
                      style={{
                        cursor: 'pointer',
                        border: 'none',
                        background: 'none',
                        padding: '5px',
                      }}
                    >
                      <i
                        className={`fa-heart ${wishlistItems.data.data.some(item=>item.product._id==card.id) ? 'fas' : 'far'}`}
                        style={{ color: wishlistItems.data.data.some(item=>item.product._id==card.id) ? 'red' : '#23387A', fontSize: '24px' }}
                      ></i>
                    </button>
                  </div>
                </div>
                <div className="card-info">
                  <p className="image-description">{card.description}</p>
                  <p className='price'><span dangerouslySetInnerHTML={{ __html: card.price }} /></p>
                </div>
              </div>
            </Link>
          ))}
          {/* {cards3.map(card => (
            <div key={card.id} className="card-wrapper">
              <div className="card1-product rounded-md">
                <div className="card-header w-36 h-56 md:h-72   md:w-full">
                  <img src={card.imageUrl} alt="product" style={{ height: card.height, position: 'relative', top: `${card.position}px` }} className="card-image1 w-23  object-contain m-0 p-0"  onClick={() => handleCardClick1(card.id)}/>
                  <button
                    className="favorite-btn m-4 md:m-0"
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
                <p className="image-description text-wrap text-center w-36 md:w-full">{card.description}</p>
                <p className='price'><span dangerouslySetInnerHTML={{ __html: card.price }} /></p>
              </div>
            </div>
          ))} */}
        </div>

        {showLoadMore3 && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={handleLoadMore3}>
              Load More
            </button>
          </div>
        )}

        <img src={group} className='group6' />
        <Slider/>
        <h3 className='best2'>Why Choose Us</h3>
        <h1 className='top2'>Trust and Quality You Can Rely On</h1>
      </div>
      <div className="content ">
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

  {/* <img src={group5} className='group5' />  */ }
  <Footer />

    </>
  );
}

export default Home;
