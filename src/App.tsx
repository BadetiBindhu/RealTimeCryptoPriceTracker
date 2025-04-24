import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store';
import { fetchCryptoData } from './features/crypto/cryptoSlice';
import { simulateCryptoUpdates } from './mocks/mockWebSocket';
import CryptoTable from './components/CryptoTable';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Dispatch fetchCryptoData to get initial assets from the API
    dispatch(fetchCryptoData());

    // Simulate WebSocket updates every 2 seconds
    const intervalId = setInterval(() => {
      simulateCryptoUpdates(dispatch);
    }, 2000); // Every 2 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4">Crypto Price Tracker</h1>
      <CryptoTable />
    </div>
  );
}

export default App;
