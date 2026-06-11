import React, {useState, useCallback} from "react";
import ChildMemo from "./ChildMemo";

function ParentMemo() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // Without useCallback, this function would be recreated on every render
  const handleClick = useCallback(() => {
    alert("Button clicked!");
  }, [count])

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Memo Hook</h2>
      <p>Count: {count}</p>
      <p>Other: {other}</p>

      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <button onClick={() => setCount((c) => c + 1)}>Increment Count</button>
        <button onClick={() => setOther((o) => o + 1)}>Increment Other</button>
      </div>

      <div style={{ marginTop: 10 }}>
        <ChildMemo onClick={handleClick} />
      </div>
    </div>
  );
}

export default ParentMemo;
