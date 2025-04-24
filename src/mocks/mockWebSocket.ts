// src/mocks/mockWebSocket.ts
import { AppDispatch } from '../app/store';
import { updateAssets } from '../features/crypto/cryptoSlice';

export function simulateCryptoUpdates(dispatch: AppDispatch) {
  setInterval(() => {
    dispatch((dispatch, getState) => {
      const currentAssets = getState().crypto.assets.map((asset) => {
        const rand = (min: number, max: number) => Math.random() * (max - min) + min;
        const priceChange = rand(-5, 5);
        const volumeChange = rand(-100000, 100000);

        const newPrice = asset.current_price * (1 + priceChange / 100);

        return {
          ...asset,
          current_price: newPrice,
          price_change_percentage_1h_in_currency: priceChange,
          total_volume: asset.total_volume + volumeChange,
        };
      });
      dispatch(updateAssets(currentAssets));
    });
  }, 2000);
}
