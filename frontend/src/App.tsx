import React from 'react';
import './App.css';

type Exchange = {
    id: number
    name: string
    price_point: number
}

function App() {
    const [formattedExchanges, setformattedExchanges] = React.useState("");
    let exchanges: Exchange[];
        // {id: 1, name: 'col', price_point: 12}
    // ];
  async function fetchExchanges(): Promise<Exchange[]> {
      const response = await window.fetch('/exchanges', {
        // learn more about this API here: https://graphql-pokemon2.vercel.app/
        method: 'GET',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        }});
      type JSONResponse = {
        data?: Exchange[]
        errors?: Array<{message: string}>
      }
      const {data, errors}: JSONResponse = await response.json()
      if (response.ok) {
        const responseData = data
        if (responseData) {
          // add fetchedAt helper (used in the UI to help differentiate requests)
          setformattedExchanges(responseData.map(d => <li key={d.id}>{d.name}</li>));
          // ({id: d.id, name: d.name, price_point: d.price_point}));
          return responseData;
        } else {
          return Promise.reject(new Error(`No pokemon with the name `))
        }
      } else {
        // handle the graphql errors
        const error = new Error(errors?.map(e => e.message).join('\n') ?? 'unknown')
        return Promise.reject(error)
      }
    };
    // async function fetchExchanges(): Promise<Exchange[]> {
    //   await fetch('/exchanges', {method: 'GET'}).json();
    // let fetchExchanges = () => {
      // fetch('/exchanges', {method: 'GET'}).then(res => {
          // exchanges = res.json();
          // exchanges = response.map(d => ({id: d.id, name: d.name, price_point: d.price_point}));
      // });
    // };

  return (
    <div className="App">
        <h2>Exchanges</h2>
        <button onClick={fetchExchanges}>Get Exchanges</button>
        <ul>
            {formattedExchanges}
        </ul>

    </div>
  );
}

export default App;
