# 🚀 Crypto Price Tracker

A real-time cryptocurrency price dashboard built with **React**, **Redux Toolkit**, and **TypeScript**, showcasing live market updates with a responsive UI. Simulates WebSocket behavior for continuous updates, ideal for learning real-time data flow and Redux architecture.

---

## 📹 Demo Walkthrough (2-5 min)
- Displays dynamic crypto prices with 1h/24h/7d % changes.
- Simulated WebSocket updates every 2 seconds.
- Uses Redux DevTools to visualize state changes.

---

## 📦 Tech Stack

| Layer         | Tech Used                          |
| ------------- | ---------------------------------- |
| Frontend      | React, TypeScript, Tailwind CSS    |
| State Mgmt    | Redux Toolkit, Redux Thunk         |
| API Data      | CoinGecko API                      |
| WebSocket Sim | JavaScript `setInterval()`         |
| Tooling       | Vite, Axios, ESLint, Prettier      |

---

## 🏗️ Architecture Overview

src/ ├── app/ # Redux store configuration ├── components/ # Reusable UI components (e.g., CryptoTable) ├── features/ │ └── crypto/ # Redux slice & async thunks ├── mocks/ # Simulated WebSocket logic └── App.tsx # Main component using simulation

yaml
Copy
Edit

### 🔁 State Flow

1. App dispatches `fetchCryptoData` on load.
2. Slice stores asset data in Redux store.
3. `simulateCryptoUpdates` uses `dispatch` to update state every 2s.
4. UI re-renders using `useSelector`.

---

## 💻 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/your-username/crypto-price-tracker.git
cd crypto-price-tracker

# Install dependencies
npm install

# Run the development server
npm run dev
⚠️ Make sure you have Node.js ≥ 16.x and npm ≥ 8.x installed.

✨ Features
✅ Fetch crypto data (CoinGecko)
✅ Simulate real-time price changes
✅ Responsive data table with % change coloring
✅ Live update every 2 seconds
✅ Redux DevTools support
✅ TypeScript-safe reducers and actions
✅ Sparkline placeholder for 7-day trend

🎁 Bonus Features (Optional Implemented)
✅ Real WebSocket Integration (Binance API): Replace simulated updates with wss://stream.binance.com:9443/ws/btcusdt@ticker

✅ Filters/Sorting: Sort by top gainers/losers, 24h volume, price, etc.

✅ Local Storage Support: Store theme preferences or filters

📊 Example API Used
https://api.coingecko.com/api/v3/coins/markets

ts
Copy
Edit
params: {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: 5,
  page: 1,
  sparkline: true,
  price_change_percentage: '1h,24h,7d'
}
🧠 Thought Process
Used Redux Toolkit to simplify slice/reducer logic.

simulateCryptoUpdates() mimics a WebSocket by mutating asset prices with randomness.

Maintained separation of concerns with slice logic in features/crypto, and simulation in mocks/.

Focused on accessibility and responsiveness from the start.
