import { component$, useClientEffect$, useStore } from '@builder.io/qwik';
import { exit } from 'process';
import {cartProducts, cartCount} from '~/components/var/global'
//export const cartProducts = [];
//export var cartCount;

export var cartItemValue = 1;

interface productsCollectin {
  data: Array;
  value: Number;
}

export default component$(() => {

  
  const store = useStore({
    data: null,
    value: 1
  });

  useClientEffect$(( {track} ) => {
    track(() => store.data);
    track(() => cartItemValue);

    store.data = productCollection(cartProducts);
    const tmrId = setInterval(() => productCollection(cartProducts), 1000);
    return () => clearInterval(tmrId);

  });
    
  return (
    <>
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Shopping Cart</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            
            <button type="button" onClick$={()=> {cartProducts.length = 0}} class="btn btn-primary btn-sm"><i class="bi bi-cart-fill"></i> Clear Cart</button>
            
          </div>
          

          
              
                
                      {
                        <Display cartItems={store} />
                      }


          <div class="cart-footer text-right">
              <a href="page-checkout.html" class="btn btn-success my-1">Proceed to Checkout<i class="ri-arrow-right-line ml-2"></i></a>
          </div>
          
        </div>
      </div>
    </>
  );
});


export const Display = component$((props: {cartItems: any}) => {
  
  console.log(props.cartItems.data?.length);
  
  return (
    <>
    <div class="table-responsive">  
            <table class="table table-borderless">

<thead>
        <tr>
            <th scope="col"># </th>
            <th scope="col">Order Details</th>
            <th scope="col" class="text-right">Total</th>
            <th scope="col">Act.</th>
        </tr>
    </thead>
    <tbody>
{props.cartItems.data?.map((a)=>(
      
        <tr>
          <th scope="row">{props.cartItems.data.indexOf(a)+1}</th>
          <td>
              <div class="row">
                <div class="col-sm-4">
                <img src={a.thumbnail} class="img-fluid" width="35" alt={a.description} />
                </div>
                <div class="col-sm-8">
                  <div class="form-group mb-0">
                    <a href={`/pages/products/sku/${a.id}`} tabindex="-1" class="">
                    <strong>{a.title}</strong>
                    </a>
                    <br/>
                    <strong>${a.prices} * </strong>
                    <input 
                      type="number" 
                      class="form-control cart-qty" 
                      name={`cartQty-${a.id}`}
                      id={`cartQty-${a.id}`}
                      min="1" 
                      value={props.cartItems.value} 
                      onInput$={(ev) => (props.cartItems.value = (ev.target as HTMLInputElement).value)  } />
                  </div>
                </div>
              </div>
            </td>
          <td class="text-right">$ {a.price * props.cartItems.value}</td>
          <td><a href="#" class="text-danger" onClick$={ ()=> {cartProducts.splice(props.cartItems.data.indexOf(a), 1)}}><i class="bi bi-x-circle-fill"></i></a></td>
        </tr>
    
  ))}
    </tbody>
    </table>
          </div>

         
          <div class="order-total table-responsive ">
                        <table class="table table-borderless text-right">
                            <tbody>
                                <tr>
                                    <td>Sub Total :</td>
                                    <td>${getTotal(props.cartItems.data)}</td>
                                </tr>
                                <tr>
                                    <td>Shipping :</td>
                                    <td>$0.00</td>
                                </tr>
                                <tr>
                                    <td>Tax(1%) :</td>
                                    <td>$1.00</td>
                                </tr>
                                <tr>
                                    <td class="f-w-7 font-18"><h4>Amount :</h4></td>
                                    <td class="f-w-7 font-18"><h4>${getTotal(props.cartItems.data)}</h4></td>
                                </tr>
                            </tbody>
                        </table>
                    </div> 

    </>
  )
});


export function productCollection(store: productsCollectin) {
  store.data = cartProducts;
  return store.data.map((a)=> (a));
}

export function getTotal(item){
  let array=[];
  array.push(item?.map((a)=>(parseFloat(a.price))))
  let ab = array[0]?.reduce(myFunc, 0 );
  console.log(ab);
  return ab;
}

function myFunc(total, num) {
  return total + Math.round(num);
} 



export function getCart(item){
  cartItemValue = 1;
  cartItems(item.product);
}

export function cartItems(items){
  
  console.log(cartProducts.map((a)=> (a)))
  
  if( !cartProducts.find(c => checkCartItem(c) == checkCartItem(items) ) ){
    cartProducts.push(items);
      //console.log(cartProducts);
    cartCount = getCartItems(cartProducts);
    console.log(cartCount);

  } else {
    alert("Please update the quantity. Product already added.");
  }
  

  
  return Array.isArray(cartProducts) ? cartProducts.map((repo) => repo) : null;

}

export function checkCartItem(item){
  return item.title;
}

export function getCartItems(productLine){
  return productLine.length;
}

