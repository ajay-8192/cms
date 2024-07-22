import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper, store, persistor } from "../store";

import "@/styles/globals.css";
import Loader from "@/components/Common/Loader";

function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
