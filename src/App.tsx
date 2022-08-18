import "./App.css";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { authState } = useAuthContext();

  return <div className="App"></div>;
}

export default App;
