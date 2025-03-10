'use client';
import { Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={<></>} persistor={persistor}>
            <Toaster position="top-center" reverseOrder={false} />
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
