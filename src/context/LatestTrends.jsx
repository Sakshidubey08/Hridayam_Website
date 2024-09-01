import axios from "axios";
import { createContext, useContext, useEffect, useReducer,useCallback } from "react";
import { useParams } from 'react-router-dom'

import reducer from '../reducer/productReducer';

const AppContext = createContext();

const API = "https://api.hirdayam.com/api/getlatestTrendUser";

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
