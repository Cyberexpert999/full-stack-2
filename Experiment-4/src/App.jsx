import LocalCounter from "./components/LocalCounter";
import ContextCounter from "./components/ContextCounter";
import ReduxCounter from "./components/ReduxCounter";

function App() {
  return (
    <>
      <LocalCounter title="1" />
<LocalCounter title="2" />
      <ContextCounter title="1" />
      <ContextCounter title="2" />
      <ReduxCounter title="1" />
      <ReduxCounter title="2" />
    </>
  );
}

export default App;
