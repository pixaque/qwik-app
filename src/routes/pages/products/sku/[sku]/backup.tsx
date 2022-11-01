import { Resource, component$, useStore, useResource$, useWatch$ } from '@builder.io/qwik';
import { useLocation } from "@builder.io/qwik-city";
import {getCart} from '~/components/cart/cart'
//import {cartProducts, cartCount} from '~/components/var/global'

export default component$(() => {

  //const productData = useEndpoint<ProductData>();
  const { pathname, params } = useLocation();

  //console.log(params)

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
    <div>

    <Resource
      value={productDetail}
      onPending={() => 
                
        <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="alert alert-warning" role="alert">
              Loading...
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

        <div class="container">
          <div class="row">
            <div class="col-6">
              <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  </div>
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img src={product.images[0]} class="d-block w-100" alt={product.description}/>
                    </div>
                    <div class="carousel-item">
                      <img src={product.images[1]} class="d-block w-100" alt={product.description}/>
                    </div>
                    <div class="carousel-item">
                      <img src={product.images[2]} class="d-block w-100" alt={product.description}/>
                    </div>
                    <div class="carousel-item">
                      <img src={product.images[3]} class="d-block w-100" alt={product.description}/>
                    </div>
                    <div class="carousel-item">
                      <img src={product.images[4]} class="d-block w-100" alt={product.description}/>
                    </div>
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
            </div>

            <div class="col-6">
              <h5 class="card-title placeholder-glow">
                  {product.title} - <small>{product.brand}</small>
                </h5>
                <p class="card-text placeholder-glow">
                  {product.description}
                </p>
                <h6>$ <span class="text-danger">{product.price}</span> - Discount: <span class="text-success">{product.discount}</span></h6>
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

        

      )}
    />
</div>
  );
});

export async function getProductDetail( proId: string, controller?: AbortController ): Promise<string[]> {
  console.log('FETCH', `https://dummyjson.com/products/${proId}`);
  const resp = await fetch(`https://dummyjson.com/products/${proId}`, {
    signal: controller?.signal,
  });
  console.log('FETCH resolved');
  const json = await resp.json();
  return !Array.isArray(json)
    ? json
    : Promise.reject(json);
}