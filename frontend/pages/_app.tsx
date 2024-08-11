import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper, store, persistor } from "../store";

import "@/styles/globals.css";
import Loader from "@/components/Common/Loader";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Head>
          <title>Content Management System: Ajay</title>
        </Head>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
