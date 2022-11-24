import { component$, useClientEffect$, useStore, useStyles$, useWatch$ } from '@builder.io/qwik';
import { useContent, Link, useLocation } from '@builder.io/qwik-city';
import {getCartItems} from '~/components/cart/cart';
import {constants} from '~/components/var/global';
import styles from './menu.css?inline';

export default component$(() => {

  return (
    
    <>
      <ul class="dropdown-menu">
        <li><Link href={"/pages/about-us"}  class={`dropdown-item`}>About Us</Link></li>
        <li><Link href={"/pages/features"}  class={`dropdown-item`}>Features</Link></li>
        <li><Link href={"/pages/faqs"}  class={`dropdown-item`}>FAQs</Link></li>
      </ul>
    </>
  );
});