// Props = data you pass from a parent component to a child component
// Think of it like giving a gift to someone

import Child from "./Child";

function Parent() {
  // We send "name" and "age" as props to the Child
  return (
    <div>
      <h2>Props Example</h2>
      <p>I am the Parent. I send data to my children:</p>

      <div style={{ marginTop: "10px", display: "flex", gap: "20px" }}>
        <Child name="Alice" age={8} />
        <Child name="Bob" age={10} />
        <Child name="Charlie" age={6} />
      </div>
    </div>
  );
}

export default Parent;