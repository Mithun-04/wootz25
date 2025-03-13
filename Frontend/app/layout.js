import "./globals.css";
import Providers from "./provider";

export const metadata = {
  title: "Wootz 2025",
  description: "Your website description here",
};

export const viewport = {
  width: "device-width",
  initialScale: 0.9,
  maximumScale : 0.9,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">     
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
