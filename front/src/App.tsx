import Alert from "./components/Alert";
import Buttons from "./components/Buttons";
import View from "./components/View";

function App() {
  return (
    <div className="h-screen w-full font-mono">
      <Buttons />
      <View />
      <Alert/>
    </div>
  );
}

export default App;
