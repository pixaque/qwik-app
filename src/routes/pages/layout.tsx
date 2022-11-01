import { component$, Slot } from '@builder.io/qwik';
import Footer from '~/components/footer/footer';
import Header from '~/components/header/header';
import Menu from '~/components/menu/menu'

export default component$(() => {
  return (
    <>
      <main>
        <Slot />
      </main>
    </>
  );
});
