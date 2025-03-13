'use client';
import { Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import "./globals.css";

export default function RootLayout({ children }) {
  useEffect(() => {
    const metaViewport = document.querySelector("meta[name=viewport]");
    if (metaViewport) {
      metaViewport.setAttribute("content", "width=device-width, initial-scale=0.8");
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Wootz 2025</title>
        <link rel="icon" type="image/png" href="/hero-img3.png" />
      </head>
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
