import BaseLayout from "../layouts/base";
import dynamic from "next/dynamic";
import 'regenerator-runtime/runtime';
import { Provider } from 'react-redux';
import store from '../redux/store';
import "../styles/globals.css";
import "../styles/dnd.css";
import "katex/dist/katex.min.css";

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
    </Provider>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
