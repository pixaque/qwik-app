import { component$, useRef, useClientEffect$, useOnDocument, useWatch$, useStore } from '@builder.io/qwik';
import {constants} from '~/components/var/global'
import SimpleMaskMoney from 'simple-mask-money'
//export const cartProducts = [];
export const gCart = 0;

export const cartQty = [1];

interface productsCollectin {
  data: Array;
  count: number;
  debounced: number;
}

export const onGet = async () => {
  return constants.cartCount;
};

export default component$(() => {

  const outputRef = useRef();
  // Default configuration
  SimpleMaskMoney.args = {
    allowNegative: false,
    negativeSignAfter: false,
    prefix: constants.currency,
    suffix: '',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: '.',
    thousandsSeparator: ','
  };
  
  const store = useStore({
    data: null,
    count: 0,
    debounced: 0
  });

  
  useClientEffect$(( {cleanup, track} ) => {
  //useWatch$(( {track, cleanup} ) => {    
    track(() => constants.cartCount);
    //track(() => store.data);
    //console.log("test");
    const update = () => {
      //console.log(constants.cartProducts);
      //store.data = productCollection(constants.cartProducts == [] ? [] : constants.cartProducts);
      store.data = addtoCart(constants.cartProducts == [] ? [] : constants.cartProducts);
    };
    //update();
    const tmrId = setInterval(update, 500);
    cleanup(() => clearInterval(tmrId));
    //return () => clearInterval(tmrId);
  }, []);
  
  
  console.log('<App> renders');
  
  return (
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Shopping Cart</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        
        <div class="offcanvas-body">

              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" onClick$={()=> {constants.cartProducts.length = 0; cartQty.length = 0;}} class="btn btn-primary btn-sm"><i class="bi bi-cart-fill"></i> Clear Cart</button>
              </div>

              <Display cartItems={store} />
              
              <div class="cart-footer text-right">
                  <a href="#" class="btn btn-success my-1" onClick$={()=> { getFinalArray(constants.cartProducts, cartQty)}}>Proceed to Checkout<i class="ri-arrow-right-line ml-2"></i></a>
              </div>
            
          
        </div>
      </div>
  );
});
  
export const Display = component$((props: {cartItems: any}) => {
  
  //constants.cartCount = props.cartItems.data?.length;
  //console.log(props.cartItems.data?.length);

  return (
    <>
    <div class="table-responsive">

      <table class="table table-borderless">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Order Details</th>
                <th scope="col" class="text-right">Total</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
        {props.cartItems.data?.map((a)=>(
        <tr>
          <th scope="row">{props.cartItems.data.indexOf(a)+1}</th>
          <td>
              <div class="row">
                <div class="col-sm-2">
                  <img src={a.thumbnail} class="icon-xl shadow-lg border border-2 border-green rounded-circle" width="30" height="30" alt={a.description} />
                </div>
                <div class="col-sm-10">
                  <div class="form-group mb-0">
                    <a href={`/pages/products/sku/${a.id}`} tabindex="-1" class="d-inline-block">
                    <strong><small class="d-inline-block ">{a.title}</small></strong>
                    </a><br/>
                    <strong class="d-inline-block ">{SimpleMaskMoney.formatToCurrency(a.price)} * </strong>
                    <input 
                      type="number" 
                      class="form-control form-control-sm" 
                      name={`cartQty-${a.id}`}
                      id={`cartQty-${a.id}`}
                      min="1" 
                      value={cartQty[props.cartItems.data.indexOf(a)] == null | undefined ? 1 : cartQty[props.cartItems.data.indexOf(a)]}
                      onInput$={(ev) => 
                        {
                          props.cartItems.value = (ev.target as HTMLInputElement).value;
                          cartQty[props.cartItems.data.indexOf(a)] = props.cartItems.value;
                        }
                      } />
                  </div>
                </div>
              </div>
            </td>
          <td class="text-right">
            {SimpleMaskMoney.formatToCurrency(a.price * (cartQty[props.cartItems.data.indexOf(a)] == null | undefined ? 1 : cartQty[props.cartItems.data.indexOf(a)]))}
          </td>
          <td>
            
            <a 
              href="#" 
              class="text-danger" 
              onClick$={ ()=> {
                  constants.cartProducts.splice(props.cartItems.data.indexOf(a), 1); 
                  cartQty.splice(props.cartItems.data.indexOf(a) == null | undefined ? 1 : props.cartItems.data.indexOf(a), 1);
                }
                }>
                <i class="bi bi-x-circle-fill"></i>
            </a>
          </td>
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
                        <td>{getTotal(props.cartItems.data, cartQty)}</td>
                    </tr>
                    {
                    /*
                    <tr>
                        <td>Shipping :</td>
                        <td>$0.00</td>
                    </tr>
                    <tr>
                        <td>Tax(1%) :</td>
                        <td>$1.00</td>
                    </tr>
                    */}
                    <tr>
                        <td class="f-w-7 font-18"><h4>Amount :</h4></td>
                        <td class="f-w-7 font-18"><h4>{getTotal(props.cartItems.data, cartQty)}</h4></td>
                    </tr>
                </tbody>
            </table>
        </div> 

    </>
  )
});

export function getTotal(item, qty){
  let array=[];
  array.push(item?.map((a)=>(a.price)*(qty[item.indexOf(a)] == null | undefined ? 1 : qty[item.indexOf(a)])))
  let ab = array[0]?.reduce(myFunc, 0 );
  //console.log(ab);
  var gtotal = SimpleMaskMoney.formatToCurrency(ab == undefined | null ? "0" : ab);
  return gtotal;
}

function myFunc(total, num) {
  return total + num;
}

export function getFinalArray(item, qty){
  let order=[];
  let finalOrder=[];
  order.push(item?.map((a)=>(a.price)*(qty[item.indexOf(a)] == null | undefined ? 1 : qty[item.indexOf(a)])))
  let ab = order[0]?.reduce(myFunc, 0 );
  finalOrder.push(item?.map((b) => (
    {
      title: (b.title),
      description: (b.description),
      quantity: (qty[item.indexOf(b)] == null | undefined ? 1 : qty[item.indexOf(b)]),
      price: (b.price),
      product_total: ((b.price)*(qty[item.indexOf(b)] == null | undefined ? 1 : qty[item.indexOf(b)])),
      grand_total: ab
    } 
    )
  ));
  
  console.log(finalOrder);
  return finalOrder;
}

export function getCart(item){
  cartItems(item.product);
}

export function cartItems(items){
  
  if( !constants.cartProducts.find(c => checkCartItem(c) == checkCartItem(items) ) ){
    constants.cartProducts.push(items);
      constants.cartCount = undefined | null ? 0 : getCartItems(constants.cartProducts);

  } else {
    alert("Please update the quantity. Product already added.");
  }
  return Array.isArray(constants.cartProducts) ? constants.cartProducts.map((products) => products) : null;

}

export function checkCartItem(item){
  return item.title;
}

export function getCartItems(productLine){
  return productLine.length;
}

export function addtoCart(myProducts) {
  return myProducts.map((a)=> (a));
}