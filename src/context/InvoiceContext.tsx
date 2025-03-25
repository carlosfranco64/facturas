import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { InvoiceState, InvoiceAction, Product } from '../types';

const initialState: InvoiceState = {
  products: [],
  tax: 16, // Default tax rate
};

function invoiceReducer(state: InvoiceState, action: InvoiceAction): InvoiceState {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };
    case 'SET_TAX':
      return {
        ...state,
        tax: action.payload,
      };
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

const InvoiceContext = createContext<{
  state: InvoiceState;
  dispatch: React.Dispatch<InvoiceAction>;
} | null>(null);

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('invoiceState');
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', payload: JSON.parse(savedState) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('invoiceState', JSON.stringify(state));
  }, [state]);

  return (
    <InvoiceContext.Provider value={{ state, dispatch }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoice() {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
}