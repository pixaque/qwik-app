import { Resource, component$, useWatch$, useStore, useResource$} from '@builder.io/qwik';

export default component$(() => {

  interface State {
    data: any;
    limit: number;
    skip: number;
  }

  const store = useStore<State>({ data: null, limit: 6, skip: 0 });

  const getProductPage = useResource$<any>(async ({ track, cleanup }) => {

    const limitPage = store.limit;
    const skipProduct = track(() => store.skip);

    const controller = new AbortController();
    cleanup(() => controller.abort());

    return getProducts(limitPage, skipProduct, controller);
  
  });

  console.log(getProductPage);

  return (

    
    <div>

          <Resource
            value={getProductPage}
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
              <div>
                
                <div class="clearfix">
                  <ProductPagination totalProducts={product.total} productLimit={product.limit} storeData={store}/>
                </div>
                
                <Products data={product} />
                
                <ProductPagination totalProducts={product.total} productLimit={product.limit} storeData={store}/>

              </div>
            )}
          />
      </div>

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

export const ProductPreview = component$((props: { productDetails: Array }) => {
  const productDetails = props.productDetails;

  return (
    
        <div class="col-4">
          
          <div class="card mb-4" aria-hidden="true">
            <img src={productDetails.thumbnail} class="card-img-top" alt={productDetails.description}></img>
            <div class="card-body">
                <h5 class="card-title placeholder-glow">
                  <a href={`/pages/products/sku/${productDetails.id}`} tabindex="-1" class="">
                    {productDetails.title} - <small>{productDetails.brand}</small>
                  </a>
                </h5>
                <p class="card-text placeholder-glow">
                  {productDetails.description}
                </p>
                <h6>$ <span class="text-danger">{productDetails.price}</span> - Discount: <span class="text-success">{productDetails.discountPercentage}</span></h6>
                <p>Rating: {productDetails.rating}</p>
                <p>Stock: {productDetails.stock}</p>
                <p>Category: {productDetails.category}</p>
                <a href={`/pages/products/sku/${productDetails.id}`} tabindex="-1" class="btn btn-primary col-6">Read More</a>
            </div>
          </div>
        </div>
    
      );
    });
    
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