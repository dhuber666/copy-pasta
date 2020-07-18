import "../styles/index.css";
import { Provider } from "next-auth/client";
import axios from "axios";

axios.defaults.baseURL = process.env.SITE || "http://localhost:3000";

function MyApp({ Component, pageProps }) {
  const { session } = pageProps;

  return (
    <Provider options={{ site: process.env.SITE }} session={session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
