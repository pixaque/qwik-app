import { Resource, component$, useStore, useResource$, useContext, useContextProvider, createContext  } from '@builder.io/qwik';
import { useLocation, DocumentHead } from "@builder.io/qwik-city";
import {getCart} from '~/components/cart/cart'
import { head } from '~/routes/pages/pricing';

export const mytitle = "";
export default component$(() => {
   
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
      <div class="col-6">

        <Carousel />

      </div>

      <div class="col-6">
        <h5 class="card-title placeholder-glow">
            {product.title} - <small>{product.brand}</small>
          </h5>
          <p class="card-text placeholder-glow">
            {product.description}
          </p>
          <h6>$ <span class="text-danger">{product.price}</span> - Dis %: <span class="text-success">{product.discountPercentage}</span></h6>
          <p>Rating: {product.rating}</p>
          <p>Stock: {product.stock}</p>
          <p>Category: {product.category}</p>
          <a 
            tabindex="-1" 
            class="btn btn-primary col-6" 
            onClick$={()=> { getCart({product}) } }
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
  console.log(json?.title);
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