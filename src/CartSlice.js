import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      // action.payload is the param u pass in while dispatching or the property of a dict
      const { id, name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem){
        // If item already exists in the cart, increase its quantity
        existingItem.quantity += 1; // incrementing the number of the items added to the cart
      } else {
        // If item does not exist, add it to the cart with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });

      }
    },
   removeItem: (state, action) => {
    const { name } = action.payload;
    state.items = state.items.filter(item => item.name !== name);
  }
      // const {name, image, cost } = action.payload;
      // const existingItem = state.items.find(item => item.name === name)
      // if (existingItem && existingItem.quantity> 0){
      //   existingItem.quantity--;
      // }
    },
  updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);

      if (itemToUpdate) {
        if (quantity <= 0) {
          // Remove item if quantity is zero or less
          state.items = state.items.filter(item => item.name !== name);
        } else {
          itemToUpdate.quantity = quantity;
        }
      }
  }
    // updateQuantity: (state, action) => {
    //   const {name, image, quantity} = action.payload;
    //   const itemToUpdate = state.items.find(item => item.name === name)
    //   if (itemToUpdate){
    //     // If item already exists in the cart, increase its quantity
    //     itemToUpdate.quantity = quantity; // update the quantity of your item if found rather than incre
    //   }else{
    //     state.items = state.items.filter(item  => item.name !== name);
    //   }
    
    // },

  // getTotal: (state, action) => {
  //   return state.items.reduce((total, item) => 
  //     total + item.cost * item.quantity, 0);
  // }
  },
);

{/* <input
  type="number"
  onChange={(e) =>
    dispatch(updateQuantity({
      name: 'Apple',
      quantity: Number(e.target.value)
    }))
  }
/> */}

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
