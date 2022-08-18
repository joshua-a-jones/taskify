import "./App.css";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { authIsReady, user } = useAuthContext();
  return <div className="App"></div>;
}

export default App;
