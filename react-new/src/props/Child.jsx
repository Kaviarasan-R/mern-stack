// The child receives props from the parent
// Props come as an object: { name: "Alice", age: 8 }

function Child(props) {
  const { name, age } = props;

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
      <p>My name is <strong>{name}</strong></p>
      <p>I am <strong>{age}</strong> years old</p>
    </div>
  );
}

export default Child;