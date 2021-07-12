import Header from "@/components/Header";
import "@/styles/index.css";

function App({ Component, pageProps }) {
  return (
    <div className="app">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
