import { useState } from "react";

const INITIAL_VALUE = ["A", "B", "C"];

export default function App() {
  const [array, setArray] = useState(INITIAL_VALUE);
  const [value, setValue] = useState("");

  function removeFirstElement() {
    setArray((arr) => arr.slice(1));
  }

  function removeLetter(letter) {
    setArray((arr) => arr.filter((l) => l != letter));
  }

  function addFirstLetter(letter) {
    setArray((arr) => [letter, ...arr]);
  }

  function addLastLetter(letter) {
    setArray((arr) => [...arr, letter]);
  }

  function clearArray() {
    setArray([]);
  }

  function resetArray() {
    setArray(INITIAL_VALUE);
  }

  function updateAToH() {
    setArray((arr) => arr.map((curr) => (curr === "A" ? "H" : curr)));
  }

  function addElementAt(element, idx) {
    setArray((arr) => [...arr.slice(0, idx), element, ...arr.slice(idx)]);
  }

  return (
    <>
      <button onClick={removeFirstElement}>remove first element</button>
      <br />
      <button onClick={() => removeLetter("B")}>remove all B's</button>
      <br />
      <button onClick={() => addFirstLetter("A")}>
        Add A to the beginning
      </button>
      <br />
      <button onClick={() => addLastLetter("B")}>Add B to the end</button>
      <br />
      <button onClick={clearArray}>Clear Array</button>
      <br />
      <button onClick={resetArray}>Reset Array</button>
      <br />
      <button onClick={updateAToH}>Update A to H</button>
      <br />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={() => {
          addFirstLetter(value);
          setValue("");
        }}
      >
        Add to the beginning
      </button>

      <br />
      <button onClick={() => addElementAt("B", 2)}>Add B at index 2</button>

      <p>{array.join(",")}</p>
    </>
  );
}
