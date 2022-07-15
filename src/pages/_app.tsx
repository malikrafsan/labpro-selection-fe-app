import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NotifContextProvider } from '../contexts';
import { useState } from 'react';

let notifCounter = 0;

function MyApp({
  Component,
  pageProps,
}: AppProps) {
  return (
    <NotifContextProvider>
      <Component {...pageProps} />
    </NotifContextProvider>
  );
}

export default MyApp;
