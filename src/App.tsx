import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Receipt, Printer } from 'lucide-react';
import { InvoiceProvider } from './context/InvoiceContext';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import { InvoiceSummary } from './components/InvoiceSummary';
import { PrintableInvoice } from './components/PrintableInvoice';

function App() {
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <InvoiceProvider>
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <Receipt className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900">Simulador de Facturas</h1>
            <p className="mt-2 text-gray-600">
              Agrega productos, calcula impuestos y genera facturas en PDF
            </p>
          </div>

          <div className="space-y-8">
            <ProductForm />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ProductList />
              </div>
              <div>
                <InvoiceSummary />
                <button
                  onClick={handlePrint}
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Printer className="w-5 h-5 mr-2" />
                  Generar PDF
                </button>
              </div>
            </div>
          </div>

          <div className="hidden">
            <PrintableInvoice ref={printRef} />
          </div>
        </div>
      </div>
    </InvoiceProvider>
  );
}

export default App;