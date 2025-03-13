"use client";

import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </PersistGate>
    </Provider>
  );
}
