import App from "next/app";
import { ThemeProvider } from "@/context/theme";
import Header from "@/components/Header";
import "@/styles/index.css";

function MyApp({ Component, pageProps, version }) {
  return (
    <div className="app">
      <ThemeProvider>
        <Header version={version} />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { version } = require("@/public/data/latest.json");
  return { version, ...appProps };
};

export default MyApp;
