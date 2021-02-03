import { Provider } from "react-redux";
import store from "store";
import Home from "pages/Home";
import Header from "components/Header";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Home />
    </Provider>
  );
}

export default App;
