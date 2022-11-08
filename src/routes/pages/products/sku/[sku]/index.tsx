import { Resource, component$, useStyles$, useStore, useResource$, useContext, useContextProvider, createContext  } from '@builder.io/qwik';
import { useLocation, DocumentHead } from "@builder.io/qwik-city";
import {constants} from '~/components/var/global'
import {getCart, cartQty} from '~/components/cart/cart'
import { head } from '~/routes/pages/pricing';
import styles from './cart.css?inline';
import SimpleMaskMoney from 'simple-mask-money'
import { Display, cartQty } from '~/components/cart/cart';
//import { cartQty } from '~/components/cart/backup-tsx';

export const mytitle = "";
export default component$(() => {
// Default configuration
SimpleMaskMoney.args = {
  allowNegative: false,
  negativeSignAfter: false,
  prefix: constants.currency, //"$ ",
  suffix: '',
  fixed: true,
  fractionDigits: 2,
  decimalSeparator: '.',
  thousandsSeparator: ','
};

  useStyles$(styles);

  const { pathname, params } = useLocation();
  const store = useStore({
    productId: params.sku,
  });

  const productDetail = useResource$<string[]>(async ({ track, cleanup }) => {

    const proId = track(() => store.productId);

    const controller = new AbortController();
    cleanup(() => controller.abort());
    return getProductDetail(proId, controller);
    //console.log(data);

    //return data;
  });

  //  console.log("test");
  console.log(productDetail);

  return (

          <Resource
            value={productDetail}
            onPending={() =>
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <div class="alert alert-warning" role="alert">
                        <div class="text-center">
                          <div class="spinner-grow spinner-grow-sm text-danger" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                          <div class="spinner-grow spinner-grow-sm text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                          <div class="spinner-grow spinner-grow-sm text-warning" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            }
            onRejected={
              (error) => <>
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <div class="alert alert-danger" role="alert">
                      Error: {error.message}
                    </div>
                  </div>
                </div>
              </div>
              </>
            }
            onResolved={(product) => (
              <div>
                
                <Products data={product} />
                
                <div class="container">
                <div class="row">
                  <div class="col-12 pt-5">
                    <h2>Product Details and Features</h2>
                    <p>Aliquam facilisis, neque non scelerisque cursus, ipsum odio finibus elit, non vehicula lorem felis in lacus. Suspendisse a dui vel erat dignissim varius sed vitae risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam vel diam turpis. Cras semper eros sit amet tincidunt ultrices. Morbi ut cursus sapien. Fusce tristique ipsum eu quam eleifend, at cursus ligula malesuada. Nullam lobortis nulla ut venenatis posuere. Donec lobortis ex libero, quis varius dolor vehicula vel. Quisque nunc dolor, vulputate eget turpis ut, ornare dignissim odio. Vivamus hendrerit nisl at tellus facilisis, id gravida arcu fermentum.</p>
                    <ul>
                      <li>In et risus consectetur, mattis leo eget, elementum urna.</li>
                      <li>Duis molestie massa at sapien aliquet varius at sed dolor.</li>
                      <li>Aenean semper lectus ac tellus consectetur, vitae volutpat massa fringilla.</li>
                      <li>Suspendisse luctus arcu id lacus molestie, ut feugiat orci ornare.</li>
                      <li>Morbi id tortor porttitor, convallis nibh non, consequat nunc.</li>
                    </ul>
                    <p>Duis quam elit, commodo sed risus at, pellentesque tempor risus. Nam varius aliquam mauris scelerisque posuere. In ac elementum ex, ut efficitur tortor. Donec cursus, nibh rhoncus faucibus congue, sapien enim venenatis ligula, ut pretium metus dolor non erat. Nulla non interdum risus. Vestibulum quis ullamcorper nulla, a hendrerit sapien. Duis lacus neque, pulvinar tempus consectetur eu, lobortis eget magna. In rutrum sollicitudin elit vitae euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut a urna interdum, varius tellus sed, aliquam velit. Integer sagittis risus arcu, quis varius nisi sollicitudin sagittis. Nullam id posuere ex. Pellentesque vitae massa rutrum, cursus quam iaculis, pellentesque lorem.</p>

                    <p>Aenean gravida condimentum sem, in lobortis ante ullamcorper sollicitudin. Suspendisse quis porttitor lorem. Mauris quis ultricies eros, ac viverra tortor. Praesent pharetra dapibus placerat. Praesent ante ante, accumsan sed eros et, finibus vestibulum lacus. Nunc egestas et tellus non ultrices. Pellentesque aliquam nibh nulla. </p>
                  </div>
                </div>
              </div>

              </div>
            )}
          />

  );

});

export const Products = component$((props: { data: any }) => {
  const products = props.data;
  //console.log(products);
  return (  
    <ProductPreview productDetails={products} />
  );
});

interface CarouselStore {
  items: string[];
  itemsAlt: string;
}
export const CarouselContext = createContext<CarouselStore>('Carousel');

export const Carousel = component$(() => {
  const todos = useContext(CarouselContext);
  return (
   
   <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
     <div class="carousel-indicators">
       <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
       <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
       <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
     </div>
     <div class="carousel-inner">
       {todos.items.map((item) => (
         <div class={`carousel-item ${todos.items.indexOf(item) == 0 ? "active" : "" }`}>
           <img src={item} class="d-block w-100" alt={todos.itemsAlt}/>
         </div>
       ))}
     </div>
     <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
       <span class="visually-hidden">Previous</span>
     </button>
     <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
       <span class="carousel-control-next-icon" aria-hidden="true"></span>
       <span class="visually-hidden">Next</span>
     </button>
   </div>
   
  );
});

export const ProductPreview = component$((props: { productDetails: Array }) => {
  const product = props.productDetails;
  useContextProvider(
    CarouselContext,
    useStore<CarouselStore>({
      items: product.images,
      itemsAlt: product.description
    })
  );

  return (
    
    <div class="container">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12">

        <Carousel />

      </div>

      <div class="col-lg-6 col-md-6 col-sm-12">
        <h5 class="card-title placeholder-glow">
            {product.title} - <small>{product.brand}</small>
          </h5>
          <p class="card-text placeholder-glow">
            {product.description}
          </p>
          <h6><span class="text-danger">{SimpleMaskMoney.formatToCurrency(product.price)}</span> - Dis %: <span class="text-success">{product.discountPercentage}</span></h6>
          <p>Rating:
            <input
              class="rating d-inline-block"
              max="5"
              step="0.5"
              style={`--value:${product.rating}`}
              type="range"
              value={product.rating} />
          </p>
          <p>Stock: {product.stock}</p>
          <p>Category: {product.category}</p>
          <a 
            tabindex="-1" 
            class="btn btn-primary col-6" 
            onClick$={()=> { getCart({product}); } }
            >
            Add To Cart
          </a>
      </div>
      
    </div>
</div>
    
      );
    });
    
export async function getProductDetail( proId: string, controller?: AbortController ): Promise<string[]> {
  //https://dummyjson.com/products?limit=6&skip=96
  console.log('FETCH', `https://dummyjson.com/products/${proId}`);
  const resp = await fetch(`https://dummyjson.com/products/${proId}`, {
    signal: controller?.signal,
  });
  console.log('FETCH resolved');
  const json = await resp.json();
  //console.log(json?.title);
  //mytitle = json?.title;
  //getHead(mytitle);
  console.log(mytitle);
  return !Array.isArray(json)
    ? json
    : Promise.reject(json);
}

export const head: DocumentHead = {
  title: "Products"
};