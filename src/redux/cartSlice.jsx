import { createSlice } from '@reduxjs/toolkit';

/**
 * Load cart from localStorage
 * @returns {Array} The cart items or empty array if none found
 */
const loadCartFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

/**
 * Save cart to localStorage
 * @param {Array} cartItems - The cart items to save
 */
const saveCartToLocalStorage = (cartItems) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Initialize state from localStorage
const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
      saveCartToLocalStorage(state);
    },
    
    deleteFromCart: (state, action) => {
      // Find the index of the first occurrence of the item with the specified id
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        // Remove only the first occurrence
        state.splice(index, 1);
        saveCartToLocalStorage(state);
      }
    },
    
    deleteAllFromCart: (state, action) => {
      // Remove all occurrences of items with the specified id
      const newState = state.filter(item => item.id !== action.payload.id);
      saveCartToLocalStorage(newState);
      return newState;
    },
    
    clearCart: (state) => {
      // Clear all items from cart
      localStorage.removeItem('cart');
      return [];
    },
    
    // Add ability to update quantity directly
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // If quantity is 0 or negative, remove all instances of the item
        const newState = state.filter(item => item.id !== id);
        saveCartToLocalStorage(newState);
        return newState;
      } else {
        // Count current items with this id
        const currentItems = state.filter(item => item.id === id);
        const currentCount = currentItems.length;
        
        if (quantity > currentCount) {
          // Add more items
          const itemToAdd = currentItems[0]; // Use the first item as template
          for (let i = 0; i < quantity - currentCount; i++) {
            state.push({ ...itemToAdd });
          }
        } else if (quantity < currentCount) {
          // Remove some items
          let toRemove = currentCount - quantity;
          for (let i = state.length - 1; i >= 0 && toRemove > 0; i--) {
            if (state[i].id === id) {
              state.splice(i, 1);
              toRemove--;
            }
          }
        }
        saveCartToLocalStorage(state);
      }
    },
    
    // Add item if it doesn't exist or increase quantity if it does
    addOrIncrement: (state, action) => {
      const item = action.payload;
      const existingItemIndex = state.findIndex(i => i.id === item.id);
      
      if (existingItemIndex !== -1) {
        // Item exists, just add another one
        state.push(item);
      } else {
        // New item
        state.push(item);
      }
      saveCartToLocalStorage(state);
    },
    
    // Restore cart from localStorage (useful after page reload)
    restoreCart: (state) => {
      const savedCart = loadCartFromLocalStorage();
      return savedCart;
    }
  }
});

export const { 
  addToCart, 
  deleteFromCart, 
  deleteAllFromCart, 
  clearCart,
  updateQuantity,
  addOrIncrement,
  restoreCart
} = cartSlice.actions;

// Calculate total cart value
export const getCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + Number(item.price || 0), 0);
};

// Group cart items by ID and count quantities
export const getGroupedCartItems = (cartItems) => {
  return cartItems.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = {
        ...item,
        quantity: 1
      };
    } else {
      acc[item.id].quantity += 1;
    }
    return acc;
  }, {});
};

export default cartSlice.reducer;