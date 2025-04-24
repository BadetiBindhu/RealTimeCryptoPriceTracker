// src/components/CryptoTable.tsx
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Sparklines, SparklinesLine } from 'react-sparklines'; // Optional chart visualization

export default function CryptoTable() {
  const assets = useSelector((state: RootState) => state.crypto.assets);
  console.log('Assets in table:', assets); // Debugging log

  if (assets.length === 0) {
    return <div>Loading...</div>; // Show loading message if assets are empty
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr>
            <th>#</th><th>Logo</th><th>Name</th><th>Symbol</th><th>Price</th>
            <th>1h%</th><th>24h%</th><th>7d%</th><th>Market Cap</th>
            <th>24h Volume</th><th>Supply</th><th>7D Chart</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={asset.id}>
              <td>{index + 1}</td>
              <td><img src={asset.image} alt={asset.name} width="24" /></td>
              <td>{asset.name}</td>
              <td>{asset.symbol.toUpperCase()}</td>
              <td>${asset.current_price.toLocaleString()}</td>
              <td className={asset.price_change_percentage_1h_in_currency >= 0 ? 'text-green' : 'text-red'}>
                {asset.price_change_percentage_1h_in_currency.toFixed(2)}%
              </td>
              <td className={asset.price_change_percentage_24h_in_currency >= 0 ? 'text-green' : 'text-red'}>
                {asset.price_change_percentage_24h_in_currency.toFixed(2)}%
              </td>
              <td className={asset.price_change_percentage_7d_in_currency >= 0 ? 'text-green' : 'text-red'}>
                {asset.price_change_percentage_7d_in_currency.toFixed(2)}%
              </td>
              <td>${asset.market_cap.toLocaleString()}</td>
              <td>${asset.total_volume.toLocaleString()}</td>
              <td>{asset.circulating_supply.toLocaleString()}</td>
              <td>
                <Sparklines data={asset.sparkline_in_7d.price} width={100} height={30}>
                  <SparklinesLine color="blue" />
                </Sparklines>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
