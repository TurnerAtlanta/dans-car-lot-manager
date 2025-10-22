import React from 'react';

export default function ExportReports({ generateReport }) {
  const exportReport = () => {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carlot-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    const report = generateReport();
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Car Lot Report</title></head><body>');
    printWindow.document.write(`<pre style="font-family: monospace; padding: 20px;">${report}</pre>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <section>
      <h2 className="section-header mb-4">Export Reports</h2>
      <div className="flex gap-4">
        <button onClick={exportReport} className="btn-success px-6 py-2">
          Download Report
        </button>
        <button onClick={printReport} className="btn-primary px-6 py-2">
          Print Report
        </button>
      </div>
    </section>
  );
}
