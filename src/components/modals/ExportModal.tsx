
import { X, Download, FileText, Printer } from 'lucide-react';

interface TimeEntry {
  id: number;
  date: string;
  hours: number;
  description: string;
}

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

interface Vehicle {
  id: number;
  stock: string;
  year: string;
  make: string;
  model: string;
  price: string;
  purchasePrice: string;
  status: string;
  daysInInventory: number;
}

interface MaintenanceRecord {
  id: number;
  stock: string;
  date: string;
  serviceType: string;
  cost: number | string;
  description?: string;
}

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  timeEntries: TimeEntry[];
  tasks: Task[];
  vehicles: Vehicle[];
  maintenanceRecords: MaintenanceRecord[];
  userRole: string;
}

export default function ExportModal({
  isOpen,
  onClose,
  timeEntries,
  tasks,
  vehicles,
  maintenanceRecords,
  userRole
}: ExportModalProps) {
  if (!isOpen) return null;

  const generateReport = (): string => {
    const date = new Date().toLocaleDateString();
    let report = `Dan's Car Lot Manager - Report\n`;
    report += `Generated: ${date}\n`;
    report += `User: ${userRole}\n`;
    report += `\n${'='.repeat(50)}\n\n`;

    // Vehicle Summary
    report += `VEHICLE INVENTORY\n`;
    report += `${'='.repeat(50)}\n`;
    report += `Total Vehicles: ${vehicles.length}\n`;
    report += `Available: ${vehicles.filter(v => v.status === 'Available').length}\n`;
    report += `Sold: ${vehicles.filter(v => v.status === 'Sold').length}\n\n`;

    vehicles.forEach(v => {
      report += `Stock: ${v.stock}\n`;
      report += `Vehicle: ${v.year} ${v.make} ${v.model}\n`;
      report += `Price: ${v.price}\n`;
      report += `Status: ${v.status}\n`;
      report += `Days in Inventory: ${v.daysInInventory}\n`;
      report += `-`.repeat(30) + '\n';
    });

    // Maintenance Summary
    report += `\n\nMAINTENANCE RECORDS\n`;
    report += `${'='.repeat(50)}\n`;
    report += `Total Records: ${maintenanceRecords.length}\n\n`;

    maintenanceRecords.forEach(m => {
      report += `Stock: ${m.stock}\n`;
      report += `Date: ${m.date}\n`;
      report += `Service: ${m.serviceType}\n`;
      report += `Cost: $${m.cost}\n`;
      if (m.description) report += `Notes: ${m.description}\n`;
      report += `-`.repeat(30) + '\n';
    });

    // Tasks Summary
    report += `\n\nTASKS\n`;
    report += `${'='.repeat(50)}\n`;
    report += `Total Tasks: ${tasks.length}\n`;
    report += `Completed: ${tasks.filter(t => t.completed).length}\n`;
    report += `Pending: ${tasks.filter(t => !t.completed).length}\n\n`;

    tasks.forEach(t => {
      report += `[${t.completed ? 'X' : ' '}] ${t.title}\n`;
      if (t.description) report += `    ${t.description}\n`;
      report += `-`.repeat(30) + '\n';
    });

    // Time Entries Summary
    report += `\n\nTIME ENTRIES\n`;
    report += `${'='.repeat(50)}\n`;
    report += `Total Entries: ${timeEntries.length}\n`;
    const totalHours = timeEntries.reduce((sum, t) => sum + t.hours, 0);
    report += `Total Hours: ${totalHours}\n\n`;

    timeEntries.forEach(t => {
      report += `Date: ${t.date}\n`;
      report += `Hours: ${t.hours}\n`;
      report += `Description: ${t.description}\n`;
      report += `-`.repeat(30) + '\n';
    });

    return report;
  };

  const handleDownload = (): void => {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carlot-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = (): void => {
    const report = generateReport();
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Car Lot Report</title>');
      printWindow.document.write('<style>body{font-family:monospace;padding:20px;}pre{white-space:pre-wrap;}</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write('<pre>' + report + '</pre>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Export Report</h2>
            <p className="modal-subtitle">Download or print your data</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Report Summary */}
          <div className="card bg-blue-50">
            <h3 className="font-bold text-blue-900 mb-3">Report Contents</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-blue-600" />
                <span className="text-gray-700">Vehicles: <strong>{vehicles.length}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-blue-600" />
                <span className="text-gray-700">Maintenance: <strong>{maintenanceRecords.length}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-blue-600" />
                <span className="text-gray-700">Tasks: <strong>{tasks.length}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-blue-600" />
                <span className="text-gray-700">Time Entries: <strong>{timeEntries.length}</strong></span>
              </div>
            </div>
          </div>

          {/* Report Preview */}
          <div className="card">
            <h3 className="font-bold text-gray-800 mb-3">Report Preview</h3>
            <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
              <pre className="text-xs font-mono text-gray-700 whitespace-pre-wrap">
                {generateReport().slice(0, 500)}...
              </pre>
            </div>
          </div>

          {/* Export Actions */}
          <div className="flex gap-3">
            <button 
              onClick={handleDownload}
              className="btn-primary flex-1"
            >
              <Download size={18} />
              Download Report
            </button>
            <button 
              onClick={handlePrint}
              className="btn-secondary flex-1"
            >
              <Printer size={18} />
              Print Report
            </button>
          </div>

          <div className="alert-info">
            <p className="text-sm">
              <strong>📄 Export Format:</strong> Reports are exported as plain text (.txt) files 
              containing all your vehicle inventory, maintenance records, tasks, and time entries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
