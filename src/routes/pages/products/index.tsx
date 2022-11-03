import { Resource, component$, useStore, useResource$, useStyles$} from '@builder.io/qwik';
import type { DocumentHead, DocumentMeta } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import styles from '../../pages/products/sku/[sku]/cart.css?inline'

export default component$(() => {
  useStyles$(styles);

  interface State {
    data: any;
    limit: number;
    skip: number;
  }

  const store = useStore<State>({ data: null, limit: 12, skip: 0 });

  const getProductPage = useResource$<any>(async ({ track, cleanup }) => {

    const limitPage = store.limit;
    const skipProduct = track(() => store.skip);

    const controller = new AbortController();
    cleanup(() => controller.abort());

    return getProducts(limitPage, skipProduct, controller);
  
  });

  console.log(getProductPage);

  return (

          <Resource
            value={getProductPage}
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
                
                <div class="clearfix">
                  <ProductPagination totalProducts={product.total} productLimit={product.limit} storeData={store}/>
                </div>
                
                <Products data={product} />
                
                <ProductPagination totalProducts={product.total} productLimit={product.limit} storeData={store}/>

              </div>
            )}
          />


  );

});

export const Products = component$((props: { data: any }) => {
  const products = props.data.products;

  //console.log(products);
  return (
    <div class="container">
      

      {products && (
          <main class="row">
            {
              
              products.map((productDetails: IStory) => (
                <ProductPreview productDetails={productDetails} />
              ))
            
            }
          </main>
        )}
      
    </div>
  );
});

export const ProductPreview = component$((props: { productDetails: Array }) => {
  const productDetails = props.productDetails;

  return (
    
        <div class="col-3">
          
          <div class="card mb-4" aria-hidden="true">
            <img src={productDetails.thumbnail} class="card-img-top" alt={productDetails.description}></img>
            <div class="card-body">
                <h6 class="card-title placeholder-glow">
                  <Link
                  href={`/pages/products/sku/${productDetails.id}`} >
                  <strong>{productDetails.title} - <small>{productDetails.brand}</small></strong>
                </Link>
                </h6>
                {
                  /*
                  <p class="card-text placeholder-glow">
                    {productDetails.description}
                  </p>
                  */
                }
                
                <h6>$ <span class="text-danger">{productDetails.price}</span> - Discount: <span class="text-success">{productDetails.discountPercentage}</span></h6>
                <p>Rating:
                  <input
                    class="rating d-inline-block"
                    max="5"
                    step="0.5"
                    style={`--value:${productDetails.rating}`}
                    type="range"
                    value={productDetails.rating} />
                </p>
                <p>Stock: {productDetails.stock}</p>
                {
                  /*
                  <p>Category: {productDetails.category}</p>
                  */
                }
                

                <Link
                  href={`/pages/products/sku/${productDetails.id}`}
                  class={`btn btn-primary col-6`} >
                  Read More
                </Link>
            </div>
          </div>
        </div>
    
      );
    });

    export const ProductPagination = component$((props: {totalProducts: Number, productLimit: Number, storeData: any}) => {
      let limit = props.productLimit;
      let total = props.totalProducts;
    
      return (
        <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link" href={`#`} onClick$={() => { props.storeData.skip = 0 }}>First</a>
          </li>
              {
                genePagi(total, limit, props.storeData)
              }
          <li class="page-item">
            <a class="page-link" href={`#`} preventdefault:click onClick$={()=> { props.storeData.skip = total-limit } }>Last</a>
          </li>
        </ul>
      </nav>
      
      );
    });

    export function genePagi(totalCount:Number, pageLimit:Number, state:any) {
      let mypages = [];
      let total = totalCount/pageLimit;
    
      for (let i=0; i<=total;i++){
        
        i == 0 ? (
          mypages[i] = ""
        ) : (
          state.skip == (i-1) * pageLimit ? (
            mypages[i] = <li class="page-item disabled"><a class="page-link" onClick$={()=> { state.skip = (i-1)*pageLimit } } href={`#`}><strong>{mypages.push(i) - 1}</strong></a></li>
          ) : (
            mypages[i] = <li class="page-item"><a class="page-link" onClick$={ () => {state.skip = (i-1)*pageLimit} } href={`#`}>{mypages.push(i) - 1}</a></li>
          )
        )
      }
      return mypages;
    }

export async function getProducts( limit: number, skip: number, controller?: AbortController ): Promise<string[]> {
  //https://dummyjson.com/products?limit=6&skip=96
  console.log('FETCH', `https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  const resp = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`, {
    signal: controller?.signal,
  });
  console.log('FETCH resolved');
  const json = await resp.json();
  //console.log(json);
  return !Array.isArray(json)
    ? json
    : Promise.reject(json);
}

export const head: DocumentHead = {
  title: 'Products'
};