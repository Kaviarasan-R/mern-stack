import { useState } from "react";

// useState lets you remember things between renders
// Without useState, variables reset every time the component re-renders

function UseStateExample() {
  // Regular variable - this resets to 0 every render!
  let normalVariable = 0;

  // useState variable - React remembers this!
  // [value, setterFunction] = useState(initialValue)
  const [count, setCount] = useState(0);
  const [name, setName] = useState("World");

  function incrementNormal() {
    normalVariable = normalVariable + 1;
    console.log("normalVariable is now:", normalVariable);
    // But the screen won't update because React doesn't know about it!
  }

  function incrementCount() {
    // This tells React: "update count and re-render the screen"
    setCount(count + 1);
  }

  function decrementCount() {
    setCount(count - 1);
  }

  return (
    <div>
      <h2>useState Example</h2>

      {/* Normal variable - does NOT update on screen */}
      <div style={{ marginTop: "10px", padding: "10px", border: "1px solid red" }}>
        <h3>Normal Variable (broken):</h3>
        <p>Value: {normalVariable}</p>
        <button onClick={incrementNormal}>Click me (won't update screen)</button>
      </div>

      {/* useState variable - updates on screen */}
      <div style={{ marginTop: "10px", padding: "10px", border: "1px solid green" }}>
        <h3>useState Variable (works!):</h3>
        <p>Count: {count}</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={decrementCount}>- Minus</button>
          <button onClick={incrementCount}>+ Plus</button>
        </div>
      </div>

      {/* useState with text input */}
      <div style={{ marginTop: "10px", padding: "10px", border: "1px solid blue" }}>
        <h3>useState with Text:</h3>
        <p>Hello, {name}!</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name"
        />
      </div>
    </div>
  );
}

export default UseStateExample;