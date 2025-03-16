import "./globals.css";
import Providers from "./provider";


export const metadata = {
  title: "Wootz 16 - April 5 & 6",
  description: "Empowering the Future with Metals",
  icons: {
    icon: "/wootz_icon.png", 
  },
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
