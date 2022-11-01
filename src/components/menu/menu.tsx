import { component$, useClientEffect$, useStore, useServerMount$ } from '@builder.io/qwik';
import { useContent, Link, useLocation } from '@builder.io/qwik-city';
import {getCartItems} from '~/components/cart/cart';
import {cartProducts, cartCount} from '~/components/var/global'

export default component$(() => {

  const { menu } = useContent();
  const loc = useLocation();
  const store = useStore({
    count: cartCount,
  });

  useClientEffect$(() => {
    const update = () => {
      store.count = getCartItems(cartProducts);
    };
    update();
    const tmrId = setInterval(update, 500);
    return () => clearInterval(tmrId);
  });

  return (
    
    <>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav nav-pills">
            {menu
              ? menu.items?.map((item) => (
                  
                  <>
                      {item.items?.map((item) => (
                        <li class={`nav-item-${item.text}`}>
                          <Link
                            href={item.href}
                            class={
                              `nav-link${loc.pathname === item.href ? ' active' : ''}`
                            }
                            aria-current={{
                              'page': loc.pathname === item.href,
                            }}
                          >
                            {item.text}
                          </Link>
                        </li>
                      ))}
                      <li class="nav-item">
                        <Link
                            href={"#offcanvasExample"}
                            class={
                              `nav-link active bg-primary bg-opacity-50`}
                            data-bs-toggle="offcanvas"
                            aria-controls="offcanvasExample"
                          >
                            <i class="bi bi-cart-fill"></i> {store.count == undefined ? 0 : store.count}{store.count <= 1 ? " Item" : " Items"}<br/>
                        </Link>
                      </li>
                  </>

                ))
              : null}
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
});