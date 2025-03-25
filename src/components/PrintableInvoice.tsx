import React from 'react';
import { useInvoice } from '../context/InvoiceContext';

export const PrintableInvoice = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { state } = useInvoice();

  const subtotal = state.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const taxAmount = (subtotal * state.tax) / 100;
  const total = subtotal + taxAmount;

  return (
    <div ref={ref} className="p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">FACTURA</h1>
          <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-2">Producto</th>
              <th className="text-right py-2">Cantidad</th>
              <th className="text-right py-2">Precio</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {state.products.map((product) => (
              <tr key={product.id} className="border-b border-gray-200">
                <td className="py-2">{product.name}</td>
                <td className="text-right py-2">{product.quantity}</td>
                <td className="text-right py-2">${product.price.toFixed(2)}</td>
                <td className="text-right py-2">
                  ${(product.quantity * product.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col items-end space-y-2">
          <div className="flex justify-between w-64">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-64">
            <span>Impuesto ({state.tax}%):</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-64 pt-2 border-t border-gray-300 font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

PrintableInvoice.displayName = 'PrintableInvoice';