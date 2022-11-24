import { component$, useClientEffect$, useStore, useStyles$, useWatch$ } from '@builder.io/qwik';
import { useContent, Link, useLocation } from '@builder.io/qwik-city';
import {getCartItems} from '~/components/cart/cart';
import {constants} from '~/components/var/global';
import Menu1 from '../menu/menu1'
import { QwikLogo } from '../icons/qwik';
import styles from './menu.css?inline';

export default component$(() => {
  
  //useStyles$(styles);
  const { menu } = useContent();
  const loc = useLocation();
  const store = useStore({
    count: 0,
  });

  useClientEffect$(({cleanup, track}) => {
  //useWatch$(({cleanup, track}) => {
    const counter = track(() => store.count);
    /*
    track(() => store.count);

    const update = () => {
      store.count = getCartItems(constants.cartProducts);
    };
    update();
*/
    
    const update = () => {
      
      store.count = getCartItems(constants.cartProducts);
      //console.log(`${store.count} - test cart`);
    };
    update();
    const tmrId = setInterval(update, 1000);
    cleanup(() => clearInterval(tmrId));
    //return () => clearInterval(tmrId);
    
  });
  return (
    
    <>

    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
          <Link
            href={"/"}
            class={`navbar-brand`}
            >
              <QwikLogo />
          </Link>
          <button class="navbar-toggler p-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="bi bi-list"></span>
          </button>
          <div class="collapse navbar-collapse text-end" id="navbarNav">
            <ul class="nav navbar-nav">
                {menu
                  ? menu.items?.map((item) => (
                      
                      <>
                          {item.items?.map((item) => (
                            <li class={`nav-item-${item.text} dropdown`}>
                              <Link
                                href={item.href}
                                class={ `nav-link${loc.pathname === item.href ? ' active' : ''} ${item.text === "About Us" ? "dropdown-toggle" : ""}`}
                                aria-current={{ 'page': loc.pathname === item.href }}
                                data-bs-toggle="dropdown" aria-expanded="false">
                                {item.text}
                              </Link>
                              {item.text == "About Us" ? <Menu1 /> : "" }                              
                            </li>
                          ))}
                          <li class="nav-item  d-none d-lg-block">
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
          <div class="nav-item  d-sm-none d-xs-none d-md-none d-inline-block">
            <Link
                href={"#offcanvasExample"}
                class={
                  `nav-link active bg-primary bg-opacity-50 p-2 text-white`}
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasExample"
              >
                <i class="bi bi-cart-fill"></i> {store.count == undefined ? 0 : store.count}
            </Link>
          </div>
          

      </div>
    </nav>
    </>
  );
});