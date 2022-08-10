import "../styles/globals.css";
import { MomentixProvider } from "../context/MomentixContext";

function MyApp({ Component, pageProps }) {
  return (
    <MomentixProvider>
      <Component {...pageProps} />;
    </MomentixProvider>
  );
}

export default MyApp;
