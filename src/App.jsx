import "./App.css";
import Board from "./components/Board";
import { Footer } from "./components/Footer";
import Game from "./components/Game";
import Header from "./components/Header";
import { useCount } from "./hooks/useCount";

const App = () => {
 

  return (
    <div>
      <Board />
    </div>
  );
};

export default App;
