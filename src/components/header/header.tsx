import { component$, useStyles$ } from '@builder.io/qwik';
import { RequestHandler, useLocation } from '@builder.io/qwik-city';
//import Menu from '~/components/menu/menu';
import Menu from '../menu/menu'
import Cart from '../cart/cart'
import { QwikLogo } from '../icons/qwik';
import styles from './header.css?inline';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  useStyles$(styles);

  return (
      <div class="container">
        <header class="d-flex flex-wrap justify-content-center mb-4 border-bottom">
          <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none logo">
              <QwikLogo />
          </a>

          <Menu />
          <Cart />
          
        </header>
      </div>

  );
});
