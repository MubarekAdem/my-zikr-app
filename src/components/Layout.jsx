import Navbar from "./Navbar";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <div
      className={`${robotoSlab.className} min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white`}
    >
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
