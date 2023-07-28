import BaseLayout from "@/layouts/base";
import dynamic from "next/dynamic";
import 'regenerator-runtime/runtime';

import "@/styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
