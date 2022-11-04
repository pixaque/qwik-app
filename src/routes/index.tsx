import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      
      <div class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div class="col-10 col-sm-8 col-lg-6">
            <img src="https://images.unsplash.com/photo-1546177461-3283e4aa3b0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" class="img-fluid border rounded-3 shadow-lg" alt="Bootstrap Themes" loading="lazy" />
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3">Responsive left-aligned hero with image</h1>
            <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">Primary</button>
              <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button>
            </div>
          </div>
        </div>
      </div>

      
      <div class="container-fluid px-4 py-5" id="custom-cards"  style="background-image: url('https://images.unsplash.com/photo-1569531115477-5e9a74a6a8ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80');">

      
        <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">

          <div class="col">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('https://getbootstrap.com/docs/5.2/examples/features/unsplash-photo-1.jpg'); background-size: cover; height: 500px;">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Short title, long jacket</h3>
                <ul class="d-flex list-unstyled mt-auto">
                  <li class="me-auto">
                    <img src="https://github.com/twbs.png" alt="Bootstrap" class="rounded-circle border border-white" width="32" height="32" />
                  </li>
                  <li class="d-flex align-items-center me-3">
                    <i class="bi bi-geo-fill"></i> 
                    <small>New York</small>
                  </li>
                  <li class="d-flex align-items-center">
                    <i class="bi bi-calendar3"></i>
                    <small> 2d</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('https://getbootstrap.com/docs/5.2/examples/features/unsplash-photo-2.jpg');background-size: cover; height: 500px;">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Much longer title that wraps to multiple lines</h3>
                <ul class="d-flex list-unstyled mt-auto">
                  <li class="me-auto">
                    <img src="https://github.com/twbs.png" alt="Bootstrap" class="rounded-circle border border-white" width="32" height="32" />
                  </li>
                  <li class="d-flex align-items-center me-3">
                    <i class="bi bi-geo-fill"></i>
                    <small>California</small>
                  </li>
                  <li class="d-flex align-items-center">
                    <i class="bi bi-calendar3"></i>
                    <small> 4d</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('https://getbootstrap.com/docs/5.2/examples/features/unsplash-photo-3.jpg');background-size: cover; height: 500px !important;">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Another longer title belongs here</h3>
                <ul class="d-flex list-unstyled mt-auto">
                  <li class="me-auto">
                    <img src="https://github.com/twbs.png" alt="Bootstrap" class="rounded-circle border border-white" width="32" height="32"/>
                  </li>
                  <li class="d-flex align-items-center me-3">
                    <i class="bi bi-geo-fill"></i>
                    <small>California</small>
                  </li>
                  <li class="d-flex align-items-center">
                    <i class="bi bi-calendar3"></i>
                    <small> 5d</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        
        </div>
      </div>
      

      <div class="container px-4 py-5">

        <div class="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
          <div class="d-flex flex-column align-items-start gap-2">
            <h3 class="fw-bold">Left-aligned title explaining these awesome features</h3>
            <p class="text-muted">Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
            <a href="#" class="btn btn-primary btn-lg">Primary button</a>
          </div>
          <div class="row row-cols-1 row-cols-sm-2 g-4">
            <div class="d-flex flex-column gap-2">
              <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                <i class="bi bi-collection"></i>
              </div>
              <h4 class="fw-semibold mb-0">Featured title</h4>
              <p class="text-muted">Paragraph of text beneath the heading to explain the heading.</p>
            </div>

            <div class="d-flex flex-column gap-2">
              <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                <i class="bi bi-gear-fill"></i>
              </div>
              <h4 class="fw-semibold mb-0">Featured title</h4>
              <p class="text-muted">Paragraph of text beneath the heading to explain the heading.</p>
            </div>

            <div class="d-flex flex-column gap-2">
              <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                <i class="bi bi-speedometer"></i>
              </div>
              <h4 class="fw-semibold mb-0">Featured title</h4>
              <p class="text-muted">Paragraph of text beneath the heading to explain the heading.</p>
            </div>

            <div class="d-flex flex-column gap-2">
              <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                <i class="bi bi-table"></i>
              </div>
              <h4 class="fw-semibold mb-0">Featured title</h4>
              <p class="text-muted">Paragraph of text beneath the heading to explain the heading.</p>
            </div>
          </div>
        </div>
      </div>
      
      
      
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik Docs Starter',
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
