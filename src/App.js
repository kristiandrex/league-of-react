import { Provider } from "react-redux";
import store from "store";
import Home from "components/Home";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
