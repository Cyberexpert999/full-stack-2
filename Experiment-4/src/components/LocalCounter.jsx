import { useState } from "react";

export default function LocalCounter({ title }) {
  const [count, setCount] = useState(0);

  return (
    <div className="box blue">
      <h2>{title} : Local State Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>INCREASE</button>
      <button onClick={() => setCount(count - 1)}>DECREASE</button>
    </div>
  );
}
