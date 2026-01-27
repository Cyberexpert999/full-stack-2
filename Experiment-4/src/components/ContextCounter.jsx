import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";

export default function ContextCounter({ title }) {
  const { count, setCount } = useContext(CounterContext);

  return (
    <div className="box green">
      <h2>{title} : Global State (ContextAPI) Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>INCREASE</button>
      <button onClick={() => setCount(count - 1)}>DECREASE</button>
    </div>
  );
}
