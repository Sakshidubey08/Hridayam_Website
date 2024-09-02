import axios from "axios";
import { createContext, useContext, useEffect, useReducer,useCallback } from "react";
import { useParams } from 'react-router-dom'

import reducer from '../reducer/productReducer';

const AppContext = createContext();

const API = "https://api.hirdayam.com/api/getbestsellingproduct";

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

const getSingleProduct2 = useCallback(async (url, targetId) => {
  dispatch({ type: "SET_SINGLE_LOADING" });

  try {
      const res = await axios.get(url);
      console.log("Full response:", res);

      // Adjusting to access the nested data structure
      if (res && res.data && res.data.data && Array.isArray(res.data.data.data)) {
          const products = res.data.data.data;  // Accessing the correct array

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

  useEffect(() => {
    getBestProducts(API);
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
