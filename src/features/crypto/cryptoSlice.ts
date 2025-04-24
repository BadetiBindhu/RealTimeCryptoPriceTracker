import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a type for the crypto asset data
interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  sparkline_in_7d: {
    price: number[];
  };
}

// Define the initial state structure
interface CryptoState {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CryptoState = {
  assets: [],
  loading: false,
  error: null,
};

// Async thunk to fetch crypto data from CoinGecko
export const fetchCryptoData = createAsyncThunk<CryptoAsset[]>(
  'crypto/fetchCryptoData',
  async () => {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 5,
          page: 1,
          sparkline: true,
          price_change_percentage: '1h,24h,7d',
        },
      }
    );
    return response.data; // Take the first 5 results
  }
);

// Slice definition
const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAssets: (state, action: PayloadAction<CryptoAsset[]>) => {
      state.assets = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action: PayloadAction<CryptoAsset[]>) => {
        state.loading = false;
        state.assets = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching crypto data';
      });
  },
});

// Export the updateAssets action
export const { updateAssets } = cryptoSlice.actions;

// Export the reducer
export default cryptoSlice.reducer;
