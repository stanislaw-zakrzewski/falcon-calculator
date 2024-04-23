import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import axios from 'axios';
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    const [exchangeRates, setExchangeRates] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState(null);

    useEffect(() => {
        axios
            .get('https://api.nbp.pl/api/exchangerates/tables/A')
            .then(function (response) {
                // handle success
                setExchangeRates(response.data[0].rates);
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);

    console.log(exchangeRates);
    console.log(selectedCurrency);

    return (
        <>
            {exchangeRates.length === 0 && <p>Loading...</p>}
            {exchangeRates.length > 0 && (
                <select onChange={(e) => setSelectedCurrency(e.target.value)}>
                    {exchangeRates.map((rate) => (
                        <option key={rate.code} value={rate.code}>
                            {rate.code} - {rate.currency}
                        </option>
                    ))}
                </select>
            )}
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </>
    );
}

export default App;
