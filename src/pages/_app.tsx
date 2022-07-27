import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  NotifContextProvider,
  GlobalStatesContextProvider,
} from '../contexts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotifContextProvider>
      <GlobalStatesContextProvider>
        <Component {...pageProps} />
      </GlobalStatesContextProvider>
    </NotifContextProvider>
  );
}

export default MyApp;
