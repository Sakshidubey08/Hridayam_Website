const ProductReducer = (state, action) => {
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
          isLoading: true,
        };
      case "SET_API_DATA":
        return {
          ...state,
          isLoading: false,
          products: action.payload.data,  // Adjusted to access `data` inside `payload`
          products1: action.payload.data,  // Adjusted to access `data` inside `payload`

        };
      case "API_ERROR":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case "SET_SINGLE_LOADING":
        return {
          ...state,
          isSingleLoading: true,
        };
      case "SET_SINGLE_PRODUCT":
        return {
          ...state,
          isSingleLoading: false,
          selectedProduct: action.payload,
          filteredCard: action.payload, 
          filteredProducts: action.payload, 
        };
      case "SET_SINGLE_ERROR":
        return {
          ...state,
          isSingleLoading: false,
          isError: true,
        };
      default:
        return state;
    }
  };
  
  export default ProductReducer;
  
  
