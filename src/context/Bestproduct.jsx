import axios from "axios";
import { createContext, useContext, useEffect, useReducer,useCallback } from "react";
import { useParams } from 'react-router-dom'

import reducer from '../reducer/productReducer';

const AppContext = createContext();

const API = "https://api.hirdayam.com/api/getbestsellingproduct";
const API1 = "https://api.hirdayam.com/api/getPersonalizeProduct";


const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  products1: [],

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
  
  const getBestProducts1 = async (url1) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url1);
      
      // Log the entire response object to see the structure
      console.log("Full API Response:", res);
  
      // Extract the products array correctly
      const products1 = res.data.data.data;  // This matches the structure you shared
  
      console.log("Extracted Products Array:", products1);  // Log the products array
  
      if (Array.isArray(products1)) {
        dispatch({ type: "SET_API_DATA", payload: products1 });
      } else {
        console.error("Expected an array but got something else.");
        dispatch({ type: "API_ERROR" });
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
      dispatch({ type: "API_ERROR" });
    }
  };
  
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
  const getSingleProduct1 = useCallback(async (url, targetId) => {
    dispatch({ type: "SET_SINGLE_LOADING" });

    try {
        const res = await axios.get(url);
        console.log("Full response:", res);

        if (res && res.data && res.data.data) {
            const data = res.data.data;  // Accessing nested data
            const products = data.products;  // Accessing products from the nested data

            // Log to confirm products is an array
            console.log("Type of products:", typeof products); // Should be 'object'
            console.log("Is products an array?", Array.isArray(products)); // Should be true
            console.log("Products value:", products); // Should be the array of products

            if (Array.isArray(products)) {
                const filteredCard = products.find(item => item._id === targetId);
                console.log("Filtered product data:", filteredCard);

                if (filteredCard) {
                    dispatch({ type: "SET_SINGLE_PRODUCT", payload: filteredCard });
                } else {
                    console.error("No product found with the provided ID");
                    dispatch({ type: "SET_SINGLE_ERROR" });
                }
            } else {
                console.error("Products is not an array or is undefined.");
                dispatch({ type: "SET_SINGLE_ERROR" });
            }
        } else {
            console.error("No data or no products array in the response.");
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

const getSingleProduct2 = useCallback(async (url1, targetId) => {
  dispatch({ type: "SET_SINGLE_LOADING" });

  try {
      const res = await axios.get(url1);
      console.log("Full response:", res);

      const products1 = res.data.data.data;  // Accessing the correct array
      console.log("Products value:", products1); // Log products

      // Log the targetId to ensure it's the expected one
      console.log("Target ID:", targetId);

      // Filter the product based on the correct targetId
      const filteredCard = products1.find(item => item._id === targetId);
      console.log("Filtered product data:", filteredCard);

      if (filteredCard) {
          dispatch({ type: "SET_SINGLE_PRODUCT", payload: filteredCard });
      } else {
          console.warn(`No product found with the provided ID: ${targetId}`);
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



  useEffect(() => {
    getBestProducts1(API1);
  }, []);
  
  return (
    <AppContext.Provider value={{ ...state, getSingleProduct,getSingleProduct1,getSingleProduct2 }}>
      {children}
    </AppContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
