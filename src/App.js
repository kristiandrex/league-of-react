import { Provider } from 'react-redux';
import store from 'store';
import ChampionsList from 'components/ChampionsList';

function App() {
  return (
    <Provider store={store}>
      <ChampionsList />
    </Provider>
  );
}

export default App;
