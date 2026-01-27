import { useDispatch, useSelector } from "react-redux";

export default function ReduxCounter({ title }) {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div className="box orange">
      <h2>{title} : Global State (Redux) Count: {count}</h2>
      <button onClick={() => dispatch({ type: "INC" })}>Increase</button>
      <button onClick={() => dispatch({ type: "DEC" })}>Decrease</button>
    </div>
  );
}
