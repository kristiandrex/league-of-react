import { Provider } from "react-redux";
import Home from "pages/Home";
import store from "store";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
