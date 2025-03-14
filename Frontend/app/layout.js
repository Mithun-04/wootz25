import "./globals.css";
import Providers from "./provider";


export default function RootLayout({ children }) {
  return (
    <html lang="en">     
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
