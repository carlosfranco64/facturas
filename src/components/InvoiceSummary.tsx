import React from 'react';
import { useInvoice } from '../context/InvoiceContext';

export function InvoiceSummary() {
  const { state, dispatch } = useInvoice();

  const subtotal = state.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const taxAmount = (subtotal * state.tax) / 100;
  const total = subtotal + taxAmount;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label htmlFor="tax" className="block text-sm font-medium text-gray-700">
          Impuesto (%)
        </label>
        <input
          type="number"
          id="tax"
          min="0"
          max="100"
          value={state.tax}
          onChange={(e) => dispatch({ type: 'SET_TAX', payload: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Impuesto ({state.tax}%):</span>
          <span className="font-medium">${taxAmount.toFixed(2)}</span>
        </div>
        <div className="pt-2 border-t border-gray-200">
          <div className="flex justify-between">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-bold text-blue-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}