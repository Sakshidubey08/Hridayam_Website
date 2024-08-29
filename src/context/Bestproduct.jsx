import axios from "axios";
import { createContext, useContext, useEffect, useReducer,useCallback } from "react";
import { useParams } from 'react-router-dom'

import reducer from '../reducer/productReducer';

const AppContext = createContext();

const API = "https://hridayam.dasoclothings.in/api/getbestsellingproduct";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  isSingleLoading: false,
  filteredCard: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getBestProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const products= await res.data
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  // const getSingleProduct = async (url) => {
  //   dispatch({ type: "SET_SINGLE_LOADING" });
  //   try {
  //     const res = await axios.get(url);
  //     console.log("Full response:", res);  // Log the full response
      
  //     // Check if data is present in res
  //     if (res && res.data) {
  //       console.log("Response data:", res.data);  // Log the `data` property
        
  //       if (res.data.data) {
  //         const card = res.data.data;  // Access the nested data array
  //         console.log("Card data:", card);  // Log the card data
  //         dispatch({ type: "SET_SINGLE_PRODUCT", payload: card });
  //       } else {
  //         console.error("Data not found in response data");
  //       }
  //     } else {
  //       console.error("No data property in response");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching single product:", error);  // Log the error
  //     dispatch({ type: "SET_SINGLE_ERROR" });
  //   }
  // };
  // const getSingleProduct = async (url, id) => {
  //   dispatch({ type: "SET_SINGLE_LOADING" });
  //   try {
  //     const res = await axios.get(url);
  //     console.log("Full response:", res);  // Log the full response
  
  //     // Check if the response and data are valid
  //     if (res && res.data && res.data.data) {
  //       console.log("Response data:", res.data);  // Log the entire response data
  
  //       // Access the data array directly
  //       const products = res.data.data;  // Use res.data.data as it contains the array of products
  //       console.log("Products data:", products);  // Log the products data
  
  //       // Verify the `id` parameter and `_id` field are consistent
  //       console.log("Provided ID:", id);
  
  //       // Filter the products based on the provided ID
  //       const filteredCard = products.filter(item => item.id === id);  // Use _id for comparison
  //       console.log("Filtered product data:", filteredCard);  // Log the filtered product data
  
  //       // Dispatch the filtered product data
  //       dispatch({ type: "SET_SINGLE_PRODUCT", payload: filteredCard });
  //     } else {
  //       console.error("No data property in response or empty data array");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching single product:", error);  // Log the error
  //     dispatch({ type: "SET_SINGLE_ERROR" });
  //   }
  // };
  
  // const getSingleProduct = async (url) => {
  //   dispatch({ type: "SET_SINGLE_LOADING" });
  
  //   try {
  //     // Fetch data from the API
  //     const res = await axios.get(url);
  //     console.log("Full response:", res);  // Log the full response
  
  //     // Check if the response and data are valid
  //     if (res && res.data && res.data.data) {
  //       console.log("Response data:", res.data);  // Log the entire response data
  
  //       // Access the data array directly
  //       const products = res.data.data;  // Use res.data.data as it contains the array of products
  //       console.log("Products data:", products);  // Log the products data
  
  //       // Check if the array is not empty
  //       if (products.length > 0) {
  //         // Example: Get the ID of the first product (or any specific logic to get ID)
  //         const targetId = products[0]._id;  // You can change this logic as needed
  //         console.log("Extracted ID:", targetId);
  
  //         // Find the product with the matching _id
  //         const filteredCard = products.find(item => item._id === targetId);  // Use _id for comparison
  //         console.log("Filtered product data:", filteredCard);  // Log the filtered product data
  
  //         // Dispatch the filtered product data
  //         if (filteredCard) {
  //           dispatch({ type: "SET_SINGLE_PRODUCT", payload: filteredCard });
  //         } else {
  //           console.error("No product found with the provided ID");
  //           dispatch({ type: "SET_SINGLE_ERROR" });
  //         }
  //       } else {
  //         console.error("No products found in the response");
  //         dispatch({ type: "SET_SINGLE_ERROR" });
  //       }
  //     } else {
  //       console.error("No data property in response or empty data array");
  //       dispatch({ type: "SET_SINGLE_ERROR" });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching single product:", error);  // Log the error
  //     dispatch({ type: "SET_SINGLE_ERROR" });
  //   }
  // };
  // const getSingleProduct = async (url, targetId) => {
  //   dispatch({ type: "SET_SINGLE_LOADING" });
  
  //   try {
  //     // Fetch data from the API
  //     const res = await axios.get(url);
  //     console.log("Full response:", res);  // Log the full response
  
  //     // Check if the response and data are valid
  //     if (res && res.data && res.data.data) {
  //       console.log("Response data:", res.data);  // Log the entire response data
  
  //       // Access the data array directly
  //       const products = res.data.data;  // Use res.data.data as it contains the array of products
  //       console.log("Products data:", products);  // Log the products data
  
  //       // Find the product with the matching _id
  //       const filteredCard = products.find(item => item._id === targetId);  // Use _id for comparison
  //       console.log("Filtered product data:", filteredCard);  // Log the filtered product data
  
  //       // Dispatch the filtered product data
  //       if (filteredCard) {
  //         dispatch({ type: "SET_SINGLE_PRODUCT", payload: filteredCard });
  //       } else {
  //         console.error("No product found with the provided ID");
  //         dispatch({ type: "SET_SINGLE_ERROR" });
  //       }
  //     } else {
  //       console.error("No data property in response or empty data array");
  //       dispatch({ type: "SET_SINGLE_ERROR" });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching single product:", error);  // Log the error
  //     dispatch({ type: "SET_SINGLE_ERROR" });
  //   }
  // };
  
  
  // const getSingleProduct = async (targetId) => {
  //   dispatch({ type: "SET_SINGLE_LOADING" });
  
  //   try {
  //     // Fetch data from the API
  //     const res = await axios.get(API_URL);  // Replace API_URL with your actual API endpoint
  //     console.log("Full response:", res); 
  
  //     if (res?.data?.data) {
  //       const products = res.data.data;
  //       const filteredCard = products.find(item => item._id === targetId);
  //       console.log("Filtered product data:", filteredCard); 
  
  //       if (filteredCard) {
  //         dispatch({ type: "SET_SINGLE_PRODUCT", payload: filteredCard });
  //       } else {
  //         console.error("No product found with the provided ID");
  //         dispatch({ type: "SET_SINGLE_ERROR" });
  //       }
  //     } else {
  //       console.error("No data property in response or empty data array");
  //       dispatch({ type: "SET_SINGLE_ERROR" });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching single product:", error); 
  //     dispatch({ type: "SET_SINGLE_ERROR" });
  //   }
  // };
  // const getSingleProduct = useCallback(async (url,targetId) => {
  //   dispatch({ type: "SET_SINGLE_LOADING" });
  
  //   try {
  //     const res = await axios.get(url);
  //     if (res?.data?.data) {
  //       const products = res.data.data;
  //       const filteredCard = products.find(item => item._id === targetId);
  
  //       if (filteredCard) {
  //         dispatch({ type: "SET_SINGLE_PRODUCT", payload: filteredCard });
  //       } else {
  //         dispatch({ type: "SET_SINGLE_ERROR" });
  //       }
  //     } else {
  //       dispatch({ type: "SET_SINGLE_ERROR" });
  //     }
  //   } catch (error) {
  //     dispatch({ type: "SET_SINGLE_ERROR" });
  //   }
  // }, [dispatch]);
  const getSingleProduct = useCallback(async (url, targetId) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
  
    try {
      const res = await axios.get(url);
      console.log("Full response:", res);
  
      if (res && res.data && res.data.data) {
        const products = res.data.data;
        console.log("Products data:", products);
  
        const filteredCard = products.find(item => item._id === targetId);
        console.log("Filtered product data:", filteredCard);
  
        if (filteredCard) {
          dispatch({ type: "SET_SINGLE_PRODUCT", payload: filteredCard });
        } else {
          console.error("No product found with the provided ID");
          dispatch({ type: "SET_SINGLE_ERROR" });
        }
      } else {
        console.error("No data property in response or empty data array");
        dispatch({ type: "SET_SINGLE_ERROR" });
      }
    } catch (error) {
      console.error("Error fetching single product:", error);
  
      if (error.response && error.response.status === 404) {
        console.error("Product not found (404).");
      } else {
        console.error("An unexpected error occurred.");
      }
  
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  }, [dispatch]);
  
  
  

  useEffect(() => {
    getBestProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
