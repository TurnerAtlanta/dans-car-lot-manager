import React, { useState } from 'react';
import { Clock, CheckSquare, Car, Wrench, Plus, Edit2, Trash2, Save, X, Download, Share2, Upload, Calendar, Mail, MessageSquare, History } from 'lucide-react';

const { Clock, CheckSquare, Car, Wrench, Plus, Edit2, Trash2, Save, X, Download, Share2, Upload, Calendar, Mail, MessageSquare, History } = lucide

export default function CarLotManager() {
  const [activeTab, setActiveTab] = useState('timeLog');
  const [userRole, setUserRole] = useState('employee');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showVehicleDetail, setShowVehicleDetail] = useState(null);
  const [showDMSModal, setShowDMSModal] = useState(false);
  const [showDMSGuide, setShowDMSGuide] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [dmsConnected, setDmsConnected] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [showFinancialModal, setShowFinancialModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [scheduleFrequency, setScheduleFrequency] = useState('daily');
  const [scheduleTime, setScheduleTime] = useState('17:00');
  const [shareMethod, setShareMethod] = useState('email');
  const [recipientEmail, setRecipientEmail] = useState('boss@carlot.com');
  const [recipientPhone, setRecipientPhone] = useState('555-0123');

  // Time Log State
  const [timeEntries, setTimeEntries] = useState([
    { id: 1, time: '09:00 AM', activity: 'Opened lot, checked inventory', duration: '30 min', editable: false },
    { id: 2, time: '10:15 AM', activity: 'Customer walkthrough - 2018 Honda Accord', duration: '45 min', editable: false },
  ]);
  const [newActivity, setNewActivity] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);

  // Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Detail 2020 Toyota Camry', completed: false, assignedBy: 'boss', priority: 'high' },
    { id: 2, task: 'Follow up with customer - John Smith', completed: false, assignedBy: 'employee', priority: 'medium' },
    { id: 3, task: 'Update prices on lot signs', completed: true, assignedBy: 'boss', priority: 'low' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');

  // Vehicles State with Photos
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      year: '2020',
      make: 'Toyota',
      model: 'Camry',
      status: 'Available',
      price: '$22,500',
      purchasePrice: '$18,000',
      reconCost: '$800',
      stock: 'TC-2020-01',
      photos: ['🚗', '📸', '📸'],
      soldDate: null,
      soldPrice: null,
      maintenanceHistory: [
        { date: '2025-10-15', service: 'Interior detailing', status: 'Completed', notes: 'Ready for showroom', photos: ['🧽'], cost: '$150' },
        { date: '2025-09-20', service: 'Full inspection', status: 'Completed', notes: 'Passed all checks', photos: [], cost: '$75' }
      ]
    },
    {
      id: 2,
      year: '2018',
      make: 'Honda',
      model: 'Accord',
      status: 'In Service',
      price: '$18,900',
      purchasePrice: '$15,500',
      reconCost: '$650',
      stock: 'HA-2018-02',
      photos: ['🚙', '📸'],
      soldDate: null,
      soldPrice: null,
      maintenanceHistory: [
        { date: '2025-10-18', service: 'Oil change and inspection', status: 'In Progress', notes: 'Due back by 2 PM', photos: ['🔧'], cost: '$125' }
      ]
    },
  ]);

  // Maintenance State
  const [maintenanceRecords, setMaintenanceRecords] = useState([
    { id: 1, vehicleId: 1, vehicle: 'TC-2020-01', date: '2025-10-15', service: 'Interior detailing', status: 'Completed', notes: 'Ready for showroom', photos: ['🧽'], cost: '$150' },
    { id: 2, vehicleId: 2, vehicle: 'HA-2018-02', date: '2025-10-18', service: 'Oil change and inspection', status: 'In Progress', notes: 'Due back by 2 PM', photos: ['🔧'], cost: '$125' },
  ]);

  // Follow-up Reminders State
  const [followUps, setFollowUps] = useState([
    { id: 1, customer: 'John Smith', vehicle: 'TC-2020-01', type: 'Test Drive Follow-up', dueDate: '2025-10-20', status: 'pending', notes: 'Interested in Camry, wants to think about financing', phone: '555-0101', email: 'john.smith@email.com' },
    { id: 2, customer: 'Sarah Johnson', vehicle: 'HA-2018-02', type: 'Price Quote Follow-up', dueDate: '2025-10-19', status: 'pending', notes: 'Requested quote for Accord, compare with competitors', phone: '555-0102', email: 'sarah.j@email.com' },
    { id: 3, customer: 'Mike Williams', vehicle: 'N/A', type: 'General Inquiry', dueDate: '2025-10-18', status: 'completed', notes: 'Looking for trucks, called back already', phone: '555-0103', email: 'mike.w@email.com' },
  ]);
  const [newFollowUp, setNewFollowUp] = useState({
    customer: '',
    vehicle: '',
    type: 'Test Drive Follow-up',
    dueDate: '',
    notes: '',
    phone: '',
    email: ''
  });

  // Customer Database State
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Smith', phone: '555-0101', email: 'john.smith@email.com', status: 'Hot Lead', lastContact: '2025-10-17', vehicleInterest: 'TC-2020-01', notes: 'Interested in financing options', testDrive: true },
    { id: 2, name: 'Sarah Johnson', phone: '555-0102', email: 'sarah.j@email.com', status: 'Warm Lead', lastContact: '2025-10-16', vehicleInterest: 'HA-2018-02', notes: 'Price shopping', testDrive: false },
    { id: 3, name: 'Mike Williams', phone: '555-0103', email: 'mike.w@email.com', status: 'Cold Lead', lastContact: '2025-10-10', vehicleInterest: 'FF-2021-03', notes: 'Looking for trucks', testDrive: false },
  ]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    status: 'Warm Lead',
    vehicleInterest: '',
    notes: '',
    testDrive: false
  });

  // Sales Tracking State
  const [sales, setSales] = useState([
    { id: 1, date: '2025-10-15', customer: 'Robert Davis', vehicle: '2019 Ford Escape', stock: 'FE-2019-05', soldPrice: '$19,500', purchasePrice: '$16,000', profit: '$3,500', paymentMethod: 'Finance', salesperson: 'Dan' },
    { id: 2, date: '2025-10-12', customer: 'Lisa Martinez', vehicle: '2020 Nissan Altima', stock: 'NA-2020-06', soldPrice: '$21,000', purchasePrice: '$17,500', profit: '$3,500', paymentMethod: 'Cash', salesperson: 'Dan' },
  ]);

  // Auto Schedule State
  const [scheduledReports, setScheduledReports] = useState([
    { id: 1, frequency: 'daily', time: '17:00', method: 'email', recipient: 'boss@carlot.com', active: true },
  ]);

  // DMS Integration
  const [dmsConfig, setDmsConfig] = useState({
    apiKey: '',
    dealershipId: '',
    endpoint: 'https://api.waynereeves.com/v1'
  });

  const syncWithDMS = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const dmsVehicles = [
        {
          id: 3,
          year: '2021',
          make: 'Ford',
          model: 'F-150',
          status: 'Available',
          price: '$35,900',
          purchasePrice: '$30,000',
          reconCost: '$1,200',
          stock: 'FF-2021-03',
          photos: ['🚚', '📸'],
          soldDate: null,
          soldPrice: null,
          maintenanceHistory: [
            { date: '2025-10-10', service: 'Pre-delivery inspection', status: 'Completed', notes: 'All systems checked', photos: ['✅'], cost: '$200' }
          ]
        },
        {
          id: 4,
          year: '2019',
          make: 'Chevrolet',
          model: 'Silverado',
          status: 'Available',
          price: '$28,500',
          purchasePrice: '$24,000',
          reconCost: '$900',
          stock: 'CS-2019-04',
          photos: ['🚙'],
          soldDate: null,
          soldPrice: null,
          maintenanceHistory: []
        }
      ];

      const existingStocks = vehicles.map(v => v.stock);
      const newVehicles = dmsVehicles.filter(v => !existingStocks.includes(v.stock));
      setVehicles([...vehicles, ...newVehicles]);

      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleTimeString());
      setDmsConnected(true);
      alert(`Successfully synced! Added ${newVehicles.length} vehicles from Wayne Reeves DMS`);
    }, 2000);
  };

  // Follow-up Functions
  const addFollowUp = () => {
    if (newFollowUp.customer && newFollowUp.dueDate) {
      setFollowUps([...followUps, {
        id: Date.now(),
        ...newFollowUp,
        status: 'pending'
      }]);
      setNewFollowUp({
        customer: '',
        vehicle: '',
        type: 'Test Drive Follow-up',
        dueDate: '',
        notes: '',
        phone: '',
        email: ''
      });
      setShowFollowUpModal(false);
    }
  };

  const completeFollowUp = (id) => {
    setFollowUps(followUps.map(f => f.id === id ? { ...f, status: 'completed' } : f));
  };

  const deleteFollowUp = (id) => {
    setFollowUps(followUps.filter(f => f.id !== id));
  };

  // Customer Functions
  const addCustomer = () => {
    if (newCustomer.name) {
      const customer = {
        id: Date.now(),
        ...newCustomer,
        lastContact: new Date().toISOString().split('T')[0]
      };
      setCustomers([...customers, customer]);
      setNewCustomer({
        name: '',
        phone: '',
        email: '',
        status: 'Warm Lead',
        vehicleInterest: '',
        notes: '',
        testDrive: false
      });
    }
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const getLeadStats = () => ({
    hot: customers.filter(c => c.status === 'Hot Lead').length,
    warm: customers.filter(c => c.status === 'Warm Lead').length,
    cold: customers.filter(c => c.status === 'Cold Lead').length
  });

  const getSalesStats = () => {
    const totalSales = sales.length;
    const totalRevenue = sales.reduce((sum, s) => sum + parseFloat(s.soldPrice.replace(/[$,]/g, '')), 0);
    const totalProfit = sales.reduce((sum, s) => sum + parseFloat(s.profit.replace(/[$,]/g, '')), 0);
    const avgProfit = totalSales > 0 ? totalProfit / totalSales : 0;

    return { totalSales, totalRevenue, totalProfit, avgProfit };
  };

  // Financial Calculations
  const calculateVehicleProfit = (vehicle) => {
    const price = parseFloat(vehicle.price.replace(/[$,]/g, ''));
    const purchase = parseFloat(vehicle.purchasePrice.replace(/[$,]/g, ''));
    const recon = parseFloat(vehicle.reconCost.replace(/[$,]/g, ''));
    const maintenanceCosts = vehicle.maintenanceHistory.reduce((sum, record) => {
      return sum + (record.cost ? parseFloat(record.cost.replace(/[$,]/g, '')) : 0);
    }, 0);

    const totalCost = purchase + recon + maintenanceCosts;
    const projectedProfit = price - totalCost;

    return {
      listPrice: price,
      totalCost,
      projectedProfit,
      profitMargin: ((projectedProfit / price) * 100).toFixed(1)
    };
  };

  const getInventoryStats = () => {
    const available = vehicles.filter(v => v.status === 'Available').length;
    const inService = vehicles.filter(v => v.status === 'In Service').length;
    const totalInvestment = vehicles.reduce((sum, v) => {
      return sum + parseFloat(v.purchasePrice.replace(/[$,]/g, '')) + parseFloat(v.reconCost.replace(/[$,]/g, ''));
    }, 0);
    const totalValue = vehicles.reduce((sum, v) => sum + parseFloat(v.price.replace(/[$,]/g, '')), 0);
    const projectedProfit = totalValue - totalInvestment;

    return { available, inService, totalInvestment, totalValue, projectedProfit };
  };

  // Time Log Functions
  const addTimeEntry = () => {
    if (newActivity.trim()) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setTimeEntries([...timeEntries, {
        id: Date.now(),
        time: timeStr,
        activity: newActivity,
        duration: 'Just started',
        editable: false
      }]);
      setNewActivity('');
    }
  };

  const deleteTimeEntry = (id) => {
    setTimeEntries(timeEntries.filter(e => e.id !== id));
  };

  const startEditEntry = (entry) => {
    setEditingEntry({ ...entry });
  };

  const saveEditEntry = () => {
    setTimeEntries(timeEntries.map(e => e.id === editingEntry.id ? editingEntry : e));
    setEditingEntry(null);
  };

  // Task Functions
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        task: newTask,
        completed: false,
        assignedBy: userRole,
        priority: taskPriority
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Export Functions
  const generateReport = () => {
    const today = new Date().toLocaleDateString();
    let report = `CAR LOT DAILY REPORT - ${today}\n`;
    report += `Generated by: ${userRole === 'employee' ? 'Dan' : 'Boss'}\n`;
    report += `\n${'='.repeat(50)}\n`;

    report += `\nTIME LOG (${timeEntries.length} entries)\n`;
    report += `${'-'.repeat(50)}\n`;
    timeEntries.forEach(entry => {
      report += `${entry.time} | ${entry.duration} | ${entry.activity}\n`;
    });

    report += `\n\nTASKS (${tasks.filter(t => !t.completed).length} pending, ${tasks.filter(t => t.completed).length} completed)\n`;
    report += `${'-'.repeat(50)}\n`;
    tasks.forEach(task => {
      const status = task.completed ? '✓' : '○';
      report += `${status} [${task.priority.toUpperCase()}] ${task.task}\n`;
    });

    report += `\n\nVEHICLE STATUS\n`;
    report += `${'-'.repeat(50)}\n`;
    vehicles.forEach(v => {
      report += `${v.stock} - ${v.year} ${v.make} ${v.model} - ${v.status} - ${v.price}\n`;
    });

    report += `\n\nMAINTENANCE RECORDS\n`;
    report += `${'-'.repeat(50)}\n`;
    maintenanceRecords.forEach(r => {
      report += `${r.date} | ${r.vehicle} | ${r.service} - ${r.status}\n`;
      if (r.notes) report += `  Notes: ${r.notes}\n`;
    });

    return report;
  };

  const exportReport = () => {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carlot-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  const printReport = () => {
    const report = generateReport();
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Car Lot Report</title>');
    printWindow.document.write('<style>body{font-family:monospace;padding:20px;} h1{color:#1e40af;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<pre>' + report + '</pre>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    setShowExportModal(false);
  };

  const scheduleReport = () => {
    const newSchedule = {
      id: Date.now(),
      frequency: scheduleFrequency,
      time: scheduleTime,
      method: shareMethod,
      recipient: shareMethod === 'email' ? recipientEmail : recipientPhone,
      active: true
    };
    setScheduledReports([...scheduledReports, newSchedule]);
    setShowScheduleModal(false);
    alert(`Report scheduled! Will be sent ${scheduleFrequency} at ${scheduleTime} via ${shareMethod}`);
  };

  const deleteSchedule = (id) => {
    setScheduledReports(scheduledReports.filter(s => s.id !== id));
  };

  const handlePhotoUpload = (vehicleId) => {
    alert(`Photo upload feature activated for vehicle ${vehicleId}. In production, this would open your device camera or file picker.`);
    setVehicles(vehicles.map(v =>
      v.id === vehicleId ? { ...v, photos: [...v.photos, '📷'] } : v
    ));
  };

  const addMaintenanceToVehicle = (vehicleId, maintenance) => {
    setVehicles(vehicles.map(v =>
      v.id === vehicleId
        ? { ...v, maintenanceHistory: [...v.maintenanceHistory, maintenance] }
        : v
    ));
  };

  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'high': return 'priority-high badge';
      case 'medium': return 'priority-medium badge';
      case 'low': return 'priority-low badge';
      default: return 'badge';
    }
  };

  const getLeadClass = (status) => {
    switch(status) {
      case 'Hot Lead': return 'lead-hot badge';
      case 'Warm Lead': return 'lead-warm badge';
      default: return 'lead-cold badge';
    }
  };

  const getVehicleStatusClass = (status) => {
    switch(status) {
      case 'Available': return 'vehicle-status-available badge';
      case 'In Service': return 'vehicle-status-service badge';
      default: return 'badge';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="card rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Car Lot Manager</h1>
              <p className="text-gray-600 mt-1">Time Tracking & Task Management</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setShowDMSModal(true)} className="btn-warning flex items-center gap-2">
                <Share2 size={18} />
                {dmsConnected ? 'DMS Connected' : 'Sync DMS'}
              </button>
              <button onClick={() => setShowFollowUpModal(true)} className="btn-purple flex items-center gap-2">
                <Clock size={18} />
                Follow-ups ({followUps.filter(f => f.status === 'pending').length})
              </button>
              <button onClick={() => setShowFinancialModal(true)} className="btn-emerald flex items-center gap-2">
                💰 Financials
              </button>
              <button onClick={() => setShowCustomerModal(true)} className="btn-pink flex items-center gap-2">
                👥 Customers ({customers.length})
              </button>
              <button onClick={() => setShowSalesModal(true)} className="btn-cyan flex items-center gap-2">
                📈 Sales ({sales.length})
              </button>
              <button onClick={() => setShowExportModal(true)} className="btn-success flex items-center gap-2">
                <Download size={18} />
                Export
              </button>
              <button onClick={() => setShowScheduleModal(true)} className="btn-indigo flex items-center gap-2">
                <Calendar size={18} />
                Schedule
              </button>
              <button
                onClick={() => setUserRole('employee')}
                className={userRole === 'employee' ? 'btn-primary' : 'btn-secondary'}
              >
                Dan
              </button>
              <button
                onClick={() => setUserRole('boss')}
                className={userRole === 'boss' ? 'btn-purple' : 'btn-secondary'}
              >
                Boss
              </button>
            </div>
          </div>
        </div>

        {/* Scheduled Reports Display */}
        {scheduledReports.length > 0 && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <Calendar size={18} />
              Active Report Schedules
            </h3>
            <div className="space-y-2">
              {scheduledReports.map(schedule => (
                <div key={schedule.id} className="flex items-center justify-between bg-white p-3 rounded">
                  <div className="flex items-center gap-3 text-sm">
                    {schedule.method === 'email' ? <Mail size={16} /> : <MessageSquare size={16} />}
                    <span className="font-medium capitalize">{schedule.frequency}</span>
                    <span className="text-gray-600">at {schedule.time}</span>
                    <span className="text-gray-600">to {schedule.recipient}</span>
                  </div>
                  <button onClick={() => deleteSchedule(schedule.id)} className="text-red-600 hover:text-red-800">
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DMS Sync Status */}
        {dmsConnected && lastSyncTime && (
          <div className="alert-success mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold">Wayne Reeves DMS Connected</span>
              </div>
              <span className="text-sm text-green-700">Last synced: {lastSyncTime}</span>
            </div>
          </div>
        )}

        {/* Pending Follow-ups Alert */}
        {followUps.filter(f => f.status === 'pending' && new Date(f.dueDate) <= new Date()).length > 0 && (
          <div className="alert-danger mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span className="font-bold">
                  {followUps.filter(f => f.status === 'pending' && new Date(f.dueDate) <= new Date()).length} Follow-up(s) Due Today!
                </span>
              </div>
              <button onClick={() => setShowFollowUpModal(true)} className="text-sm underline hover:text-red-900 text-red-600">
                View Now
              </button>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="card rounded-lg shadow-lg mb-6">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('timeLog')}
              className={activeTab === 'timeLog' ? 'tab-active' : 'tab-inactive'}
            >
              <Clock size={20} />
              Time Log
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={activeTab === 'tasks' ? 'tab-active' : 'tab-inactive'}
            >
              <CheckSquare size={20} />
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('vehicles')}
              className={activeTab === 'vehicles' ? 'tab-active' : 'tab-inactive'}
            >
              <Car size={20} />
              Vehicles
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={activeTab === 'maintenance' ? 'tab-active' : 'tab-inactive'}
            >
              <Wrench size={20} />
              Maintenance
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'timeLog' && (
              <div>
                <h2 className="section-header mb-4">Daily Time Log</h2>
                <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newActivity}
                      onChange={(e) => setNewActivity(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTimeEntry()}
                      placeholder="What are you working on?"
                      className="input-field flex-1"
                    />
                    <button onClick={addTimeEntry} className="btn-primary flex items-center gap-2 px-6 py-2">
                      <Plus size={20} />
                      Log Activity
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {timeEntries.map(entry => (
                    <div key={entry.id} className="card-hover p-4 rounded-lg border border-gray-200 bg-white transition hover:shadow-md">
                      {editingEntry?.id === entry.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingEntry.activity}
                            onChange={(e) => setEditingEntry({ ...editingEntry, activity: e.target.value })}
                            className="input-field w-full"
                          />
                          <div className="flex gap-2">
                            <button onClick={saveEditEntry} className="btn-success btn-sm flex items-center gap-1 px-3 py-1">
                              <Save size={16} />
                              Save
                            </button>
                            <button onClick={() => setEditingEntry(null)} className="btn-secondary btn-sm flex items-center gap-1 px-3 py-1">
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{entry.activity}</p>
                            <p className="text-sm text-gray-500">{entry.time} - {entry.duration}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => startEditEntry(entry)} className="btn-secondary btn-sm flex items-center gap-1 px-3 py-1">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => deleteTimeEntry(entry.id)} className="btn-danger btn-sm flex items-center gap-1 px-3 py-1">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div>
                <h2 className="section-header mb-4">Tasks</h2>
                <div className="mb-6 bg-yellow-50 p-4 rounded-lg">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTask()}
                      placeholder="Add a new task"
                      className="input-field flex-1"
                    />
                    <select
                      value={taskPriority}
                      onChange={(e) => setTaskPriority(e.target.value)}
                      className="select-field"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <button onClick={addTask} className="btn-primary flex items-center gap-2 px-6 py-2">
                      <Plus size={20} />
                      Add Task
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {tasks.map(task => (
                    <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="checkbox-field"
                        />
                        <p className={task.completed ? "line-through text-gray-400" : "font-semibold"}>
                          {task.task}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={getPriorityClass(task.priority)}>{task.priority}</span>
                        <button onClick={() => deleteTask(task.id)} className="btn-danger btn-sm flex items-center gap-1 px-3 py-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'vehicles' && (
              <div>
                <h2 className="section-header mb-4">Vehicles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vehicles.map(vehicle => (
                    <div key={vehicle.id} className="vehicle-card p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer" onClick={() => setShowVehicleDetail(vehicle)}>
                      <div className="card-header flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-800">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                        <span className={getVehicleStatusClass(vehicle.status)}>
                          {vehicle.status}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-700">Price: {vehicle.price}</p>
                      <p className="text-sm text-gray-500">Stock #: {vehicle.stock}</p>
                      <div className="flex gap-2 mt-2">
                        {vehicle.photos.map((photo, idx) => (
                          <span key={idx} aria-label="photo">{photo}</span>
                        ))}
                        <button onClick={(e) => { e.stopPropagation(); handlePhotoUpload(vehicle.id); }} className="btn-secondary btn-sm">
                          <Upload size={16} />
                          Upload Photo
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'maintenance' && (
              <div>
                <h2 className="section-header mb-4">Maintenance</h2>
                <div className="space-y-4">
                  {maintenanceRecords.map(record => (
                    <div key={record.id} className="card p-4 rounded-lg shadow">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-800">{record.service}</h3>
                          <p className="text-sm text-gray-600">{record.date} - Vehicle: {record.vehicle}</p>
                        </div>
                        <span className={getVehicleStatusClass(record.status)}>{record.status}</span>
                      </div>
                      {record.notes && <p className="text-gray-700 mb-2">Notes: {record.notes}</p>}
                      <div className="flex gap-2">
                        {record.photos.map((photo, idx) => (
                          <span key={idx} aria-label="photo">{photo}</span>
                        ))}
                      </div>
                      <p className="text-sm font-semibold mt-2">Cost: {record.cost}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CarLotManager />);}
