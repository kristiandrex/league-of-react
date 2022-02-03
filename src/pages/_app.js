import Header from "@/components/Header";
import { ThemeProvider } from "@/context/theme";
import "@/styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="app">
      <ThemeProvider>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
