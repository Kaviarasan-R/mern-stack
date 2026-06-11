import { useParams } from "react-router-dom";

// useParams reads values from the URL path
// If the route is "/user/:id/:name" and the URL is "/user/42/alice"
// then useParams() gives us { id: "42", name: "alice" }

function UserPage() {
  const { id, name } = useParams();

  return (
    <div>
      <h2>Route Params Example</h2>
      <p>These values come from the URL path:</p>
      <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <p>User ID: <strong>{id}</strong></p>
        <p>User Name: <strong>{name}</strong></p>
      </div>
      <p style={{ marginTop: "10px", color: "#666" }}>
        Try changing the URL! For example: /user/99/bob
      </p>
    </div>
  );
}

export default UserPage;