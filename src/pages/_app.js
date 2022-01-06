import { ThemeProvider } from "@/context/theme";
import Nav from "@/components/Nav";
import "@/styles/index.css";

function App({ Component, pageProps }) {
  return (
    <div className="app">
      <ThemeProvider>
        <Nav />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}

export default App;
