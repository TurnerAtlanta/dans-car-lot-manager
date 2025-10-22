import React, { useState } from 'react';

export default function SalesTracking({ sales, setSales }) {
  const [newSale, setNewSale] = useState({
    date: '',
    customer: '',
    vehicle: '',
    stock: '',
    soldPrice: '',
    purchasePrice: '',
    profit: '',
    paymentMethod: '',
    salesperson: '',
  });

  const addSale = () => {
    if (newSale.date && newSale.customer && newSale.vehicle) {
      const profit = parseFloat(newSale.soldPrice || 0) - parseFloat(newSale.purchasePrice || 0);
      setSales([
        ...sales,
        {
          id: Date.now(),
          ...newSale,
          profit: profit.toFixed(2),
        },
      ]);
      setNewSale({
        date: '',
        customer: '',
        vehicle: '',
        stock: '',
        soldPrice: '',
        purchasePrice: '',
        profit: '',
        paymentMethod: '',
        salesperson: '',
      });
    }
  };

  const deleteSale = (id) => {
    setSales(sales.filter((s) => s.id !== id));
  };

  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, s) => sum + parseFloat(s.soldPrice || 0), 0);
  const totalProfit = sales.reduce((sum, s) => sum + parseFloat(s.profit || 0), 0);

  return (
    <section>
      <h2 className="section-header mb-4">Sales Tracking</h2>
      
      <div className="mb-6 bg-cyan-50 p-4 rounded-lg">
        <input
          type="date"
          value={newSale.date}
          onChange={(e) => setNewSale({ ...newSale, date: e.target.value })}
          className="input-field mb-2"
        />
        <input
          type="text"
          placeholder="Customer"
          value={newSale.customer}
          onChange={(e) => setNewSale({ ...newSale, customer: e.target.value })}
          className="input-field mb-2"
        />
        <input
          type="text"
          placeholder="Vehicle"
          value={newSale.vehicle}
          onChange={(e) => setNewSale({ ...newSale, vehicle: e.target.value })}
          className="input-field mb-2"
        />
        <input
          type="text"
          placeholder="Stock Number"
          value={newSale.stock}
          onChange={(e) => setNewSale({ ...newSale, stock: e.target.value })}
          className="input-field mb-2"
        />
        <input
          type="number"
          placeholder="Sold Price"
          value={newSale.soldPrice}
          onChange={(e) => setNewSale({ ...newSale, soldPrice: e.target.value })}
          className="input-field mb-2"
          step="0.01"
        />
        <input
          type="number"
          placeholder="Purchase Price"
          value={newSale.purchasePrice}
          onChange={(e) => setNewSale({ ...newSale, purchasePrice: e.target.value })}
          className="input-field mb-2"
          step="0.01"
        />
        <input
          type="text"
          placeholder="Payment Method"
          value={newSale.paymentMethod}
          onChange={(e) => setNewSale({ ...newSale, paymentMethod: e.target.value })}
          className="input-field mb-2"
        />
        <input
          type="text"
          placeholder="Salesperson"
          value={newSale.salesperson}
          onChange={(e) => setNewSale({ ...newSale, salesperson: e.target.value })}
          className="input-field mb-2"
        />
        <button onClick={addSale} className="btn-cyan px-4 py-2">
          Add Sale
        </button>
      </div>

      <div className="text-sm mb-4">
        <p>Total Sales: {totalSales}</p>
        <p>Total Revenue: ${totalRevenue.toFixed(2)}</p>
        <p>Total Profit: ${totalProfit.toFixed(2)}</p>
      </div>

      <div className="space-y-3">
        {sales.map((sale) => (
          <div
            key={sale.id}
            className="bg-white border border-cyan-300 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold">{sale.customer}</p>
              <p className="text-sm">{sale.date} - {sale.vehicle}</p>
              <p className="text-sm">Stock #: {sale.stock}</p>
              <p className="text-sm">Sold Price: ${sale.soldPrice}</p>
              <p className="text-sm">Purchase Price: ${sale.purchasePrice}</p>
              <p className="text-sm">Profit: ${sale.profit}</p>
              <p className="text-sm">Payment Method: {sale.paymentMethod}</p>
              <p className="text-sm">Salesperson: {sale.salesperson}</p>
            </div>
            <button
              onClick={() => deleteSale(sale.id)}
              className="btn-danger btn-sm px-3 py-1"
              aria-label="Delete sale"
            >
              &#x2716;
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
