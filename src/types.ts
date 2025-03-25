export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface InvoiceState {
  products: Product[];
  tax: number;
}

export type InvoiceAction =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'REMOVE_PRODUCT'; payload: string }
  | { type: 'SET_TAX'; payload: number }
  | { type: 'LOAD_STATE'; payload: InvoiceState };