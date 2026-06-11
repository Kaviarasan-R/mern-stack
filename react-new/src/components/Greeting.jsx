// A component is just a function that returns some HTML (JSX)
// This is the simplest component you can make!

function Greeting() {
  return (
    <div>
      <h2>Components Example</h2>
      <p>Hello! I am a simple component.</p>
      <p>A component is just a function that returns HTML.</p>
      <FruitList />
    </div>
  );
}

// You can have many components in one file
// This component shows a list of fruits
function FruitList() {
  const fruits = ["Apple", "Banana", "Mango"];

  return (
    <div style={{ marginTop: "10px" }}>
      <h3>My Favorite Fruits:</h3>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

export default Greeting;