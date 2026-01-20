export default function About() {
  return (
    <div style={{ padding: "20px" }}>
      <h1> About This Project</h1>

      <p>
        This project is a simple React application developed as part of a
        practical experiment to learn <b>React Router DOM</b>.
      </p>

      <h3>Technologies Used:</h3>
      <ul>
        <li>React JS</li>
        <li>React Router DOM</li>
        <li>JavaScript (ES6)</li>
        <li>Vite / Create React App</li>
      </ul>

      <h3> What is React Router?</h3>
      <p>
        React Router is a standard library for routing in React. It allows
        navigation between different components in a React application without
        refreshing the page.
      </p>

      <h3> Why Use It?</h3>
      <ul>
        <li>To build Single Page Applications (SPA)</li>
        <li>To improve user experience</li>
        <li>To manage multiple pages inside one app</li>
      </ul>

      <p>
        This project shows how <b>BrowserRouter</b>, <b>Routes</b>, and{" "}
        <b>Route</b> work together.
      </p>
    </div>
  );
}
