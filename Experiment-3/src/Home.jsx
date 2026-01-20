export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1> Welcome to Our Website</h1>
      <p>
        This project is created using <b>React</b> and <b>React Router DOM</b>.
        It demonstrates how routing works in a Single Page Application (SPA)
        without reloading the browser.
      </p>

      <h3> Features of This Website:</h3>
      <ul>
        <li>Fast and responsive UI</li>
        <li>Navigation without page reload</li>
        <li>Uses BrowserRouter, Routes, and Route</li>
        <li>Component-based architecture</li>
        <li>Easy to extend and maintain</li>
      </ul>

      <h3> Objective of This Experiment:</h3>
      <p>
        The main objective is to understand how to implement routing in React
        using <b>react-router-dom</b> and create multiple pages inside a single
        React application.
      </p>

      <p>
        Use the navigation menu above to explore the About and Contact pages.
      </p>
    </div>
  );
}
