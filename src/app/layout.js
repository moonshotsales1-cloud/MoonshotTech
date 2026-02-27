import {
  Sora,
  Playfair_Display,
  Poppins,
  Inter,
  Urbanist,
} from "next/font/google";
import "./globals.css";
import MoonshotChat from "./components/reusable-components/MoonshotChat";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Digital Design & Marketing Agency | Moonshot Tech",
  description:
    "Moonshot Tech helps businesses grow with structured branding, web platforms, SEO, paid media, and measurable digital performance.",
  icons: {
    icon: "/images/favicon-logo.png",
  },
  alternates: {
    canonical: "https://www.techwithmoonshot.com/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${playfair.variable} ${poppins.variable} ${inter.variable} ${urbanist.variable} antialiased`}
      >
        {children}
        <MoonshotChat />
      </body>
    </html>
  );
}
