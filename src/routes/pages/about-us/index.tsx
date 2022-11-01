import { component$ } from '@builder.io/qwik';

export default component$(() => {

  return (
    <div class="container-fluid">
    <div class="container">
      <h1>About Us</h1>
      <ul>
        <li>
          <a href="#" target="_blank">
            Edit this page
          </a>
        </li>
        <li>
          <a href="https://qwik.builder.io/chat" target="_blank">
            Join our community
          </a>
        </li>
        <li>
          <a href="https://github.com/BuilderIO/qwik" target="_blank">
            Github
          </a>
        </li>
        <li>
          <a href="https://twitter.com/QwikDev" target="_blank">
            @QwikDev
          </a>
        </li>
      </ul>
    </div>
  </div>
  );
});
