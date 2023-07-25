import BaseLayout from "../layouts/base";
import dynamic from "next/dynamic";
import 'regenerator-runtime/runtime';

import "../styles/globals.css";
import "../styles/dnd.css";
import "katex/dist/katex.min.css";

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
