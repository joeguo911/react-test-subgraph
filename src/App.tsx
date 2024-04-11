import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [transfers, setTransfers] = useState();

  useEffect(() => {
    fetch(
      "https://api.studio.thegraph.com/query/70655/joetestsubgraph/v0.0.3",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{
            transfers(first: 5) {
            id
            from
            to
            value
            transactionHash
            }
          }`,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data.transfers);
        setTransfers(res.data.transfers);
      });
  }, []);

  return (
    <>
      <div>query data</div>
      <ul>
        <li>Transaction Hash</li>
        {transfers?.map((t, idx) => {
          return (
            <li key={idx}>
              <span>{t.transactionHash}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
