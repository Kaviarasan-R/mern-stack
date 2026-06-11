import { useParams, useSearchParams } from "react-router-dom";

// This example combines BOTH:
// - useParams (reads from the path like /product/5)
// - useSearchParams (reads from the query like ?color=red&size=large)

function ProductPage() {
  // From the URL path: /product/:id
  const { id } = useParams();

  // From the URL query: ?color=red&size=large
  const [searchParams] = useSearchParams();
  const color = searchParams.get("color") || "not selected";
  const size = searchParams.get("size") || "not selected";

  return (
    <div>
      <h2>Params + Query Combined</h2>
      <p>This page reads from BOTH the path and the query string:</p>

      <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h3>Product Details:</h3>
        <p>Product ID (from path): <strong>{id}</strong></p>
        <p>Color (from query): <strong>{color}</strong></p>
        <p>Size (from query): <strong>{size}</strong></p>
      </div>

      <p style={{ marginTop: "10px", color: "#666" }}>
        Try this URL: /product/42?color=blue&size=large
      </p>
    </div>
  );
}

export default ProductPage;