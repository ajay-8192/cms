// AppContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// Define the type for your state
type State = {
  userDetails: { name: string; email: string, id: string };
};

// Define the type for your actions
type Action = { type: 'SET_USER_DETAILS'; payload: { id: string, name: string; email: string } };

// Define the initial state
const initialState: State = {
  userDetails: { name: '', email: '', id: '' },
};

// Create the context
const AppContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null,
});

// Define the reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_USER_DETAILS':
      return { ...state, userDetails: action.payload };
    default:
      return state;
  }
};

// Create the context provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);