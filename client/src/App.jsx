import "./App.css";
import Todo from "./Todo";
import { Provider } from "react-redux";
import { store } from './store/store';

function App() {
  return (
    <div className="App">
        <Provider store={store}>
          <Todo />
        </Provider>
    </div>
  );
}

export default App;
