import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {

  return (
  
      <div class="container-fluid">
        <div class="container">
          <h1>Features</h1>
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

export const head: DocumentHead = {
  title: 'Features',
};