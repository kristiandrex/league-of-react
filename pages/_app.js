import App from "next/app";
import Header from "@/components/Header";
import { ThemeProvider } from "@/context/theme";
import { getVersions } from "@/services/champions";
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
  const { latest } = await getVersions();
  return { version: latest, ...appProps };
};

export default MyApp;
