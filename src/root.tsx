import { component$ } from '@builder.io/qwik';
import { QwikCity, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import firebase from "firebase/app";
import { firebaseConfig } from "../components/database/db";
import './global.css';

export const firebaseConfig = component$(() => { 
  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
});

export default component$(() => {
  /*
   * The root of a QwikCity site always start with the <QwikCity> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */

  

  return (
    <QwikCity>
      <firebaseConfig />
      <head>
        <meta charSet="utf-8" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCity>
  );
});
