import { Link, Route, Routes } from "react-router-dom";
import Greeting from "./components/Greeting";
import Parent from "./props/Parent";
import UseStateExample from "./hooks/UseStateExample";
import UserPage from "./router/UserPage";
import SearchPage from "./router/SearchPage";
import ProductPage from "./router/ProductPage";
import UseEffectExample from "./hooks/UseEffectExample.jsx";
import UseContextExample from "./hooks/UseContextExample.jsx";

import UserProvider from "./provider/userProvider.jsx";
import UseRefExample from "./hooks/UseRefExample.jsx";
import ParentMemo from "./memoization/ParentMemo.jsx";
import UseReducerHook from "./hooks/UseReducerHook.jsx";

function App() {
  return (
    <div>
      <h1>React - Tutorial Examples</h1>

      {/* Navigation links */}
      <nav style={{ marginBottom: "20px", padding: "10px", background: "#f5f5f5", borderRadius: "8px" }}>
        <Link to="/">Home</Link>
        <Link to="/components">Components</Link>
        <Link to="/props">Props</Link>
        <Link to="/user/1/alice">Params</Link>
        <Link to="/search?query=hello&page=1&sort=newest">Search Params</Link>
        <Link to="/product/42?color=red&size=large">Params + Query</Link>
        <Link to="/usestate">useState</Link>
        <Link to="/useeffect">useEffect</Link>
        <Link to="/usecontext">useContext</Link>
        <Link to="/useref">useRef</Link>
        <Link to="/usememo">useMemo / useCallback</Link>
        <Link to="/usereducer">useReducer</Link>
      </nav>

      {/* Routes - each URL shows a different component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<Greeting />} />
        <Route path="/props" element={<Parent />} />
        <Route path="/user/:id/:name" element={<UserPage />} />
        <Route path="/search" element={
            <UserProvider>
                <SearchPage />
            </UserProvider>
        } />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/usestate" element={<UseStateExample />} />
        <Route path="/useeffect" element={<UseEffectExample />} />
        <Route path="/usecontext" element={
            <UserProvider>
                <UseContextExample />
            </UserProvider>
        } />
        <Route path="/useref" element={<UseRefExample />} />
        <Route path="/usememo" element={<ParentMemo />} />
        <Route path="/usereducer" element={<UseReducerHook />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome!</h2>
      <p>Click the links above to see each example.</p>
      <ul style={{ marginTop: "10px", lineHeight: "2" }}>
        <li><strong>Components</strong> - How to create reusable pieces of UI</li>
        <li><strong>Props</strong> - How to pass data from parent to child</li>
        <li><strong>Params</strong> - How to read values from the URL path</li>
        <li><strong>Search Params</strong> - How to read/write the ?query part of the URL</li>
        <li><strong>Params + Query</strong> - Both combined in one page</li>
        <li><strong>useState</strong> - How to remember and update values</li>
        <li><strong>useEffect</strong> - React hook lifecycle</li>
        <li><strong>useContext</strong> - Global State Management</li>
        <li><strong>useRef</strong> - Simple ref( DOM )</li>
        <li><strong>useCallback / useMemo</strong> - Memoization</li>
        <li><strong>useReducer</strong></li>
      </ul>
    </div>
  );
}

export default App;
