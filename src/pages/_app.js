import Nav from "@/components/Nav";
import "@/styles/index.css";

function App({ Component, pageProps }) {
  return (
    <div className="app">
      <Nav />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
