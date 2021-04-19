import { Provider } from "react-redux";
import Main from "components/Main";
import Header from "components/Header";
import store from "store";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Main />
    </Provider>
  );
}

export default App;
