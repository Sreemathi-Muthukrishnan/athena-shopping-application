import * as actionTypes from '../actions/actionTypes';


const initialState={
    products: [],
    login:false,
    product:{},
    cart:[],
    orders:[],
    totalPrice:0,
    user:'',
    token:null,
    expirationDate:null,
    purchasable:true,
}

const userLogin =(state,action) =>{
  return{
    ...state,
    login:true,
    user:action.userId,
    token:action.token,
    expirationDate:action.expirationDate,
};
}
const userLogout =(state,action) =>{
  localStorage.removeItem('userData');
  return{
    ...state,
    login:false,
    token:null,
    user:'',
    expirationDate:null,
    orders:[],
    cart:[]
}
}

const fetchProducts =(state,action) =>{
  return{
    ...state,
    products:[...action.products],
  }
}

const productDescription =(state,action) =>{
  const newProduct = action.product;
            return{
                ...state,
                product:{
                    ...newProduct,
                }
            }
}
const addToCart =(state,action) =>{
            return{
                 ...state,
                 cart:[...state.cart,action.product]
            }

}

const fetchCart = (state,action) =>{
  let newCart = action.cart.map(c => {
    return {
      ...c,
      available:true
    }
  })
  return{
    ...state,
    cart:newCart,
  }
}

const alreadyInCart= (state,action) =>{
  return{
    ...state,
  }
}

const deleteFromCart =(state,action) =>{
  return{
    ...state,
    cart:state.cart.filter(list=>list.id !== action.id),
}
}
const productItemQuantityIncrease =(state,action) =>{
  let productItem = {...state.product};
  productItem.quantity = productItem.quantity+1;
  if(productItem.quantity >= productItem.inventory){
    alert("Stock availability is "+productItem.inventory+", please choose your quantity accordingly!");
  }
  return{
    ...state,
    product: productItem
  }
}
const productItemQuantityDecrease =(state,action) =>{
  let productIt ={ ...state.product};
  productIt.quantity = productIt.quantity - 1;
  if( productIt.quantity <= 0 ){
    productIt.quantity = 1;
  }
  return{
      ...state,
      product: productIt
  }
}
const cartItemQuantityIncrease =(state,action) =>{
  const cartItemIndex = state.cart.findIndex(item => item.id === action.id);
  const cartItemQuantity = state.cart[cartItemIndex].quantity;
  let newCartItemQuantity = cartItemQuantity + 1;
  if(newCartItemQuantity >= state.cart[cartItemIndex].inventory){
    alert("Stock availability is "+state.cart[cartItemIndex].inventory+" ,please choose your quantity accordingly!");
  }
  let newCartItemValue ={
    ...state.cart[cartItemIndex],
    quantity:newCartItemQuantity,
  }
  let oldCart =[...state.cart];
  oldCart[cartItemIndex]=newCartItemValue;
  return{
    ...state,
    cart:oldCart
  };
}

const cartItemQuantityDecrease =(state,action) =>{
  const cartItemIndex = state.cart.findIndex(item => item.id === action.id);
  const cartItemQuant = state.cart[cartItemIndex].quantity;
  let newCartItemQuant = cartItemQuant - 1;
  if( newCartItemQuant <= 0){
    alert("You can remove item from cart!");
    newCartItemQuant =1;
  }
  let newCartItemVal ={
    ...state.cart[cartItemIndex],
    quantity:newCartItemQuant,
  }
  let oldCar =[...state.cart];
  oldCar[cartItemIndex]=newCartItemVal;
  return{
    ...state,
    cart:oldCar
  };

}

const checkoutOrder =(state,action) =>{
  let price =state.totalPrice;
  let oldPriceCart = [...state.cart];
  price =oldPriceCart.reduce((sum,item) => sum +  (parseInt(item.quantity))*(parseInt(item.price)),0);
  return{
    ...state,
    totalPrice:price,
  };
}
const orderPlaced =(state,action) =>{
  return{
    ...state,
    totalPrice:0,
  }
}

const fetchOrders =(state,action) =>{
  let i,j;
  let fetchedOrders=[];
  for(i=0; i < action.orders.length ; i++){
    for(j=0; j < action.orders[i].length ; j++){
        fetchedOrders.push(action.orders[i][j]);
    }
  }
  return{
    ...state,
    orders:fetchedOrders,
  }
  
}
const searchProducts =(state,action) =>{
  let task = action.taskProperty;
      let currentProducts = action.searchList;
      let newProducts = action.searchList;
      if (task !== "") {
        newProducts = currentProducts.filter((product) => {
          const lcTask = product.name.toLowerCase();
          const filterTask = task.toLowerCase();
          return lcTask.startsWith(filterTask);
        });
       }
      return {
        ...state,
        products: newProducts,
      };
}

const outOfStock = (state,action)=>{
    console.log("OUT OF STOCK");
    let oldCart = [...state.cart]
    // eslint-disable-next-line array-callback-return
    oldCart.map(c => {
      if(c.productId === action.id){
        c.available = false
      }
    })
  //  if(productItemStock >= cartItemStock){
  //    return{
  //      ...state,
  //      purchasable:true,
  //    }
  //  }
  
      // alert(action.name + "has gone out of stock, Please remove it from the cart");
      return{
        ...state,
        cart:oldCart,
        purchasable:false,
      }
  
  //  else if(productItemStock < cartItemStock){
  //    alert("Availablility of "+action.name+ " is "+productItemStock+" please choose your quantity accordingly!");
  //    return{
  //     ...state,
  //     purchasable:false,
  //   }
  // }
}
const onPurchasable = (state,action)=>{
  return{
    ...state,
    purchasable:true
  }
}
const reducer =(state=initialState,action) =>{
    switch(action.type){
        case actionTypes.USER_LOGIN: return userLogin(state,action);
           
        case actionTypes.USER_LOGOUT: return userLogout(state,action);
            
        case actionTypes.FETCH_PRODUCTS: return fetchProducts(state,action);
         
        case actionTypes.PRODUCT_DESCRIPTION: return productDescription(state,action);
            
        case actionTypes.ADD_TO_CART: return addToCart(state,action);

        case actionTypes.FETCH_FROM_CART: return fetchCart(state,action);
            
        case actionTypes.DELETE_FROM_CART: return deleteFromCart(state,action);

        case actionTypes.PRODUCT_ITEM_QUANTITY_INCREASE: return productItemQuantityIncrease(state,action);

        case actionTypes.PRODUCT_ITEM_QUANTITY_DECREASE: return productItemQuantityDecrease(state,action);
             
        case actionTypes.CART_ITEM_QUANTITY_INCREASE: return cartItemQuantityIncrease(state,action);
         
        case actionTypes.CART_ITEM_QUANTITY_DECREASE: return cartItemQuantityDecrease(state,action);

        case actionTypes.ALREADY_IN_CART: return alreadyInCart(state,action);
         
        case actionTypes.CHECKOUT_ORDER: return checkoutOrder(state,action);
           
        case actionTypes.ORDER_PLACED: return orderPlaced(state,action);
           
        case actionTypes.FETCH_ORDERS: return fetchOrders(state,action);

        case actionTypes.SEARCH_PRODUCTS: return searchProducts(state,action);

        case actionTypes.OUT_OF_STOCK: return outOfStock(state,action);

        case actionTypes.ON_PURCHASABLE: return onPurchasable(state,action);
           
        default:
            return state;
    }
  
}

export default reducer;