import React, { useState } from "react";

export default function Split() {
  const [number1, setNumber1] = useState(11);
  const [number2, setNumber2] = useState(2);
  const [chain, setChain] = useState("");
  const [result, setResult] = useState(0);

  const Split = (e) => {
    setNumber1(e.target.value);
  };

  const Split2 = (e) => {
    setNumber2(e.target.value);
  };

  const Chains = (e) => {
    setChain(e.target.value);
  };

  const calculateResult = () => {
    switch (chain) {
      case "+":
        setResult(number1 + number2);
        break;
      case "-":
        setResult(number1 - number2);
        break;
      case "*":
        setResult(number1 * number2);
        break;
      case "/":
        setResult(number1 / number2);
        break;
      default:
        setResult("Invalid operation");
    }
  };

  const handleBlur = () => {
    setResult(calculateResult(number1, number2, chain));
  };

  return (
    <section className="Block">
      <input type="number" onChange={Split} value={number1} />
      <select onChange={Chains} value={chain} id="operacje" onBlur={handleBlur}>
        <option value="+">Dodawanie (+)</option>
        <option value="-">Odejmowanie (-)</option>
        <option value="*">Mnożenie (*)</option>
        <option value="/">Dzielenie (/)</option>
      </select>
      <input type="number" onChange={Split2} value={number2} />
      <p>=</p>
      <span>{result}</span>
    </section>
  );
}
