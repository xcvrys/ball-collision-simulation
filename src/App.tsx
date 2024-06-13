import Canvas from "./Canvas";
import Debug from "./components/debug";
import React from "react";

const App: React.FC = () => {
  return (
    <div className="App">
      <Debug />
      <Canvas />
    </div>
  );
};

export default App;
