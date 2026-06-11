import React, {useReducer, useState} from "react";

function UseReducerHook() {
  const state = {
    count: 0,
    step: 5
  }

  function reducer(state, action) {
    switch (action.type) {
      case "step":
        return { ...state, step: action.payload };
      case "increment":
        return { ...state, count: state.count + state.step };
      case "decrement":
        return { ...state, count: state.count - state.step };
      case "reset":
        return { count: 0, step: 5 };
      default:
        return state;
    }
  }

  const [reducerState, reducerDispatch] = useReducer(reducer, state);

  // const [count, setCount] = useState(0)
  // const [step, setStep] = useState(5)
  //
  // function updateStep(value) {
  //   setStep(value)
  // }
  //
  // function increment() {
  //   setCount(count + step)
  // }
  //
  // function decrement() {
  //   setCount(count - step)
  // }
  //
  // function reset() {
  //   setCount(0)
  //   setStep(5)
  // }


  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Reducer Hook</h2>
      <p>Count & Step: {reducerState.count} & {reducerState.step}</p>

      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <button
            onClick={() => reducerDispatch({ type: "step", payload: 1 })}
        >
          Update Step
        </button>
        <button
          onClick={() => reducerDispatch({ type: "increment" })}
        >
          Increment
        </button>
        <button
          onClick={() => reducerDispatch({ type: "decrement" })}
        >
          Decrement
        </button>
        <button onClick={() => reducerDispatch({ type: "reset" })}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default UseReducerHook;
