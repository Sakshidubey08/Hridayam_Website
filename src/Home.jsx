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
import search from './images/search.png'

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
import Loadingpage from './Loadingpage.jsx';
import Rimpple from "react-ripples"

import { SwitchTransition, CSSTransition, TransitionGroup } from "react-transition-group";
SwiperCore.use([Navigation]);

const Home = ({ handleFavoriteClick, handleFavoriteClick1, handleFavoriteClick2 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, products } = useProductContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const ITEMS_PER_PAGE = 3; // Only show 3 categories at a time

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
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleCards1, setVisibleCards1] = useState([]);
  const [visibleCards2, setVisibleCards2] = useState([]);
  const [visibleCards3, setVisibleCards3] = useState([]);


  const [products12, setProducts12] = useState([]);
  const [products13, setProducts13] = useState([]);
  const [products14, setProducts14] = useState([]);
  const [products15, setProducts15] = useState([]);


  const [cardCount, setCardCount] = useState(8);
  const [cardCount1, setCardCount1] = useState(8);
  const [cardCount2, setCardCount2] = useState(8);
  const [title, setTitle] = useState('');
  useEffect(() => {
    axios.get('https://api.hirdayam.com/api/getSettings')
      .then(response => {
        // The title is nested inside the `data` object
        const fetchedTitle = response.data.data.bottom_banner_title;
        setTitle(fetchedTitle);
      })
      .catch(error => {
        console.error('Error fetching the title:', error);
      });
  }, []);
  // useEffect(() => {
  //   axios.get('https://api.hirdayam.com/api/getbestsellingproduct')
  //     .then(response => {
  //       const { data } = response;
  //       if (data.status) {
  //         // Format the data as required
  //         const formattedCards = data.data.map(product => ({
  //           id: product._id,
  //           imageUrl: product.image,
  //           price: `&#8377;${parseFloat(product.price).toFixed(2)}`,
  //           description: product.name,
  //         }));
  //         setCards(formattedCards);

  //         setCards(prevCards => [...prevCards, ...formattedCards]);


  //       setHasMore(data.data.length > 0); 
  //       setShowLoadMore(data.data.length > 0); 
  //         // Handle error or empty state
  //         console.error('No data found');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.hirdayam.com/api/getbestsellingproduct');
        const { data } = response;

        if (data.status) {
          const formattedCards = data.data.map(product => ({
            id: product._id,
            imageUrl: product.image,
            price: `&#8377;${parseFloat(product.price).toFixed(2)}`,
            description: product.name,
          }));

          setProducts12(formattedCards);
          setVisibleCards(formattedCards.slice(0, cardCount));
          setShowLoadMore(formattedCards.length > cardCount);
        } else {
          console.error('No data found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cardCount]);

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

  const handleFavoriteButtonClick = (id) => {
    console.log(id + "lksdsdjf")
    addToWishlist(id)
  }

  useEffect(() => {
    // Store favoriteCards in localStorage whenever it changes
    localStorage.setItem('favoriteCards', JSON.stringify(favoriteCards));
  }, [favoriteCards]);


  const handleProductClick = (productId) => {
    navigate(`/similar/${productId}`);
  };
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
  const [showOther1, setShowOther1] = useState(false);

  const handleSelectChange1 = (e) => {
    if (e.target.value === 'other') {
      setShowOther1(true);
    } else {
      setShowOther1(false);
    }
    setBudgetPerGift(e.target.value);
  };

  const handleSelectChange = (e) => {
    if (e.target.value === 'other') {
      setShowOther(true);
    } else {
      setShowOther(false);
    }
    setQuantityRequired(e.target.value);
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

  // useEffect(() => {
  //   axios.get('https://api.hirdayam.com/api/getlatestTrendUser')
  //     .then(response => {
  //       const { data } = response;
  //       if (data.status && data.data.products) {
  //         // Access the products array inside data.data
  //         const formattedCards = data.data.products.map(product => ({
  //           id: product._id,
  //           imageUrl: product.image,
  //           price: `₹${parseFloat(product.price).toFixed(2)}`,
  //           description: product.name,

  //         }));
  //         setProducts13(formattedCards);
  //         setVisibleCards1(formattedCards.slice(0, cardCount1));
  //         setShowLoadMore1(formattedCards.length > cardCount1);
  //       } else {
  //         // Handle error or empty state
  //         console.error('No data found');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, [cardCount1]);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading2(true);
        const response = await axios.get('https://api.hirdayam.com/api/getlatestTrendUser');
        const { data } = response;

        if (data.status && data.data.products) {
          const formattedCards = data.data.products.map(product => ({
            id: product._id,
            imageUrl: product.image,
            price: `₹${parseFloat(product.price).toFixed(2)}`,
            description: product.name,

          }));
          setProducts13(formattedCards);
          setVisibleCards1(formattedCards.slice(0, cardCount1));
          setShowLoadMore1(formattedCards.length > cardCount1);
        } else {
          console.error('No data found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading2(false);
      }
    };

    fetchProducts();
  }, [cardCount1]);

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
  const [loading3, setLoading3] = useState(false);

  // useEffect(() => {
  //   axios.get('https://api.hirdayam.com/api/getPersonalizeProduct')
  //     .then(response => {
  //       const { data } = response;
  //       if (data.status && data.data && data.data.data) {
  //         // Access the products array inside data.data.data
  //         const formattedCards = data.data.data.map(product => ({
  //           id: product._id,
  //           imageUrl: product.image,
  //           price: `₹${parseFloat(product.price).toFixed(2)}`,
  //           description: product.name,
  //         }));
  //         setProducts14(formattedCards);
  //         setVisibleCards2(formattedCards.slice(0, cardCount2));
  //         setShowLoadMore2(formattedCards.length > cardCount2);
  //       } else {
  //         // Handle error or empty state
  //         console.error('No data found');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, [cardCount2]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading3(true);
        const response = await axios.get('https://api.hirdayam.com/api/getPersonalizeProduct');
        const { data } = response;

        if (data.status && data.data && data.data.data) {
          // Access the products array inside data.data.data
          const formattedCards = data.data.data.map(product => ({
            id: product._id,
            imageUrl: product.image,
            price: `₹${parseFloat(product.price).toFixed(2)}`,
            description: product.name,
          }));
          setProducts14(formattedCards);
          setVisibleCards2(formattedCards.slice(0, cardCount2));
          setShowLoadMore2(formattedCards.length > cardCount2);
        } else {
          console.error('No data found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading3(false);
      }
    };

    fetchProducts();
  }, [cardCount2]);
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
    setCardCount(prevCount => prevCount + 8);
    setVisibleCards(products12.slice(0, cardCount + 8));
    setShowLoadMore(products12.length > cardCount + 8);
  };
  console.log('Visible Cards:', visibleCards);
  console.log('Show Load More:', showLoadMore);
  const [showLoadMore1, setShowLoadMore1] = useState(true);

  const handleLoadMore1 = () => {
    setCardCount1(prevCount => prevCount + 8);
    setVisibleCards1(products13.slice(0, cardCount1 + 8));
    setShowLoadMore1(products13.length > cardCount1 + 8);
  };
  const [showLoadMore2, setShowLoadMore2] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [giftingFor, setGiftingFor] = useState('');
  const [budgetPerGift, setBudgetPerGift] = useState('');
  const [quantityRequired, setQuantityRequired] = useState('');
  const [message, setMessage] = useState('');
  const [searchinput2, setsearchinput2] = useState("");
  const [latestcoupon, setlatestcoupon] = useState([]);
  const [searchdatatext, setsearchdatatext] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Construct the form data from state
  //   const formData = {
  //     first_name: firstName,
  //     last_name: lastName,
  //     phone_number: phoneNumber,
  //     email ,
  //     city,
  //     gifting_for: giftingFor,
  //     budget_per_gift: budgetPerGift,
  //     quantity_required: quantityRequired,
  //     message,
  //   };
  //   setLoading(true);
  //   setError(null);
  //   setSuccess(false);



  //   try {
  //     const response = await axios.post('https://api.hirdayam.com/api/createprebookEnquiry', submissionData);

  //     if (response.status === 200){
  //       setSuccess(true);
  //       setIsModalOpen(false);
  //       setFormData({ name: '', email: '', quantity: '', message: '' });
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       console.error('Error response from server:', error.response.data);
  //       setError(error.response.data.message || 'Something went wrong. Please try again.');
  //     } else if (error.request) {
  //       console.error('No response received:', error.request);
  //       setError('No response from server. Please check your internet connection.');
  //     } else {
  //       console.error('Error setting up the request:', error.message);
  //       setError('Something went wrong. Please try again.');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  //   console.log(formData); // To check the form data

  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Collect form data from state variables
    const formData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email,
      city,
      gifting_for: giftingFor,
      budget_per_gift: budgetPerGift,
      quantity_required: quantityRequired,
      message,
    };

    console.log("Form Data being sent:", formData);

    try {
      const response = await axios.post('https://api.hirdayam.com/api/enquirenow', formData);

      if (response.status === 200) {
        // setSuccess(true);
        setIsModalOpen(false);

        // setFormData({ first_name: '', last_name: '', pho: '', message: '' });
      }
    } catch (error) {
      console.log(error.response.data.message)
    } finally {
      setLoading(false);
    }
  };


  const handleLoadMore2 = () => {
    setCardCount2(prevCount => prevCount + 8);
    setVisibleCards2(products14.slice(0, cardCount2 + 8));
    setShowLoadMore2(products14.length > cardCount2 + 8);
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
    getcouponforuser();
  }, []);
  // const handleSlideClick = (slide) => {
  //   const { product_id, category_id } = slide;
  //   if (product_id && !category_id) {
  //     navigate(`/product/${product_id}`);
  //   } else if (category_id && !product_id) {
  //     navigate(`/category/${category_id[0]}`);
  //   } else if (product_id && category_id) {
  //     navigate(`/product/${product_id}`);
  //   } else {
  //     console.log('No valid product or category to navigate to.');
  //   }
  // };
  // const handleSlideClick = (slide) => {
  //   const { product_id, category_id } = slide;

  //   if (Array.isArray(product_id) && product_id.length > 0) {
  //     const productIds = product_id.join(',');
  //     navigate(`/banner-products?ids=${productIds}`);
  //   } else if (category_id && !product_id) {
  //     navigate(`/category/${category_id[0]}`);
  //   } else if (product_id && !Array.isArray(product_id)) {
  //     navigate(`/banner-products/${product_id}`);
  //   } else {
  //     console.log('No valid product or category to navigate to.');
  //   }
  // };
  const handleSlideClick = (slide) => {
    const { product_id, category_id } = slide;

    if (Array.isArray(product_id) && product_id.length > 0) {
      // Redirect to a page where multiple products are shown
      const productIds = product_id.join(',');
      navigate(`/banner-products?ids=${productIds}`);
    } else if (Array.isArray(category_id) && category_id.length > 0) {
      // Redirect to a page where multiple categories are shown
      const categoryIds = category_id.join(',');
      navigate(`/categories?ids=${categoryIds}`);
    } else if (product_id && !Array.isArray(product_id)) {
      navigate(`/banner-products/${product_id}`);
    } else if (category_id && !Array.isArray(category_id)) {
      navigate(`/category/${category_id}`);
    } else {
      console.log('No valid product or category to navigate to.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Navigate to the 'All Products' page, passing search text as query param
      navigate(`/all-products?search=${searchinput2}`);
    }
  };

  const handleSearch = (text) => {
    setsearchinput2(text.target.value);
    fetchsearchdatalist();
  }

  const handleNext = () => {
    if (currentIndex + ITEMS_PER_PAGE < menuItems.length) {
      setCurrentIndex(currentIndex + ITEMS_PER_PAGE);
    }
  };

  const handlePrev = () => {
    if (currentIndex - ITEMS_PER_PAGE >= 0) {
      setCurrentIndex(currentIndex - ITEMS_PER_PAGE);
    }
  };

  const getcouponforuser = async () => {
    try {
      const response = await axios.get('https://api.hirdayam.com/api/getlatestcouponalways', {
        headers: {
          // 'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        }
      });
      if (response && response.data && response.data.data) {
        let coupondata = response.data;

        setlatestcoupon(coupondata);



        console.log('Addres get success:', response.data);
      }

    } catch (error) {
      console.error('Error during couopnlistfor user submission:', error);

      if (error.response) {
        console.error('Server couponlistforuser responded with:', error.response.data);
        // setError(`Address submission failed: ${error.response.data.message || 'Unknown error'}`);
      } else {
        // setError('Address submission failed. Please try again.');
      }
    }
  };

  const fetchsearchdatalist = async () => {
    try {
      const response = await axios.get(`https://api.hirdayam.com/api/universalSearch?search_key=${searchinput2}`, {
        headers: {
          // 'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        }
      });
      if (response && response.data && response.data.data) {
        let searchhdata = response.data;

        setsearchdatatext(searchhdata);



        console.log('searchdaralist success:', response.data);
      }

    } catch (error) {
      console.error('Error during searchdaralist user submission:', error);

      if (error.response) {
        console.error('searchdartalist:', error.response.data);
        // setError(`Address submission failed: ${error.response.data.message || 'Unknown error'}`);
      } else {
        // setError('Address submission failed. Please try again.');
      }
    }
  };
  return (
    <>
      <Header />
      {/* <div className="  my-3  flex items-center justify-center   md:hidden ">
            <img onClick={()=>{navigate(`/all-products?search=${searchinput2}`)}} src={search} alt="Search Icon" className="search-icon ml-3 p-0" />
            <input
              onChange={handleSearch} // Call handleSearch on text input change
              onKeyPress={handleKeyPress} // Call handleKeyPress on key press
              type="text"
              className="search-input"
              placeholder="Search product..." />
          </div> */}
      <div className='flex pl-8  items-center justify-center'>
        <div className="dropdown dropdown-bottom  w-full mt-3 flex items-center justify-center      md:hidden ">
          {/* <div tabIndex={0} role="button" className="btn m-1">Click</div> */}
          <div tabIndex={0} role="button" className=" w-full flex  items-center justify-between">
            <img onClick={() => { navigate(`/all-products?search=${searchinput2}`) }} src={search} alt="Search Icon" className="search-icon" />

            <input
              onChange={handleSearch} // Call handleSearch on text input change
              onKeyPress={handleKeyPress} // Call handleKeyPress on key press
              type="text"
              className="search-input"
              placeholder="Search product..." />


          </div>
          <ul tabIndex={0} className={`${searchdatatext && searchdatatext.data ? (searchdatatext.data.catelogs.length < 1 && searchdatatext.data.categories.length < 1 && searchdatatext.data.products.length < 1 ? "hidden" : "block") : ""} ${searchinput2.length == 0 ? "hidden" : "block"} dropdown-content  my-2 mr-10 menu bg-base-100  rounded-box  z-[5000] w-11/12 shadow`}>
            {/* <div>{searchdatatext&&searchdatatext.data?searchdatatext.data.products[0].name:"df"}</div>   */}
            <div className={`${searchdatatext && searchdatatext.data ? (searchdatatext.data.products.length < 1 ? "hidden" : "block") : ""} ml-3 font-semibold`}>
              Products

            </div>

            {

              searchdatatext && searchdatatext.data ? searchdatatext.data.products.map((item, index) => {
                return (
                  <div key={index} onClick={() => { navigate(`/similar/${item._id}`) }}>
                    <li className=''>

                      <a>
                        <img className='h-9 w-9  object-contain ' src={item.image || "not fount"}></img>

                        {item.name}</a></li>
                  </div>
                )
              }) : (<div className=' gap-3' >
                <li ><a className=' skeleton h-4 my-1'></a></li>
                <li ><a className=' skeleton h-4 my-1'></a></li>
                <li><a className=' skeleton h-4 my-1'></a></li>
                <li><a className=' skeleton h-4 my-1'></a></li>
              </div>)
            }

            <div className={`${searchdatatext && searchdatatext.data ? (searchdatatext.data.categories.length < 1 ? "hidden" : "block") : ""} ml-3 font-semibold`}>Category</div>
            {

              searchdatatext && searchdatatext.data ? searchdatatext.data.categories.map((item, index) => {
                return (
                  <div key={index} onClick={() => { navigate(`/sub-category-products/${item._id}`) }} >
                    <li className=''>

                      <a>
                        <img className='h-9 w-9  object-contain ' src={item.image || "not fount"}></img>

                        {item.name}</a></li>
                  </div>
                )
              }) : (<div className=' gap-3' >
                <li ><a className=' skeleton h-4 my-1'></a></li>
                <li ><a className=' skeleton h-4 my-1'></a></li>
                <li><a className=' skeleton h-4 my-1'></a></li>
                <li><a className=' skeleton h-4 my-1'></a></li>
              </div>)
            }

            <div className={`${searchdatatext && searchdatatext.data ? (searchdatatext.data.catelogs.length < 1 ? "hidden" : "block") : ""} ml-3 font-semibold`}>Catalog</div>

            {
              searchdatatext && searchdatatext.data ? searchdatatext.data.catelogs.map((item, index) => {
                return (
                  <div key={index} onClick={() => { navigate(`/catalog/${item._id}`) }} >
                    <li className=''>

                      <a>
                        <img className='h-9 w-9 object-contain' src={item.image || "not fount"}></img>

                        {item.title}</a></li>
                  </div>
                )
              }) : (<div className=' gap-3' >
                <li ><a className=' skeleton h-4 my-1'></a></li>
                <li ><a className=' skeleton h-4 my-1'></a></li>
                <li><a className=' skeleton h-4 my-1'></a></li>
                <li><a className=' skeleton h-4 my-1'></a></li>
              </div>)
            }
          </ul>
        </div>
      </div>
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
        {/* {/* <Swiper

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



        {/* <div className='decoration '>

          {menuItems.map((item) => (
            <div key={item.id} className="menu-item" onMouseEnter={() => handleHeadingClick(item.id)}>

              <div className="menu-heading">
                {item.heading}
              </div>

              {subcategories[item.id] && (
                <div className="dropdown15 ">
                  {subcategories[item.id].map((subCategory) => (
                    <div
                      key={subCategory._id}
                      className="dropdown-item15"
                      onClick={() => handleSubcategoryClick(subCategory._id)} // Add onClick handler
                    >
                      {subCategory.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div> */}
        <div className='decoration'>
          {/* Arrow for sliding left */}
          <Rimpple color='gray' className=' bg-gray-300/40  font-semibold flex items-center justify-center p-1 w-6 h-6 m-auto rounded-full'>
            <button className='' onClick={handlePrev} disabled={currentIndex === 0}>
              <code>&#8592;</code> {/* Left arrow */}
            </button>
          </Rimpple>




          <div className="menu-slider">

            {menuItems.slice(currentIndex, currentIndex + ITEMS_PER_PAGE).map((item) => (
              <div key={item.id} className="menu-item" onMouseEnter={() => handleHeadingClick(item.id)}>
                <div className="menu-heading">
                  {item.heading}
                </div>
                {dropdownOpen === item.id && subcategories[item.id] && (
                  <div className="dropdown15">
                    {subcategories[item.id].map((subCategory) => (
                      <div
                        key={subCategory._id}
                        className="dropdown-item15"
                        onClick={() => handleSubcategoryClick(subCategory._id)}
                      >
                        {subCategory.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>


          {/* Arrow for sliding right */}
          <Rimpple color="gray/30" className=' bg-gray-300/40  flex items-center justify-center p-1 w-6 h-6 m-auto rounded-full'>
            <button

              onClick={handleNext}
              disabled={currentIndex + ITEMS_PER_PAGE >= menuItems.length}
            >
              <code>&#8594;</code>  {/* Right arrow */}
            </button>
          </Rimpple>

        </div>

        {/* <div className='decoration'>
      <Swiper
       spaceBetween={30}
       slidesPerView={2}
      
        freeMode={true}         
      >
        {menuItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="menu-item" onMouseEnter={() => handleHeadingClick(item.id)}>
              <div className="menu-heading">
                {item.heading}
              </div>

              {subcategories[item.id] && (
                <div className="dropdown15">
                  {subcategories[item.id].map((subCategory) => (
                    <div 
                      key={subCategory._id} 
                      className="dropdown-item15"
                      onClick={() => handleSubcategoryClick(subCategory._id)} 
                    >
                      {subCategory.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div> */}

        <div class="menu-item">
          <Link to='/acrylic3'>    <div class="menu-heading">Acrylic Photoframe</div></Link>

        </div>
        <div class="menu-item">
          {/* <div class="menu-heading" onClick={() => setIsModalOpen(true)}>Contact Us</div>
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
                              name='first_name'
                              type="text"
                              placeholder="Enter Your First name"
                              required
                            />
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="lastName"
                              name='last_name'
                              type="text"
                              placeholder="Enter Your Last name"
                              required
                            />
                          </div>
                          <div className="flex space-x-4">
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="email"
                              name='email'
                              placeholder="Enter Your Business Email Address*"
                              required
                            />
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="phone"
                              name='phone_number'
                              type="text"
                              placeholder="Enter Your Phone number*"
                              required
                            />
                          </div>
                          <div className="flex space-x-4">
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="city"
                              name='city'
                              type="text"
                              placeholder="Enter your city*"
                              required
                            />
                            <select
                              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="giftingFor"
                              name='gifting_for'
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
                              name='budget'
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
                              id="quantity-select" name="quantity_required" onChange={handleSelectChange}
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
                                name="other_quantity"
                                placeholder="Please specify"
                                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                              />
                            )}
                          </div>
                          <div className="w-full">
                            <textarea
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="wishingMessage"
                              name='message'
                              placeholder="Enter Your Message"
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
          )} */}
          <div className="menu-heading" onClick={() => setIsModalOpen(true)}>Contact Us</div>

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
                              name='first_name'
                              type="text"
                              placeholder="Enter Your First name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                            />
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="lastName"
                              name='last_name'
                              type="text"
                              placeholder="Enter Your Last name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="flex space-x-4">
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="email"
                              name='email'
                              placeholder="Enter Your Business Email Address*"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="phone"
                              name='phone_number'
                              type="text"
                              placeholder="Enter Your Phone number*"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              required
                            />
                          </div>
                          <div className="flex space-x-4">
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="city"
                              name='city'
                              type="text"
                              placeholder="Enter your city*"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              required
                            />
                            <select
                              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="giftingFor"
                              name='gifting_for'
                              value={giftingFor}
                              onChange={(e) => setGiftingFor(e.target.value)}
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
                              name='budget'
                              value={budgetPerGift}
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
                                value={budgetPerGift === 'other' ? '' : budgetPerGift}
                                onChange={(e) => setBudgetPerGift(e.target.value)}
                              />
                            )}
                            <select
                              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="quantity-select"
                              name="quantity_required"
                              value={quantityRequired}
                              onChange={handleSelectChange}
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
                                name="other_quantity"
                                placeholder="Please specify"
                                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                value={quantityRequired === 'other' ? '' : quantityRequired}
                                onChange={(e) => setQuantityRequired(e.target.value)}
                              />
                            )}
                          </div>
                          <div className="w-full">
                            <textarea
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="wishingMessage"
                              name='message'
                              placeholder="Enter Your Message"
                              rows="2"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
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
      </div>
      <div className=' md:hidden'>
        <Catalog />
      </div>
      <div style={{ backgroundImage: `` }} className='swiper-background  bg-left-top bg-no-repeat    relative  md:top-5'>
        <img src={group} alt="" className='group ' />

        <div className="w-full max-w-[70rem]  md:mx-auto px-3  mt-14 md:mt-2 md:px-4">
          {/* <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper w-full "
            
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} onClick={() => handleSlideClick(index)}>
                <div className='hidden md:block'>
                  <img src={slide.image} style={{ display: "flex", height: "100%", width: "100%", objectFit: "cover" }} className="block w-full h-[800px] md:h-auto  object-cover" alt={`slide${index + 1}`} />

                </div>
                <div className=' md:hidden'>
                  <img src={headerslider} style={{ height: "100%", width: "100%", objectFit: "cover" }} className={" hidden w-full h-[800px] md:h-auto  object-cover"} alt={`slide${index + 1}`} />

                </div>

              </SwiperSlide>
            ))}
          </Swiper> */}
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            className="mySwiper w-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} onClick={() => handleSlideClick(slide)}>
                <div className="">
                  <img
                    src={slide.image}
                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                    className="block w-full h-[800px] md:h-auto object-cover"
                    alt={`slide${index + 1}`}
                  />
                </div>
                {/* <div className="md:hidden">
            <img
               src={headerslider} // Assuming headerslider is a fallback image for mobile
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              className="hidden w-full h-[800px] md:h-auto object-cover"
              alt={`slide${index + 1}`}
            />
          </div> */}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='image-box  bg-white px-10  flex z-10 justify-around items-center absolute left-0 right-0  md:mx-auto md:left-auto md:right-auto  top-[3.3rem] md:top-[14.3rem]'>
            <div className='image-item   text-wrap'>
              <img src={icon5} alt="" className='box-image' />
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
        <Catalog />
      </div>


      {/* <div className='selling'>
        <h1 className='best'>Best Selling</h1>
        <h1 className='top'>Top Rated and Bestselling</h1>
        <div className="card-container">
          {visibleCards.map(card => (
           
            <div key={card.id} className="card-wrapper" style={{ cursor: 'pointer' }}>
              <div className="card1-product rounded-md">
                <div className="card-header w-36 h-56 md:h-72   md:w-full">
                <Link
            key={card.id}
            to={`/card/${card.id}`}
            className="card-link"
            onClick={(e) => e.stopPropagation()} 
          >
        
                  <div className=' w-full h-full flex items-center '>
                  <img src={card.imageUrl} alt="product"  className="card-image1 rounded-xl  w-23 flex   object-contain m-0 p-0"  />
                  </div>
                </Link>
                  <button
                    className="favorite-btn m-2 md:m-0"
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
           Load more
          </button>
        </div>
      )}
      </div> */}
      <div className='selling'>
        <h1 className='best'>Best Selling</h1>
        <h1 className='top'>Top Rated and Bestselling</h1>
        <div className="card-container">
          {visibleCards.length > 0 ? visibleCards.map(card => (
            <div key={card.id} className="card-wrapper" style={{ cursor: 'pointer' }}>
              <div className="card1-product rounded-md">
                <div className="card-header w-36 h-56 md:h-72 md:w-full">
                  <Link
                    to={`/similar/${card.id}`}
                    className="card-link"
                    onClick={(e) => e.stopPropagation()} // Prevent click on Link from triggering card's default action
                  >
                    <div className='w-full h-full flex items-center'>
                      <img src={card.imageUrl} alt="product" className="card-image1 rounded-xl w-23 flex object-contain m-0 p-0" />
                    </div>
                  </Link>
                  <button
                    className="favorite-btn m-2 md:m-0"
                    onClick={(e) => handleFavoriteButtonClick(card.id)}
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      background: 'none',
                      padding: '5px',
                    }}
                  >
                    <i
                      className={`fa-heart ${wishlistItems.data.data.some(item => item.product._id === card.id) ? 'fas' : 'far'}`}
                      style={{ color: wishlistItems.data.data.some(item => item.product._id === card.id) ? 'red' : '#23387A', fontSize: '24px' }}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="card-info">
                <p className="image-description">{card.description}</p>
                <p className='price'><span dangerouslySetInnerHTML={{ __html: card.price }} /></p>
              </div>
            </div>
          )) : (
            <p>No products available</p>
          )}
        </div>
        {showLoadMore && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={handleLoadMore} disabled={loading}>
              {loading ? 'Loading...' : 'Load More'}
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
            Get Discount {latestcoupon && latestcoupon.data ? latestcoupon.data.discount || "id not found" : "dfd"}% off
          </div>
          <div className="subscribe-form flex  flex-row md:flex-row items-left justify-start gap-2 mb-4 md:mb-6">
            <input value={latestcoupon && latestcoupon.data ? latestcoupon.data.code || "id not found" : "dfd"} disabled type="email" placeholder="Enter your email address" className="w-32 md:w-64 lg:w-80 h-10 px-4 border border-gray-300 text-white" />
            <button
              onClick={() => {
                const couponCode = latestcoupon && latestcoupon.data ? latestcoupon.data.code : "dfd";
                navigator.clipboard.writeText(couponCode)
                  .then(() => {
                    alert('Coupon code copied ');
                  })
                  .catch(err => {
                    console.error('Could not copy text: ', err);
                  });
              }}
              className="subscribe-button text-nowrap rounded-md md:rounded-none h-10 px-6 bg-[#23387A] text-white    hover:bg-[#1d2a5f]">
              copy code
            </button>
          </div>
          <p className="promo-paragraph pt-32 text-center md:pt-0 text-sm md:text-base lg:text-lg leading-relaxed  md:ml-[32rem] md:text-left">
            {latestcoupon && latestcoupon.data ? latestcoupon.data.title || "id not found" : "dfd"}
          </p>
        </div>
      </div>

      <div className='selling md:mt-96 '>
        <h3 className='best '>New Arrivals</h3>
        <h1 className='top '>Discover the Latest Trends</h1>
        <div className="card-container">
          {visibleCards1.length > 0 ? visibleCards1.map(card => (

            <div key={card.id} className="card-wrapper">
              <div className="card1-product rounded-md">
                <div className="card-header w-36 h-56 md:h-72   md:w-full">
                  <Link
                    key={card.id}
                    to={`/similar/${card.id}`}
                    className="card-link"
                    onClick={(e) => e.stopPropagation()} // Prevent click on Link from triggering card's default action
                  > <div className=' w-full h-full flex items-center '>
                      <img src={card.imageUrl} alt="product" className="card-image1 w-23  object-contain m-0 p-0" />
                    </div>
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
                      className={`fa-heart ${wishlistItems.data.data.some(item => item.product._id == card.id) ? 'fas' : 'far'}`}
                      style={{ color: wishlistItems.data.data.some(item => item.product._id == card.id) ? 'red' : '#23387A', fontSize: '24px' }}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="card-info">
                <p className="image-description w-36 md:w-full text-wrap text-center">{card.description}</p>
                <p className='price '><span dangerouslySetInnerHTML={{ __html: card.price }} /></p>
              </div>
            </div>
          )) : (
            <p>No products available</p>
          )}
        </div>

        {showLoadMore1 && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={handleLoadMore1} disabled={loading}>
              {loading ? 'Loading...' : 'Load More'}
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
            {visibleCards2.length > 0 ? visibleCards2.map(card => (

              <div key={card.id} className="card-wrapper">
                <div className="card1-product rounded-md">
                  <div className="card-header w-36 h-56 md:h-72   md:w-full">
                    <Link
                      key={card.id}
                      to={`/similar/${card.id}`}
                      className="card-link"
                      onClick={(e) => e.stopPropagation()} // Prevent click on Link from triggering card's default action
                    > <div className=' w-full h-full flex items-center '>
                        <img src={card.imageUrl} alt="product" style={{ height: card.height, position: 'relative', top: `${card.position}px` }} className="card-image1 w-23  object-contain m-0 p-0" onClick={() => handleCardClick2(card.id)} />
                      </div>
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
                        className={`fa-heart  ${wishlistItems.data.data.some(item => item.product._id == card.id) ? 'fas' : 'far'}`}
                        style={{ color: wishlistItems.data.data.some(item => item.product._id == card.id) ? 'red' : '#23387A', fontSize: '24px' }}
                      ></i>
                    </button>
                  </div>
                </div>
                <div className="card-info">
                  <p className="image-description text-wrap w-36 md:w-full text-center">{card.description}</p>
                  <p className='price'><span dangerouslySetInnerHTML={{ __html: card.price }} /></p>
                </div>
              </div>

            )) : (
              <p>No products available</p>
            )}
          </div>

          {showLoadMore2 && (
            <div className="load-more-container">
              <button className="load-more-btn" onClick={handleLoadMore2} disabled={loading}>
                {loading ? 'Loading...' : 'Load More'}
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
              to={`/similar/${card.id}`}
              className="card-link"
              onClick={(e) => e.stopPropagation()} // Prevent click on Link from triggering card's default action
            >
              <div className="card-wrapper">
                <div className="card1-product rounded-md">
                  <div className="card-header w-36 h-56 md:h-72   md:w-full">
                    <div className=' w-full h-full flex items-center '>
                      <img
                        src={card.imageUrl}
                        alt="product"
                        style={{ height: card.height, position: 'relative', top: `${card.position}px` }}
                        className="card-image1 w-23  object-contain m-0 p-0"
                      />
                    </div>
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
                        className={`fa-heart ${wishlistItems.data.data.some(item => item.product._id == card.id) ? 'fas' : 'far'}`}
                        style={{ color: wishlistItems.data.data.some(item => item.product._id == card.id) ? 'red' : '#23387A', fontSize: '24px' }}
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



        <img src={group} className='group6' />
        <Slider />
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
        <h3 className='best3 mt-12'>Offers</h3>
        {/* <h1 className='top3'>Top Picks for Winters</h1> */}
        <h1 className='top3'>{title}</h1>
        <TopPick />

      </div>

      {/* <img src={group5} className='group5' />  */}
      <Footer />

    </>
  );
}

export default Home;
