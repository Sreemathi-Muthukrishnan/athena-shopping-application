import * as actionTypes from './actionTypes';
import axios from 'axios';


export const userLogin =(userId,token, expirationDate)=>{
    return{
        type:actionTypes.USER_LOGIN,
        userId:userId,
        token:token,
        expirationDate: expirationDate
    };
};

export const userLogout =() =>{
    return {
        type:actionTypes.USER_LOGOUT,
    };
};

export const fetchProductsSuccess =(fetchedProducts) =>{
    return{
        type:actionTypes.FETCH_PRODUCTS,
        products:fetchedProducts
    }
}
export const fetchProducts =() =>{
    return dispatch =>{
        let fetchedProducts=[];
        return  axios.get(process.env.REACT_APP_BACKEND_URL + '/products/')
        .then(response =>{
          for(let key in response.data){
            fetchedProducts = response.data[key];
          }
          dispatch(fetchProductsSuccess(fetchedProducts));
        })
        .catch(err=>{
          throw(err);
        })
    }
}
export const fetchOrdersSuccess =(fetchedOrders) =>{
    return{
        type:actionTypes.FETCH_ORDERS,
        orders:fetchedOrders,
    }
}
export const fetchOrders = (user,token) =>{
    let config ={
        headers: {
            Authorization: 'Bearer '+token,
        }
    }
    return dispatch =>{
        let fetchedOrders = [];
        return axios.get(process.env.REACT_APP_BACKEND_URL +'/orders/'+user,config)
        .then(response =>{
            for(let key in response.data.orders){
                fetchedOrders.push(response.data.orders[key].products);
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch(err=>{
            throw(err);
        });
    }
}
export const productDescriptionSuccess =(product) =>{
    return{
        type:actionTypes.PRODUCT_DESCRIPTION,
        product:product,
     
    }
}
export const productDescription =(productId) =>{
    return dispatch =>{
        let product ={};
        return axios.get(process.env.REACT_APP_BACKEND_URL+ '/products/'+productId)
        .then(response =>{
            product ={
                ...response.data.product
            }
            dispatch(productDescriptionSuccess(product));
        }).catch(err=>{
            throw(err);
        });
    }
}

export const addToCartSuccess =(cart) =>{
    const product = cart.product;
    return{
        type:actionTypes.ADD_TO_CART,
        product: product
    }
}
export const addToCart =(cart,oldCart,token) =>{
    let includes = oldCart.findIndex(cartItem => cartItem.productId === cart.product.id); 
    if(includes !== -1){
        alert("Your product is already added in the cart!");
        return {
            type:actionTypes.ALREADY_IN_CART,
        };
    }
    let config ={
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch =>{
        return axios.post(process.env.REACT_APP_BACKEND_URL+ '/carts/',cart,config)
        .then(response =>{
        dispatch(addToCartSuccess(cart));
        alert("Your product has been added to the cart!");
     })
     .catch(err=>{
        throw(err);
     })
 
    }
 }

 export const fetchCartSuccess =(cart) =>{
    return{
        type: actionTypes.FETCH_FROM_CART,
        cart: cart
    }
}

export const fetchCart =(user,token) =>{
    let config ={
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch =>{
        let fetchedCart = [];
        return axios.get(process.env.REACT_APP_BACKEND_URL+ '/carts/'+user,config)
        .then(response =>{
            for(let key in response.data.cart){
                fetchedCart.push({
                    productId:response.data.cart[key].product.id,
                    ...response.data.cart[key].product,
                    id:response.data.cart[key].id,
                });
            }
           dispatch(fetchCartSuccess(fetchedCart));
        })
        .catch(err=>{
            throw(err);
        })
    }
}
export const deleteFromCartSuccess =(id) =>{
    return{
        type:actionTypes.DELETE_FROM_CART,
        id:id,
    }
}

export const deleteFromCart = (id,token) =>{
    let config ={
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch =>{
        return axios.delete(process.env.REACT_APP_BACKEND_URL+ '/carts/'+id,config)
        .then(response =>{
            dispatch(deleteFromCartSuccess(id));
            })
        .catch(err=>{
            throw(err);
        })
    }
    }


export const productItemQuantityIncrease = () =>{
    return{
        type: actionTypes.PRODUCT_ITEM_QUANTITY_INCREASE,
    }
}
export const productItemQuantityDecrease = () =>{
    return{
        type:actionTypes.PRODUCT_ITEM_QUANTITY_DECREASE,
    }
}
export const cartItemQuantityIncrease =(id)=>{
    return{
        type:actionTypes.CART_ITEM_QUANTITY_INCREASE,
        id:id,
    }
}
export const cartItemQuantityDecrease =(id)=>{
    return{
        type:actionTypes.CART_ITEM_QUANTITY_DECREASE,
        id:id,
    }
}

export const checkoutOrder =() =>{
    return{
        type:actionTypes.CHECKOUT_ORDER,
    }
}

export const orderPlacedSuccess =() =>{
    return{
        type: actionTypes.ORDER_PLACED,
    }
}

export const orderPlaced =(order,token)=>{
    
    let config ={
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch =>{
        return axios.post(process.env.REACT_APP_BACKEND_URL + '/orders/',order,config)
        .then(response =>{
            dispatch(orderPlacedSuccess());
        })
        .catch(err=>{
            throw(err);
        })
    }
}

export const searchProductsSuccess =(itemTask,listData) => {
    return{
        type:actionTypes.SEARCH_PRODUCTS,
        taskProperty:itemTask,
        searchList:listData
    };
}

export const searchProducts =(itemTask) =>{
   return dispatch =>{
       return axios.get(process.env.REACT_APP_BACKEND_URL+ '/products/')
         .then(response =>{
             let listData =[];
             for( let key in response.data){
                 listData= response.data[key];
             }
             dispatch(searchProductsSuccess(itemTask,listData));
         })
         .catch(error =>{
            throw(error);
         })
   }
};

export const checkAuthTimeout =(expirationTime) =>{
    const remainingTime = expirationTime.getTime() - new Date().getTime();
    return dispatch =>{
        setTimeout(()=>{
            dispatch(userLogout());
        },remainingTime );
    }
}
export const authCheckState = () =>{
    return dispatch =>{
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if(!storedData){
            dispatch(userLogout());
        }
        if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
            dispatch(userLogin(storedData.userId, storedData.token, new Date(storedData.expiration) ));
            dispatch(checkAuthTimeout(new Date(storedData.expiration)));
        }
    }
}

export const updateProductInventory =(product,id)=>{
    return dispatch =>{
        return  axios.patch(process.env.REACT_APP_BACKEND_URL +'/products/'+ id, product)
        .then(response =>{
          dispatch(fetchProducts());
        })
        .catch(err=>{
          throw(err);
        })
    }
}
export const updateProductRating=(product,id)=>{
    return dispatch =>{
        return  axios.patch(process.env.REACT_APP_BACKEND_URL +'/products/rating/'+ id, product)
        .then(response =>{
          console.log(response);
          dispatch(fetchProducts());
        })
        .catch(err=>{
          throw(err);
        })
    }
}

export const outOfStock =(id,name) =>{
    return{
        type:actionTypes.OUT_OF_STOCK,
        id:id,
        name:name
    }
}

export const onPurchasable = () =>{
    return{
        type: actionTypes.ON_PURCHASABLE,
    }
}