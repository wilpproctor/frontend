import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function BaseLayout({ children }) {
  return (
    <>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>WILP Box</title>
      </Head>
      <Header />
      <main className={inter.className}>{children}</main>
      <Footer />
    </>
  );
}
