import { component$, useStyles$ } from '@builder.io/qwik';
import { RequestHandler, useLocation } from '@builder.io/qwik-city';
//import Menu from '~/components/menu/menu';
import Menu from '../menu/menu'
import Cart from '../cart/cart'
import styles from './header.css?inline';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  useStyles$(styles);

  return (
      <div class="container-fluid sticky-top" style="padding: 0px;">
        <header class="d-flex flex-wrap mb-4">
          <Menu />
          <Cart />
        </header>
      </div>
  );
});
