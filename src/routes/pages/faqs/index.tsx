import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {

  return (
    <div class="container-fluid">
    <div class="container">
      <h1>FAQ's</h1>
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
  title: 'Formal Answers and Questions',
  meta: [
    {
      name: "description",
      content:
        "Web developer that likes to tackle challenges, learn from them, write about them, and have fun while in the process!",
    },
    {
      name: "keywords",
      content:
        "QWIK framework,No hydration, auto lazy-loading, edge-optimized, and fun, Zero loading, Resumbale, Lazy Loading, Reduced Rendering, Scalability, Code Once, ",
    },
  ],
};