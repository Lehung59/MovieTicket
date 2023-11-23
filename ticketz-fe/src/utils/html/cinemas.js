import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

export const getCinemas = (controller, cityId) => {
	const url = `${baseUrl}/cinemas?cityId:${cityId}`;
	const config = {signal: controller.signal}
	return axios.get(url, config);
}

const initialState = {
    cartCount: 0,
    cartId: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT_CART':
        const newState = {
          ...state,
          cartCount: state.cartCount + 1,
          cartId: [...state.cartId, action.payload.productId],
        };
  
        localStorage.setItem('reduxState', JSON.stringify(newState));
  
        return newState;
  
      case 'REMOVE_CART':
        const updatedState = {
          ...state,
          cartCount: state.cartCount - 1,
          cartId: state.cartId.filter(id => id !== action.payload.productId),
        };
  
        localStorage.setItem('reduxState', JSON.stringify(updatedState));
  
        return updatedState;
  
      default:
        return state;
    }
  };
  
  const storedState = localStorage.getItem('reduxState');
  const store = createStore(cartReducer, storedState ? JSON.parse(storedState) : initialState);
  
  export default store;