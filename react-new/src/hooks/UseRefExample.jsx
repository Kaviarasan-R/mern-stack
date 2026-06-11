import {useEffect, useRef, useState} from "react";

export default function UseRefExample() {
    const [count, setCount] = useState(0);
    const [count1, setCount1] = useState(0);

    const refCount = useRef(0);
    const refElement = useRef(null);

    let normalCount = 0

    useEffect(() => {
        refCount.current = count;
        normalCount = count;
        // setCount1(count)

        console.log("refCount", refCount)

        if (refElement.current) {
            refElement.current.style.backgroundColor = "lightGray";
            refElement.current.style.border = "1px solid blue";
            refElement.current.style.borderRadius = "5px";
            refElement.current.style.padding = "15px";
        }
    }, [count]);

    return (
        <div style={{ marginTop: "20px" }}>
            <h2 ref={refElement}>Ref Hook</h2>
            <p>State: {count} / {count1} / {normalCount}</p>
            <p>Ref: {refCount.current}</p>
            <button onClick={() => setCount((c) => c + 1)}>Increment</button>
        </div>
    )
}