import { useSearchParams } from "react-router-dom";
import UserContext from "../context/userContext.jsx";
import {useContext} from "react";

// useSearchParams reads the "?" part of the URL
// Example URL: /search?query=hello&page=2
// query = "hello", page = "2"

function SearchPage() {
  const {user} = useContext(UserContext)
  console.log("SearchPage Component: ", user)

  const [searchParams, setSearchParams] = useSearchParams();

  // Read values from the URL
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";
  const sort = searchParams.get("sort") || "newest";

  // Update the URL when user types
  function handleQueryChange(e) {
    setSearchParams({
      query: e.target.value,
      page: page,
      sort: sort,
    });
  }

  function handleSortChange(e) {
    setSearchParams({
      query: query,
      page: page,
      sort: e.target.value,
    });
  }

  function goToPage(newPage) {
    setSearchParams({
      query: query,
      page: String(newPage),
      sort: sort,
    });
  }

  return (
    <div>
      <h2>useSearchParams Example</h2>
      <p>These values come from the URL after the "?" sign:</p>

      <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Search input - updates ?query= in the URL */}
        <div>
          <label>Search: </label>
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Type to search..."
          />
        </div>

        {/* Sort dropdown - updates ?sort= in the URL */}
        <div>
          <label>Sort by: </label>
          <select value={sort} onChange={handleSortChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {/* Page buttons - updates ?page= in the URL */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label>Page: </label>
          <button onClick={() => goToPage(Math.max(1, Number(page) - 1))}>Previous</button>
          <span>{page}</span>
          <button onClick={() => goToPage(Number(page) + 1)}>Next</button>
        </div>
      </div>

      {/* Show what's in the URL right now */}
      <div style={{ marginTop: "20px", padding: "10px", background: "#f5f5f5", borderRadius: "8px" }}>
        <h3>Current URL params:</h3>
        <p>query = "<strong>{query}</strong>"</p>
        <p>page = "<strong>{page}</strong>"</p>
        <p>sort = "<strong>{sort}</strong>"</p>
        <p style={{ marginTop: "5px", color: "#666" }}>
          Look at the address bar - it changes as you interact!
        </p>
      </div>
    </div>
  );
}

export default SearchPage;