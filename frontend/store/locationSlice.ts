import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  city: string | '',
  lat: number | null,
  lng: number | null
};

const initialState: LocationState = {
  city:  '',
  lat: null,
  lng: null
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<{ city: string, lat: number, lng: number }>) => {
      console.log('=========> setLocation:', { state, action });
      state.city = action.payload.city;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
    defaultLocation: (state) => {
      state.city = 'bangalore',
      state.lat = 12.45,
      state.lng = 77.23
    },
  },
});

export const { setLocation, defaultLocation } = locationSlice.actions;

export default locationSlice.reducer;
